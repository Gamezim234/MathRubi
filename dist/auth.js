'use strict';
// Login sem senha: usuário + código TOTP (RFC 6238) de um app autenticador.
// Tudo roda no navegador (localStorage); o lab.js só é carregado depois do login.
const AUTH = (() => {
  const ACCOUNTS = 'mathrubi-accounts', SESSION = 'mathrubi-session', LEGACY = 'mathrubi-v2';
  const STEP = 30, DIGITS = 6, MAX_FAILS = 5, LOCK_MS = 60000;
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  const read = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
  const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } };
  const accounts = () => read(ACCOUNTS) || {};

  function base32Encode(bytes) {
    let bits = '', out = '';
    for (const b of bytes) bits += b.toString(2).padStart(8, '0');
    for (let i = 0; i < bits.length; i += 5) out += ALPHABET[parseInt(bits.slice(i, i + 5).padEnd(5, '0'), 2)];
    return out;
  }
  function base32Decode(text) {
    let bits = '';
    for (const c of text) bits += ALPHABET.indexOf(c).toString(2).padStart(5, '0');
    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) bytes.push(parseInt(bits.slice(i, i + 8), 2));
    return new Uint8Array(bytes);
  }
  async function hotp(secret, counter) {
    const key = await crypto.subtle.importKey('raw', base32Decode(secret), {name: 'HMAC', hash: 'SHA-1'}, false, ['sign']);
    const msg = new DataView(new ArrayBuffer(8));
    msg.setUint32(0, Math.floor(counter / 2 ** 32));
    msg.setUint32(4, counter >>> 0);
    const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, msg));
    const o = sig[19] & 15;
    const bin = ((sig[o] & 0x7f) << 24) | (sig[o + 1] << 16) | (sig[o + 2] << 8) | sig[o + 3];
    return String(bin % 10 ** DIGITS).padStart(DIGITS, '0');
  }
  // Aceita o passo atual e um vizinho (relógios levemente fora de hora); um passo já usado não vale de novo.
  async function check(secret, code, lastUsed = -1) {
    const now = Math.floor(Date.now() / 1000 / STEP);
    for (const delta of [0, -1, 1]) {
      const counter = now + delta;
      if (counter > lastUsed && await hotp(secret, counter) === code) return counter;
    }
    return -1;
  }
  const newSecret = () => base32Encode(crypto.getRandomValues(new Uint8Array(20)));
  const uri = (name, secret) => 'otpauth://totp/MathRubi:' + encodeURIComponent(name) +
    '?secret=' + secret + '&issuer=MathRubi&algorithm=SHA1&digits=' + DIGITS + '&period=' + STEP;

  // Códigos de recuperação: 8 códigos de uso único; só o hash (SHA-256) fica guardado.
  const cleanRecovery = text => text.toUpperCase().replace(/[^A-Z0-9]/g, '');
  async function sha256Hex(text) {
    const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
    return [...digest].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  async function newRecoveryCodes() {
    const codes = Array.from({length: 8}, () => {
      const raw = [...crypto.getRandomValues(new Uint8Array(8))].map(b => ALPHABET[b % 32]).join('');
      return raw.slice(0, 4) + '-' + raw.slice(4);
    });
    return {codes, hashes: await Promise.all(codes.map(code => sha256Hex(cleanRecovery(code))))};
  }

  function el(tag, props = {}, ...kids) {
    const node = Object.assign(document.createElement(tag), props);
    node.append(...kids);
    return node;
  }

  function start(name) {
    if (!api.cloud) write(SESSION, name);
    api.user = name;
    $gate.remove();
    $main.hidden = false;
    const chip = el('span', {className: 'tag', textContent: '@' + name, title: accounts()[name]?.email || ''});
    const out = el('button', {textContent: 'Sair', onclick: async () => {
      if (api.cloud) {
        try { await accountRequest('logout', {}); }
        catch { out.textContent = 'Tente sair novamente'; return; }
      }
      try { localStorage.removeItem(SESSION); } catch {}
      location.reload();
    }});
    out.style.padding = '6px 12px';
    document.querySelector('header').append(el('span', {}, chip, ' ', out));
    document.body.append(el('script', {src: 'lab.js?v=17'}));
  }

  // ---- telas do portão
  const $main = document.querySelector('main');
  const $gate = el('section', {className: 'card auth-card'});
  $gate.style.cssText = 'max-width:460px;margin:48px auto';
  $gate.setAttribute('aria-labelledby', 'gateTitle');

  function screen(tag, title, text, ...rest) {
    $gate.replaceChildren(
      el('img', {className: 'auth-mascot', src: 'assets/rubi-wave.svg', alt: 'Rubi, seu parceiro de estudos', width: 132, height: 132}),
      el('span', {className: 'tag', textContent: tag}),
      el('h2', {id: 'gateTitle', tabIndex: -1, textContent: title}),
      el('p', {textContent: text}), ...rest);
    $gate.querySelector('#gateTitle').focus();
  }
  function form(label, attrs, button, onSubmit) {
    const input = el('input', Object.assign({ariaLabel: label, autocomplete: 'off'}, attrs));
    const msg = el('p', {role: 'alert'});
    const go = el('button', {className: 'primary', textContent: button});
    const f = el('form', {onsubmit: async event => {
      event.preventDefault();
      go.disabled = true;
      msg.textContent = '';
      try { msg.textContent = (await onSubmit(input.value)) || ''; } catch { msg.textContent = 'Algo deu errado. Tente de novo.'; }
      go.disabled = false;
      input.select();
    }}, input, go);
    return [f, msg, input];
  }

  function askUser() {
    const [f, msg, input] = form('Nome de usuário', {placeholder: 'seu_usuario', maxLength: 20, autocapitalize: 'none', spellcheck: false}, 'Continuar →', value => {
      const name = value.trim().toLowerCase();
      if (!/^[a-z0-9_]{3,20}$/.test(name)) return 'Use de 3 a 20 letras minúsculas, números ou _ (sem espaços).';
      if (api.cloud) {
        return accountRequest('lookup', {name}).then(result => {
          if (result.exists) askCode(name);
          else if (result.reserved) askEmail(name, true);
          else offerSignup(name);
        }).catch(error => error.message);
      }
      if (accounts()[name]) askCode(name); else offerSignup(name);
    });
    screen('ENTRAR', 'Quem está estudando?', 'Digite seu nome de usuário. Em seguida pediremos o código do seu app autenticador. Não existe senha.', f, msg);
    input.focus();
  }

  function offerSignup(name) {
    screen('NOVA CONTA', '@' + name + ' ainda não existe', 'Quer criar essa conta? Você vai ligá-la a um app autenticador (Google Authenticator, Authy, Microsoft Authenticator, 2FAS…).',
      el('div', {className: 'actions'},
        el('button', {className: 'primary', textContent: 'Criar conta', onclick: () => askEmail(name)}),
        el('button', {textContent: '← Outro usuário', onclick: askUser})));
  }

  // O e-mail só identifica a conta: fica guardado neste navegador e nada é enviado.
  function askEmail(name, reserved = false) {
    const [f, msg, input] = form('E-mail', {type: 'email', placeholder: 'voce@exemplo.com', maxLength: 100, autocomplete: 'email', autocapitalize: 'none', spellcheck: false}, 'Continuar →', value => {
      const email = value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return 'Digite um e-mail válido, como voce@exemplo.com.';
      if (!reserved) setup(name, email);
      else {
        const [activation, notice, field] = form('Código de ativação', {type:'password', maxLength: 100}, 'Continuar →', invite => {
          setup(name, email, false, invite.trim());
        });
        screen('ATIVAÇÃO', 'Ative @' + name, 'Use o código de ativação privado da conta.', activation, notice,
          el('button', {textContent: '← Cancelar', onclick: askUser}));
        field.focus();
      }
    });
    screen('NOVA CONTA', 'Qual é o seu e-mail?', api.cloud
      ? 'O servidor usa o e-mail para identificar a conta. O MathRubi não envia mensagens.'
      : 'Ele identifica a conta @' + name + ' e fica guardado só neste navegador. Não enviamos nenhuma mensagem. Para recuperar o acesso, você vai usar o e-mail junto com um código de recuperação.', f, msg,
      el('button', {textContent: '← Cancelar', onclick: askUser}));
    input.focus();
  }

  // relink = true: a conta já existe e só troca o autenticador (depois de usar um código de recuperação).
  function setup(name, email, relink = false, invite = '') {
    const secret = newSecret();
    const grouped = secret.match(/.{1,4}/g).join(' ');
    const [f, msg, input] = form('Código de 6 dígitos', {inputMode: 'numeric', pattern: '[0-9 ]*', maxLength: 7, placeholder: '000000'}, 'Confirmar', async value => {
      const code = value.replace(/\s/g, '');
      if (!/^\d{6}$/.test(code)) return 'O código tem 6 dígitos.';
      if (api.cloud) {
        try {
          const result = await accountRequest('register', {name, email, invite, secret, code});
          api.progress = result.progress;
          start(name);
        } catch (error) { return error.message; }
        return;
      }
      const counter = await check(secret, code);
      if (counter < 0) return 'Código incorreto. Confira a chave no app e o horário do aparelho.';
      const all = accounts();
      const recovery = await newRecoveryCodes();
      if (relink) {
        if (!all[name]) return 'Conta não encontrada.';
        Object.assign(all[name], {secret, last: counter, fails: 0, until: 0, recovery: recovery.hashes});
      } else {
        if (all[name]) return 'Esse usuário acabou de ser criado em outra aba.';
        if (!Object.keys(all).length) { // o progresso anterior ao login passa para a primeira conta
          try { const old = localStorage.getItem(LEGACY); if (old) { localStorage.setItem(LEGACY + ':' + name, old); localStorage.removeItem(LEGACY); } } catch {}
        }
        all[name] = {secret, email, recovery: recovery.hashes, last: counter, fails: 0, until: 0, created: Date.now()};
      }
      if (!write(ACCOUNTS, all)) return 'Não foi possível salvar a conta neste navegador.';
      showRecoveryCodes(name, recovery.codes, relink);
    });
    const key = el('div', {className: 'formula', textContent: grouped});
    key.style.fontSize = '20px';
    // O QR leva só o essencial (SHA-1, 6 dígitos e 30 s são os padrões dos autenticadores), para caber numa versão pequena.
    let qr = null;
    try {
      qr = QR.svg('otpauth://totp/MathRubi:' + name + '?secret=' + secret + '&issuer=MathRubi', 'QR Code para ligar o autenticador à conta @' + name);
      qr.style.cssText = 'width:min(240px,100%);height:auto;display:block;margin:12px auto;border-radius:12px';
    } catch {}
    screen(relink ? 'RECUPERAÇÃO' : 'NOVA CONTA', relink ? 'Ligue o novo autenticador' : 'Ligue o autenticador',
      (qr ? 'No app autenticador (Google Authenticator, Authy, 2FAS…), escolha “adicionar conta” → “ler QR code” e aponte a câmera para o código abaixo. ' : '') +
      'Se não puder escanear, escolha “inserir chave de configuração”, com o nome MathRubi, e digite a chave (tipo: baseada em tempo). Anote a chave num lugar seguro: sem ela, e sem senha, não há como recuperar a conta.',
      ...(qr ? [qr] : []),
      key,
      el('p', {}, 'No celular, ', el('a', {href: uri(name, secret), textContent: 'toque aqui para abrir direto no app'}), '.'),
      el('p', {textContent: 'Depois digite o código de 6 dígitos que o app mostrar:'}), f, msg,
      el('button', {textContent: '← Cancelar', onclick: askUser}));
    input.focus();
  }

  function showRecoveryCodes(name, codes, relink) {
    const list = el('div', {className: 'formula'});
    list.style.cssText = 'font-size:20px;display:grid;grid-template-columns:1fr 1fr;gap:8px 16px;text-align:center';
    codes.forEach(code => list.append(el('span', {textContent: code})));
    const copy = el('button', {textContent: 'Copiar códigos', onclick: async () => {
      try { await navigator.clipboard.writeText(codes.join('\n')); copy.textContent = 'Copiado ✓'; } catch { copy.textContent = 'Não foi possível copiar: anote à mão'; }
    }});
    screen(relink ? 'RECUPERAÇÃO' : 'NOVA CONTA', 'Guarde seus códigos de recuperação',
      'Se um dia você perder o app autenticador, cada código abaixo vale UMA vez para voltar à conta e ligar um autenticador novo. Eles não serão mostrados de novo' + (relink ? ', e os códigos antigos deixaram de valer' : '') + '. Guarde num lugar seguro, fora deste navegador.',
      list, el('div', {className: 'actions'}, copy, el('button', {className: 'primary', textContent: 'Já guardei, entrar →', onclick: () => start(name)})));
  }

  function askRecovery(name) {
    const emailInput = el('input', {type: 'email', ariaLabel: 'E-mail da conta', placeholder: 'e-mail cadastrado', autocomplete: 'email', maxLength: 100, autocapitalize: 'none', spellcheck: false});
    const [f, msg, input] = form('Código de recuperação', {placeholder: 'XXXX-XXXX', maxLength: 12, autocapitalize: 'characters', spellcheck: false}, 'Recuperar conta', async value => {
      const all = accounts(), acc = all[name];
      if (!acc) return 'Conta não encontrada.';
      if (!acc.email || !acc.recovery?.length) return 'Esta conta não tem e-mail e códigos de recuperação (foi criada antes deles existirem), então não dá para recuperá-la por aqui.';
      const wait = Math.ceil((acc.until - Date.now()) / 1000);
      if (wait > 0) return 'Muitas tentativas. Aguarde ' + wait + 's.';
      const hash = await sha256Hex(cleanRecovery(value));
      const at = acc.recovery.indexOf(hash);
      if (emailInput.value.trim().toLowerCase() !== acc.email || at < 0) {
        acc.fails = (acc.fails || 0) + 1;
        if (acc.fails >= MAX_FAILS) { acc.fails = 0; acc.until = Date.now() + LOCK_MS; }
        write(ACCOUNTS, all);
        return 'E-mail ou código de recuperação incorreto (cada código vale uma vez).';
      }
      acc.recovery.splice(at, 1); // o código usado deixa de valer
      acc.fails = 0; acc.until = 0;
      write(ACCOUNTS, all);
      setup(name, acc.email, true);
    });
    f.prepend(emailInput);
    f.style.flexWrap = 'wrap';
    screen('RECUPERAÇÃO', 'Perdi o autenticador', 'Digite o e-mail cadastrado em @' + name + ' e um dos códigos de recuperação que você guardou. Depois você liga um autenticador novo.', f, msg,
      el('button', {textContent: '← Voltar', onclick: () => askCode(name)}));
    emailInput.focus();
  }

  function askCode(name) {
    const [f, msg, input] = form('Código de 6 dígitos', {inputMode: 'numeric', pattern: '[0-9 ]*', maxLength: 7, placeholder: '000000', autocomplete: 'one-time-code'}, 'Entrar', async value => {
      if (api.cloud) {
        try {
          const result = await accountRequest('login', {name, code: value.replace(/\s/g, '')});
          api.progress = result.progress;
          start(name);
        } catch (error) { return error.message; }
        return;
      }
      const all = accounts(), acc = all[name];
      if (!acc) return 'Conta não encontrada.';
      const wait = Math.ceil((acc.until - Date.now()) / 1000);
      if (wait > 0) return 'Muitas tentativas. Aguarde ' + wait + 's.';
      const code = value.replace(/\s/g, '');
      if (!/^\d{6}$/.test(code)) return 'O código tem 6 dígitos.';
      const counter = await check(acc.secret, code, acc.last);
      if (counter < 0) {
        acc.fails = (acc.fails || 0) + 1;
        if (acc.fails >= MAX_FAILS) { acc.fails = 0; acc.until = Date.now() + LOCK_MS; }
        write(ACCOUNTS, all);
        return 'Código incorreto ou já usado. Espere o próximo código do app.';
      }
      acc.last = counter; acc.fails = 0; acc.until = 0;
      write(ACCOUNTS, all);
      start(name);
    });
    screen('VERIFICAÇÃO', 'Olá, @' + name, 'Abra o app autenticador e digite o código de 6 dígitos do MathRubi.', f, msg,
      el('div', {className: 'actions'},
        ...(api.cloud ? [] : [el('button', {textContent: 'Perdi o autenticador', onclick: () => askRecovery(name)})]),
        el('button', {textContent: '← Não sou @' + name, onclick: askUser})));
    input.focus();
  }

  async function accountRequest(action, body) {
    const response = await fetch('/api/account/' + action, body === undefined ? {cache:'no-store'} : {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body)
    });
    if (action === 'session' && (response.status === 404 || !response.headers.get('content-type')?.includes('application/json'))) return null;
    const result = await response.json();
    if (!response.ok) throw Error(result.error || 'A conta está indisponível agora.');
    return result;
  }
  const api = {user: null, cloud: false, progress: null, sync: progress => accountRequest('progress', {progress})};
  const localLogin = () => {
    const remembered = read(SESSION);
    if (typeof remembered === 'string' && accounts()[remembered]) start(remembered); else askUser();
  };
  async function connect() {
    try {
      const result = await accountRequest('session');
      if (!result) return localLogin();
      api.cloud = true;
      api.progress = result.progress;
      if (result.user) start(result.user); else askUser();
    } catch {
      screen('CONEXÃO', 'Conta indisponível', 'Não foi possível conectar ao servidor.',
        el('button', {textContent:'Tentar novamente', onclick:connect}));
    }
  }
  if (!(window.crypto && crypto.subtle)) {
    $main.hidden = true;
    document.body.insertBefore($gate, $main);
    screen('ERRO', 'Navegador sem suporte', 'O login precisa de criptografia do navegador (Web Crypto). Abra o app por http://localhost:5183 (node tools/serve.js) ou use um navegador atual.');
  } else {
    $main.hidden = true;
    document.body.insertBefore($gate, $main);
    if (location.protocol === 'file:') localLogin();
    else connect();
  }
  return api;
})();
