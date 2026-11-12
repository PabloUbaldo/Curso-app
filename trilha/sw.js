/* Service worker do Trilha: guarda os arquivos para funcionar offline.
   Ao atualizar qualquer arquivo do app, aumente VERSION para os aparelhos pegarem a versão nova. */
const VERSION = 'trilha-1.1.0';
const ARQUIVOS = [
  './', 'index.html', 'manifest.webmanifest', 'css/app.css',
  'js/sha256.js', 'js/md.js', 'js/core.js', 'js/ui.js',
  'cursos/carreira.js', 'cursos/dev.js', 'cursos/ingles.js', 'cursos/obsidian.js',
  'icons/icon-192.png', 'icons/icon-512.png'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    const copia = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copia)); return r;
  }).catch(() => caches.match('index.html'))));
});
