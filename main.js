'use strict';

const root = document.documentElement;
const $ = (s, el = document) => el.querySelector(s);
const L = () => root.dataset.lang;
const EMAIL = 'leonardo.barraza.cantillo@gmail.com';
const TITLE = { es: 'Leonardo Barraza · Desarrollador Full Stack', en: 'Leonardo Barraza · Full Stack Developer' };
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ext = (href, text) => `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
const run = c => `<button type="button" class="run" data-cmd="${c}">${c}</button>`;

/* ---------- Idioma ---------- */

function setLang(l) {
  root.lang = l;
  root.dataset.lang = l;
  try { localStorage.setItem('lang', l); } catch (e) {}
  const u = new URL(location.href);
  if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); history.replaceState(null, '', u); }
  document.title = TITLE[l];
  drawGraph();
  renderLive();
  introStatic();
}
document.title = TITLE[L()];
$('.lang-toggle').addEventListener('click', () => setLang(L() === 'es' ? 'en' : 'es'));

/* ---------- Terminal ---------- */

const out = $('#term-out');
const input = $('#term-in');
const tbody = $('#term-body');
const GH = 'https://github.com/LeoBarraza0/';
const PROJ = [
  ['HealthByte', 'TypeScript · Vertex AI'],
  ['Book-L', 'Flutter · Supabase'],
  ['Greenity', 'Flask · MySQL'],
  ['AgroCosta', 'Next.js · Firebase'],
  ['Rennor', 'TensorFlow · RNN'],
  ['GraphMind', 'Streamlit · Gemini'],
  ['RusticOrder', 'Java · Servlets'],
];
const projLines = () => PROJ.map(([n, s]) => `drwxr-xr-x  ${ext(GH + n, n.toLowerCase() + '/')}${' '.repeat(14 - n.length)}<span class="t-d">${s}</span>`);
const helpLines = rows => rows.map(([c, d]) => `  ${run(c)}${' '.repeat(Math.max(1, 13 - c.length))}<span class="t-d">${d}</span>`);

const TXT = {
  es: {
    hint: `Escribe ${run('help')} o toca un comando.`,
    nf: c => `comando no encontrado: ${esc(c)}. Prueba ${run('help')}.`,
    lang: 'Idioma: español.',
    copied: '¡copiado!',
    help: () => ['comandos:', ...helpLines([
      ['whoami', 'quién soy'], ['ahora', 'en qué estoy trabajando'], ['proyectos', 'proyectos destacados'],
      ['stack', 'tecnologías'], ['contacto', 'cómo escribirme'], ['cv', 'descargar la hoja de vida'],
      ['git log', 'ver la trayectoria'], ['lang en', 'switch to English'], ['clear', 'limpiar la pantalla'],
    ])],
    whoami: ['Leonardo Barraza Cantillo', '<span class="t-d">Desarrollador Full Stack · Ingeniería de Sistemas</span>', '<span class="t-d">Barranquilla, Colombia (UTC-5) · trabajo remoto</span>'],
    now: [
      'Practicante de Ingeniería de Sistemas',
      '<span class="t-p">practica-sed</span> <span class="t-d">· Secretaría de Educación del Atlántico</span>',
      '  <span class="t-s">●</span> Conversor PDF → TIF con OCR',
      '    <span class="t-d">└</span> <span class="t-s">en producción</span>',
      '  <span class="t-a">●</span> Sistema de inventario, 207 sedes',
      '    <span class="t-d">└</span> <span class="t-a">en construcción</span>',
    ],
    projects: () => [...projLines(), `<span class="t-d">→ detalles en</span> <a href="#proyectos">#proyectos</a>`],
    stack: [
      `<span class="t-k">lenguajes</span>  Python, JavaScript, TypeScript, Java, Dart, SQL`,
      `<span class="t-k">web</span>        Flask, React, Next.js, Node.js, Apps Script`,
      `<span class="t-k">móvil</span>      Flutter, Supabase`,
      `<span class="t-k">datos e IA</span> MySQL, PostgreSQL, pandas, TensorFlow`,
      `<span class="t-k">nube</span>       Cloud Run, Vertex AI, Firebase, Docker`,
    ],
    contact: [
      `<span class="t-k">correo</span>    <a href="mailto:${EMAIL}">${EMAIL}</a>`,
      `<span class="t-k">whatsapp</span>  ${ext('https://wa.me/573012804688', '+57 301 280 4688')}`,
      `<span class="t-k">linkedin</span>  ${ext('https://www.linkedin.com/in/leonardo-alfonso-barraza-cantillo', 'leonardo-alfonso-barraza-cantillo')}`,
      `<span class="t-k">github</span>    ${ext('https://github.com/LeoBarraza0', 'LeoBarraza0')}`,
    ],
    cv: [`<a href="cv/Leonardo-Barraza-HV.pdf" download>Leonardo-Barraza-HV.pdf</a>  <span class="t-d">(español)</span>`, `<a href="cv/Leonardo-Barraza-Resume.pdf" download>Leonardo-Barraza-Resume.pdf</a>  <span class="t-d">(inglés)</span>`],
    ls: [`<span class="t-k">proyectos/</span>  ahora.md  stack.json  publicaciones.bib  <span class="t-s">contacto.sh</span>`],
    log: ['<span class="t-a">9d07a3f</span> <span class="t-p">(HEAD → practica-sed)</span> Inventario: 207 sedes y acceso por token', '<span class="t-a">c3a51e8</span> Conversor PDF → TIF con OCR en producción', '<span class="t-d">… historia completa en</span> <a href="#trayectoria">#trayectoria</a>'],
    research: ['Technology-Driven Strategies for Emotional Well-Being in Higher Education: A Systematic Literature Review', `<span class="t-d">IEEE C3 2025 · ponente ·</span> ${ext('https://doi.org/10.1109/C366505.2025.11340093', 'DOI')}`],
    sudo: ['[sudo] contraseña para reclutador: ********', '<span class="t-s">✓ acceso concedido.</span> Abriendo el correo…'],
    exit: [`No tan rápido: aún no has visto los ${run('proyectos')}.`],
    rm: ['<span class="t-p">rm: permiso denegado.</span> Buen intento.'],
  },
  en: {
    hint: `Type ${run('help')} or tap a command.`,
    nf: c => `command not found: ${esc(c)}. Try ${run('help')}.`,
    lang: 'Language: English.',
    copied: 'copied!',
    help: () => ['commands:', ...helpLines([
      ['whoami', 'who I am'], ['now', "what I'm working on"], ['projects', 'featured projects'],
      ['stack', 'technologies'], ['contact', 'how to reach me'], ['cv', 'download my resume'],
      ['git log', 'see my track record'], ['lang es', 'cambiar a español'], ['clear', 'clear the screen'],
    ])],
    whoami: ['Leonardo Barraza Cantillo', '<span class="t-d">Full Stack Developer · Systems Engineering</span>', '<span class="t-d">Barranquilla, Colombia (UTC-5) · remote</span>'],
    now: [
      'Systems Engineering Intern',
      '<span class="t-p">practica-sed</span> <span class="t-d">· Atlántico Secretariat of Education</span>',
      '  <span class="t-s">●</span> PDF → TIF OCR converter',
      '    <span class="t-d">└</span> <span class="t-s">in production</span>',
      '  <span class="t-a">●</span> IT-inventory system, 207 sites',
      '    <span class="t-d">└</span> <span class="t-a">in development</span>',
    ],
    projects: () => [...projLines(), `<span class="t-d">→ details at</span> <a href="#proyectos">#projects</a>`],
    stack: [
      `<span class="t-k">languages</span>  Python, JavaScript, TypeScript, Java, Dart, SQL`,
      `<span class="t-k">web</span>        Flask, React, Next.js, Node.js, Apps Script`,
      `<span class="t-k">mobile</span>     Flutter, Supabase`,
      `<span class="t-k">data & AI</span>  MySQL, PostgreSQL, pandas, TensorFlow`,
      `<span class="t-k">cloud</span>      Cloud Run, Vertex AI, Firebase, Docker`,
    ],
    contact: [
      `<span class="t-k">email</span>     <a href="mailto:${EMAIL}">${EMAIL}</a>`,
      `<span class="t-k">whatsapp</span>  ${ext('https://wa.me/573012804688', '+57 301 280 4688')}`,
      `<span class="t-k">linkedin</span>  ${ext('https://www.linkedin.com/in/leonardo-alfonso-barraza-cantillo', 'leonardo-alfonso-barraza-cantillo')}`,
      `<span class="t-k">github</span>    ${ext('https://github.com/LeoBarraza0', 'LeoBarraza0')}`,
    ],
    cv: [`<a href="cv/Leonardo-Barraza-Resume.pdf" download>Leonardo-Barraza-Resume.pdf</a>  <span class="t-d">(English)</span>`, `<a href="cv/Leonardo-Barraza-HV.pdf" download>Leonardo-Barraza-HV.pdf</a>  <span class="t-d">(Spanish)</span>`],
    ls: [`<span class="t-k">projects/</span>  now.md  stack.json  publications.bib  <span class="t-s">contact.sh</span>`],
    log: ['<span class="t-a">9d07a3f</span> <span class="t-p">(HEAD → practica-sed)</span> Inventory: 207 sites and token access', '<span class="t-a">c3a51e8</span> PDF → TIF OCR converter in production', '<span class="t-d">… full history at</span> <a href="#trayectoria">#track-record</a>'],
    research: ['Technology-Driven Strategies for Emotional Well-Being in Higher Education: A Systematic Literature Review', `<span class="t-d">IEEE C3 2025 · speaker ·</span> ${ext('https://doi.org/10.1109/C366505.2025.11340093', 'DOI')}`],
    sudo: ['[sudo] password for recruiter: ********', '<span class="t-s">✓ access granted.</span> Opening your email…'],
    exit: [`Not so fast: you haven't seen the ${run('projects')} yet.`],
    rm: ['<span class="t-p">rm: permission denied.</span> Nice try.'],
  },
};

const ALIAS = {
  help: 'help', ayuda: 'help', '?': 'help',
  whoami: 'whoami',
  ahora: 'now', now: 'now', 'git status': 'now', 'cat ahora.md': 'now', 'cat now.md': 'now',
  proyectos: 'projects', projects: 'projects', 'ls proyectos': 'projects', 'ls proyectos/': 'projects', 'ls projects': 'projects', 'ls projects/': 'projects',
  stack: 'stack', 'cat stack.json': 'stack',
  contacto: 'contact', contact: 'contact', './contacto.sh': 'contact', './contact.sh': 'contact',
  cv: 'cv', hv: 'cv', resume: 'cv',
  ls: 'ls', 'git log': 'log', 'git log --graph': 'log', 'git log --graph --oneline': 'log',
  'cat publicaciones.bib': 'research', 'cat publications.bib': 'research',
  clear: 'clear', limpiar: 'clear', cls: 'clear',
  exit: 'exit', salir: 'exit',
};
const NAMES = ['help', 'whoami', 'ahora', 'now', 'proyectos', 'projects', 'stack', 'contacto', 'contact', 'cv', 'clear', 'git log', 'lang en', 'lang es', 'sudo contratar', 'sudo hire'];

function line(html, cls) {
  const d = document.createElement('div');
  if (cls) d.className = cls;
  d.innerHTML = html || ' ';
  out.append(d);
  tbody.scrollTop = tbody.scrollHeight;
  return d;
}
const PS = '<span class="ps">leobarraza0:~$</span> ';
const print = lines => lines.forEach(l => line(l));

const hist = [];
let hi = 0;

function exec(raw) {
  hurry();
  const cmd = raw.trim().replace(/\s+/g, ' ');
  line(PS + esc(cmd), 'ln');
  if (!cmd) return;
  hist.push(cmd);
  hi = hist.length;
  const low = cmd.toLowerCase();
  const t = TXT[L()];
  const m = low.match(/^(?:lang|idioma)\s+(es|en)$/);
  if (m) { if (m[1] !== L()) setLang(m[1]); line(TXT[m[1]].lang); return; }
  if (low.startsWith('echo ')) return line(esc(cmd.slice(5)));
  const key = ALIAS[low] || (low.startsWith('sudo ') ? 'sudo' : low.startsWith('rm ') ? 'rm' : null);
  if (!key) return line(t.nf(cmd));
  if (key === 'clear') { out.innerHTML = ''; return; }
  const v = t[key];
  print(typeof v === 'function' ? v() : v);
  if (key === 'sudo') setTimeout(() => { location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(L() === 'es' ? 'Oportunidad laboral' : 'Job opportunity')}`; }, 1400);
}

// Intro que se escribe sola; cualquier interacción la completa al instante
let gen = 0;
let introRunning = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const introCmds = () => [['whoami', 'whoami'], [L() === 'es' ? 'ahora' : 'now', 'now']];

function introStatic() {
  gen++;
  introRunning = false;
  out.innerHTML = '';
  const t = TXT[L()];
  for (const [c, key] of introCmds()) { line(PS + c, 'ln'); print(t[key]); }
  line('');
  line(t.hint);
}

async function intro() {
  if (reduceMotion) return introStatic();
  const g = ++gen;
  introRunning = true;
  out.innerHTML = '';
  const t = TXT[L()];
  for (const [c, key] of introCmds()) {
    const typed = document.createElement('span');
    typed.className = 'typing';
    line(PS, 'ln').append(typed);
    for (const ch of c) {
      typed.textContent += ch;
      await sleep(60 + Math.random() * 70);
      if (g !== gen) return;
    }
    await sleep(300);
    if (g !== gen) return;
    typed.classList.remove('typing');
    print(t[key]);
    await sleep(700);
    if (g !== gen) return;
  }
  line('');
  line(t.hint);
  introRunning = false;
}

const hurry = () => { if (introRunning) introStatic(); };

$('#term-form').addEventListener('submit', e => {
  e.preventDefault();
  exec(input.value);
  input.value = '';
});

input.addEventListener('focus', hurry);
input.addEventListener('keydown', e => {
  hurry();
  if (e.key === 'ArrowUp' && hi > 0) {
    e.preventDefault();
    input.value = hist[--hi];
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    hi = Math.min(hi + 1, hist.length);
    input.value = hist[hi] || '';
  } else if (e.key === 'Tab' && input.value) {
    const v = input.value.toLowerCase();
    const opts = NAMES.filter(n => n.startsWith(v));
    if (!opts.length) return;
    e.preventDefault();
    let p = opts[0];
    for (const o of opts) while (!o.startsWith(p)) p = p.slice(0, -1);
    input.value = p;
  } else if (e.key === 'l' && e.ctrlKey) {
    e.preventDefault();
    out.innerHTML = '';
  }
});

tbody.addEventListener('click', e => {
  hurry();
  const b = e.target.closest('.run');
  if (b) return exec(b.dataset.cmd);
  if (!e.target.closest('a') && !getSelection().toString()) input.focus({ preventScroll: true });
});

// Arranca cuando la terminal se ve (en móvil queda debajo del pliegue)
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { io.disconnect(); intro(); } }, { threshold: 0.4 });
  io.observe($('#term'));
} else introStatic();

/* ---------- Git graph ---------- */

const gwrap = $('.graph-wrap');

function drawGraph() {
  const svg = gwrap.querySelector('svg');
  const rows = [...gwrap.querySelectorAll('li')];
  const W = innerWidth <= 720 ? 14 : 18;
  const X = l => 12 + l * W;
  const pts = rows.map(li => ({ li, lane: +li.dataset.lane, y: li.offsetTop + 17 }));
  const H = gwrap.offsetHeight;
  svg.setAttribute('viewBox', `0 0 64 ${H}`);
  svg.setAttribute('height', H);
  let paths = '';
  let dots = '';
  for (const lane of [0, 1, 2]) {
    const mine = pts.filter(p => p.lane === lane);
    if (!mine.length) continue;
    const top = mine.some(p => p.li.classList.contains('open')) ? 0 : mine[0].y;
    const bot = mine[mine.length - 1].y;
    if (bot > top) paths += `<path class="s${lane}" pathLength="1" d="M${X(lane)} ${top}V${bot}"/>`;
  }
  pts.forEach((p, i) => {
    if (p.li.dataset.fork) {
      const from = +p.li.dataset.fork;
      const parent = pts.slice(i + 1).find(q => q.lane === from);
      if (parent) {
        const m = (p.y + parent.y) / 2;
        paths += `<path class="s${p.lane}" pathLength="1" d="M${X(from)} ${parent.y}C${X(from)} ${m} ${X(p.lane)} ${m} ${X(p.lane)} ${p.y}"/>`;
      }
    }
    const head = p.li.classList.contains('head');
    const ring = head || p.li.classList.contains('tag');
    dots += `<circle class="f${p.lane}${ring ? ' ring' : ''}" cx="${X(p.lane)}" cy="${p.y}" r="${head ? 7 : 5.5}"/>`;
  });
  svg.innerHTML = paths + dots;
}
drawGraph();
if ('ResizeObserver' in window) new ResizeObserver(drawGraph).observe($('#graph'));

/* ---------- Aparición al hacer scroll ---------- */

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reduceMotion) {
  const ro = new IntersectionObserver(ens => ens.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); ro.unobserve(en.target); }
  }), { threshold: 0.08 });
  reveals.forEach(el => ro.observe(el));
} else reveals.forEach(el => el.classList.add('in'));

/* ---------- Dato en vivo desde GitHub ---------- */

let repos = null;

function ago(iso) {
  const rtf = new Intl.RelativeTimeFormat(L(), { numeric: 'auto' });
  let v = (new Date(iso) - Date.now()) / 1000;
  for (const [unit, n] of [['second', 60], ['minute', 60], ['hour', 24], ['day', 30], ['month', 12], ['year', Infinity]]) {
    if (Math.abs(v) < n) return rtf.format(Math.round(v), unit);
    v /= n;
  }
}

function renderLive() {
  if (!repos) return;
  $('#repo-count').textContent = repos.length;
  const last = repos.find(r => !r.fork && !/^LeoBarraza0(\.github\.io)?$/i.test(r.name));
  if (!last) return;
  const el = $('#live-push');
  el.innerHTML = `<span class="pulse" aria-hidden="true"></span><span>${L() === 'es' ? 'Último push público' : 'Latest public push'}: ${ext(esc(last.html_url), esc(last.name))} · ${ago(last.pushed_at)}</span>`;
  el.hidden = false;
}

fetch('https://api.github.com/users/LeoBarraza0/repos?per_page=100&sort=pushed')
  .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(d => { repos = d; renderLive(); })
  .catch(() => {}); // sin red o sin cuota: se queda el texto estático

/* ---------- Copiar correo ---------- */

document.querySelectorAll('.copy').forEach(b => b.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(b.dataset.copy);
    const html = b.innerHTML;
    b.textContent = TXT[L()].copied;
    setTimeout(() => { b.innerHTML = html; }, 1600);
  } catch (e) {}
}));
