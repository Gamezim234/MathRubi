// Servidor estático mínimo só para desenvolvimento: node tools/serve.js
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'dist');
const types = {'.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8'};
const { generatePractice } = require('./practice-api');
const { createAccountApi } = require('./account-api');
const accounts = createAccountApi(process.env.MATHRUBI_DB || path.join(__dirname, '..', 'data', 'accounts.sqlite'));
if (process.env.MATHRUBI_OWNER_EMAIL && process.env.MATHRUBI_OWNER_INVITE) {
  accounts.reserve('rubifofa', process.env.MATHRUBI_OWNER_EMAIL, process.env.MATHRUBI_OWNER_INVITE);
}
http.createServer((req, res) => {
  if (req.url.startsWith('/api/account/')) {
    accounts.handle(req, res).catch(() => {
      if (!res.headersSent) res.writeHead(500, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'});
      res.end(JSON.stringify({error: 'Não foi possível acessar a conta agora.'}));
    });
    return;
  }
  if (req.url === '/api/practice') return generatePractice(req, res);
  let pathname;
  try { pathname = decodeURIComponent(req.url.split('?')[0]); } catch { res.writeHead(400); return res.end(); }
  if (pathname.includes('\0')) { res.writeHead(400); return res.end(); }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'}); res.end(data);
  });
}).listen(process.env.PORT || 5183, process.env.HOST || '127.0.0.1', () => console.log('MathRubi pronto'));
