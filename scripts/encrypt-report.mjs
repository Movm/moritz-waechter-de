#!/usr/bin/env node
/**
 * Verschlüsselt eine HTML-Seite zu einer passwortgeschützten statischen Seite.
 *
 * Das Repo ist öffentlich: Ins Repo kommt nur der Ciphertext. Entschlüsselt wird
 * im Browser (WebCrypto): PBKDF2-SHA256 mit 600.000 Runden → AES-256-GCM.
 * Der Schutz hängt an der Passwortlänge – ein langes Zufallspasswort verwenden.
 *
 * Aufruf:
 *   REPORT_PASSWORD='…' node scripts/encrypt-report.mjs <eingabe.html> <ausgabe.html> "<Seitentitel>"
 *
 * <eingabe.html> darf ein vollständiges Dokument oder ein Fragment sein
 * (ohne <html>/<head>); ein Fragment wird in ein Dokument eingebettet.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';

const [input, output, title = 'Geschützter Bericht'] = process.argv.slice(2);
const password = process.env.REPORT_PASSWORD;
if (!input || !output || !password) {
  console.error('Aufruf: REPORT_PASSWORD=… node scripts/encrypt-report.mjs <eingabe.html> <ausgabe.html> "<Titel>"');
  process.exit(1);
}
if (password.length < 16) {
  console.error('Passwort zu kurz: mindestens 16 Zeichen (der Ciphertext liegt öffentlich).');
  process.exit(1);
}

const ITERATIONS = 600_000;
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

let page = readFileSync(input, 'utf8');
if (!/<html[\s>]/i.test(page)) {
  page = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow"><title>${esc(title)}</title>
<style>html{color-scheme:light dark}[hidden]{display:none!important}img{max-width:100%}</style>
</head><body>${page}</body></html>`;
}

const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const baseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt'],
);
const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(page)));
const b64 = (u8) => Buffer.from(u8).toString('base64');

const shell = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@600;700;800&family=Open+Sans:wght@400;600;700&display=swap">
<style>
  :root{--bg:#FDFCFB;--card:#fff;--ink:#1a1a1a;--muted:#5f5f5f;--rule:#E8DCC8;--accent:#316049;--on:#fff;color-scheme:light}
  @media (prefers-color-scheme:dark){:root{--bg:#1a1a1a;--card:#2a2a2a;--ink:#e5e5e5;--muted:#a8a8a8;--rule:#3a3a3a;--accent:#6BAA91;--on:#1a1a1a;color-scheme:dark}}
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--ink);
    font:400 16.5px/1.6 "Open Sans",ui-sans-serif,system-ui,sans-serif;padding:24px max(16px,env(safe-area-inset-left,0px))}
  form{width:min(100%,400px);display:grid;gap:14px;background:var(--card);border:1px solid var(--rule);border-radius:24px;padding:28px}
  .brand{font:700 1rem/1 Raleway,"Helvetica Neue",Arial,sans-serif;color:var(--accent);text-decoration:none}
  h1{font:800 1.6rem/1.15 Raleway,"Helvetica Neue",Arial,sans-serif;margin:0}
  p{margin:0;color:var(--muted);font-size:.95rem}
  label{font-size:.85rem;color:var(--muted)}
  input{font:inherit;width:100%;padding:10px 12px;border:1px solid var(--rule);border-radius:12px;background:var(--bg);color:var(--ink)}
  button{font:inherit;font-weight:700;padding:10px 14px;border:0;border-radius:12px;background:var(--accent);color:var(--on);cursor:pointer}
  button:disabled{opacity:.6;cursor:progress}
  input:focus-visible,button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
  #err{color:#b3261e;font-size:.9rem;min-height:1.3em}
</style>
</head>
<body>
<form id="f" autocomplete="off">
  <a class="brand" href="/">Moritz</a>
  <h1>${esc(title)}</h1>
  <p>Diese Seite ist passwortgeschützt.</p>
  <div><label for="pw">Passwort</label><input id="pw" type="password" required autofocus></div>
  <button id="go" type="submit">Öffnen</button>
  <div id="err" role="alert"></div>
</form>
<script>
const P = {salt: "${b64(salt)}", iv: "${b64(iv)}", it: ${ITERATIONS}, data: "${b64(cipher)}"};
const u8 = (b) => Uint8Array.from(atob(b), (c) => c.charCodeAt(0));
async function open(pw) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey({name: 'PBKDF2', salt: u8(P.salt), iterations: P.it, hash: 'SHA-256'}, base, {name: 'AES-GCM', length: 256}, false, ['decrypt']);
  const html = new TextDecoder().decode(await crypto.subtle.decrypt({name: 'AES-GCM', iv: u8(P.iv)}, key, u8(P.data)));
  try { sessionStorage.setItem('report-pw:' + location.pathname, pw); } catch (e) {}
  document.open(); document.write(html); document.close();
}
const f = document.getElementById('f'), go = document.getElementById('go'), err = document.getElementById('err');
f.addEventListener('submit', async (e) => {
  e.preventDefault(); go.disabled = true; err.textContent = '';
  try { await open(document.getElementById('pw').value); }
  catch (x) { err.textContent = 'Das Passwort stimmt nicht.'; go.disabled = false; }
});
try { const s = sessionStorage.getItem('report-pw:' + location.pathname); if (s) open(s).catch(() => {}); } catch (e) {}
</script>
</body>
</html>
`;
writeFileSync(output, shell);
console.log(`geschrieben: ${output} (${Math.round(shell.length / 1024)} KB, PBKDF2 ${ITERATIONS})`);
