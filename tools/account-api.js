const { DatabaseSync } = require('node:sqlite');
const { createHash, createHmac, randomBytes, timingSafeEqual } = require('node:crypto');
const { mkdirSync } = require('node:fs');
const path = require('node:path');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const digest = value => createHash('sha256').update(value).digest('hex');
const phaseId = /^(?:[\w-]+:\d+:\d+|checkpoint:[\w-]+:[\w-]+)$/;
const itemId = /^[\w-]+(?::[\w-]+){2,6}$/;
const emptyProgress = () => ({phases: {}, misses: {}});

function createAccountApi(databasePath) {
  mkdirSync(path.dirname(databasePath), {recursive: true, mode: 0o700});
  const db = new DatabaseSync(databasePath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      name TEXT PRIMARY KEY, email TEXT NOT NULL, secret TEXT, invite TEXT,
      last INTEGER DEFAULT -1, fails INTEGER DEFAULT 0, until_ms INTEGER DEFAULT 0,
      progress TEXT NOT NULL DEFAULT '{"phases":{},"misses":{}}'
    );
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, name TEXT NOT NULL, expires INTEGER NOT NULL);
    CREATE INDEX IF NOT EXISTS sessions_expires ON sessions(expires);
  `);
  const account = name => db.prepare('SELECT * FROM accounts WHERE name = ?').get(name);

  // Remove a reserva antiga sem tocar em contas que já vincularam um autenticador.
  db.prepare('DELETE FROM accounts WHERE name = ? AND secret IS NULL AND invite IS NOT NULL').run('rubifofa');

  function authenticate(secret, code, last) {
    if (!/^[A-Z2-7]{32}$/.test(secret || '') || !/^\d{6}$/.test(code || '')) return -1;
    const bits = [...secret].map(char => alphabet.indexOf(char).toString(2).padStart(5, '0')).join('');
    const key = Buffer.from(bits.match(/.{8}/g).map(byte => parseInt(byte, 2)));
    const now = Math.floor(Date.now() / 30000);
    for (const delta of [0, -1, 1]) {
      const counter = now + delta;
      if (counter <= last) continue;
      const buffer = Buffer.alloc(8);
      buffer.writeBigUInt64BE(BigInt(counter));
      const mac = createHmac('sha1', key).update(buffer).digest();
      const value = (mac.readUInt32BE(mac[19] & 15) & 0x7fffffff) % 1000000;
      if (timingSafeEqual(Buffer.from(String(value).padStart(6, '0')), Buffer.from(code))) return counter;
    }
    return -1;
  }

  function issueSession(name, res, secure) {
    const token = randomBytes(32).toString('hex');
    const lifetime = 30 * 86400;
    db.prepare('DELETE FROM sessions WHERE expires < ?').run(Date.now());
    db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(digest(token), name, Date.now() + lifetime * 1000);
    res.setHeader('Set-Cookie', 'mathrubi_token=' + token + '; Path=/; HttpOnly; SameSite=Strict; Max-Age=' + lifetime + (secure ? '; Secure' : ''));
  }

  function mergeProgress(old, incoming) {
    for (const [group, pattern, max] of [['phases', phaseId, 1], ['misses', itemId, 100000]]) {
      for (const [id, value] of Object.entries(incoming?.[group] || {}).slice(0, 5000)) {
        if (pattern.test(id) && id.length <= 160 && Number.isFinite(value) && value >= 0 && value <= max) {
          old[group][id] = Math.max(old[group][id] || 0, value);
        }
      }
    }
    return old;
  }

  async function handle(req, res) {
    const reply = (code, data) => {
      res.writeHead(code, {'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store'});
      res.end(JSON.stringify(data));
    };
    if (req.headers['sec-fetch-site'] === 'cross-site') return reply(403, {error: 'Origem inválida.'});
    const action = req.url.slice('/api/account/'.length);
    const token = req.headers.cookie?.match(/(?:^|;\s*)mathrubi_token=([a-f0-9]{64})(?:;|$)/)?.[1];
    const session = token && db.prepare('SELECT name FROM sessions WHERE token = ? AND expires > ?').get(digest(token), Date.now());
    if (req.method === 'GET' && action === 'session') {
      const user = session && account(session.name);
      return reply(200, user ? {user: user.name, progress: JSON.parse(user.progress)} : {user: null});
    }
    if (req.method !== 'POST') return reply(405, {error: 'Método inválido.'});
    let input;
    try {
      const chunks = [];
      let size = 0;
      for await (const chunk of req) {
        size += chunk.length;
        if (size > 250000) { reply(413, {error: 'Pedido grande demais.'}); return; }
        chunks.push(chunk);
      }
      input = JSON.parse(Buffer.concat(chunks).toString()) || {};
    } catch { return reply(400, {error: 'Pedido inválido.'}); }
    const secure = req.headers['x-forwarded-proto'] === 'https' || !/^localhost:|^127\.0\.0\.1:/.test(req.headers.host || '');
    if (action === 'logout') {
      if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(digest(token));
      res.setHeader('Set-Cookie', 'mathrubi_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0' + (secure ? '; Secure' : ''));
      return reply(200, {});
    }
    if (action === 'progress') {
      if (!session) return reply(401, {error: 'Entre na sua conta novamente.'});
      const user = account(session.name);
      const progress = mergeProgress(JSON.parse(user.progress), input.progress);
      db.prepare('UPDATE accounts SET progress = ? WHERE name = ?').run(JSON.stringify(progress), user.name);
      return reply(200, {progress});
    }
    const {name, email, invite, secret, code} = input;
    if (typeof name !== 'string' || !/^[a-z0-9_]{3,24}$/.test(name)) return reply(400, {error: 'Usuário inválido.'});
    const user = account(name);
    if (action === 'lookup') return reply(200, {exists: Boolean(user?.secret), reserved: Boolean(user?.invite)});
    if (action === 'register') {
      if (user?.secret) return reply(409, {error: 'Esse usuário já existe.'});
      if (typeof email !== 'string' || email.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, {error: 'E-mail inválido.'});
      if (user?.invite && (email.toLowerCase() !== user.email || typeof invite !== 'string' ||
          !timingSafeEqual(Buffer.from(digest(invite)), Buffer.from(user.invite)))) {
        return reply(403, {error: 'E-mail ou código de ativação incorreto.'});
      }
      const counter = authenticate(secret, code, -1);
      if (counter < 0) return reply(400, {error: 'Código do autenticador incorreto.'});
      if (user) db.prepare('UPDATE accounts SET secret = ?, invite = NULL, last = ? WHERE name = ?').run(secret, counter, name);
      else db.prepare('INSERT INTO accounts (name,email,secret,last) VALUES (?,?,?,?)').run(name, email.toLowerCase(), secret, counter);
    } else if (action === 'login') {
      if (!user?.secret) return reply(401, {error: 'Conta indisponível.'});
      if (user.until_ms > Date.now()) return reply(429, {error: 'Muitas tentativas. Aguarde um minuto.'});
      const counter = authenticate(user.secret, code, user.last);
      if (counter < 0) {
        const lock = user.fails + 1 >= 5;
        db.prepare('UPDATE accounts SET fails = ?, until_ms = ? WHERE name = ?').run(lock ? 0 : user.fails + 1, lock ? Date.now() + 60000 : 0, name);
        return reply(401, {error: 'Código incorreto ou já usado. Aguarde o próximo código.'});
      }
      db.prepare('UPDATE accounts SET last = ?, fails = 0, until_ms = 0 WHERE name = ?').run(counter, name);
    } else return reply(404, {error: 'Rota não encontrada.'});
    issueSession(name, res, secure);
    return reply(200, {user: name, progress: JSON.parse(account(name).progress)});
  }
  return {handle};
}

module.exports = {createAccountApi};
