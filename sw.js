// Service worker: deixa o app abrir sem internet.
// Ao publicar uma versão nova, aumente o número em CACHE para forçar a atualização.
const CACHE = 'cronograma-r1-v4';
const SHELL = [
  './', './index.html', './app.js', './firebase.js', './firebase-config.js',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'
];
const CDN = ['www.gstatic.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Arquivos do próprio app: tenta a rede (para pegar atualizações) e usa o cache sem internet.
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req, { ignoreSearch: true })
        .then(r => r || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)))
    );
    return;
  }

  // SDK do Firebase e fontes: usa o cache e atualiza em segundo plano.
  if (CDN.includes(url.hostname) && !url.pathname.includes('/__/')) {
    e.respondWith(
      caches.open(CACHE).then(c => c.match(req).then(hit => {
        const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }))
    );
  }
  // Login e banco de dados (Firebase) passam direto pela rede.
});
