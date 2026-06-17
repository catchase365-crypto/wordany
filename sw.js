var C='v_1781714136978';
var assets = ['./', './index.html', './manifest.json', 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.2/peerjs.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js', 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'];
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(assets)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k !== C && caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  let requestToFetch = e.request;
  if (e.request.mode === 'navigate') {
    requestToFetch = new Request(e.request, { cache: 'reload' });
  }
  e.respondWith(
    fetch(requestToFetch)
      .then(res => {
        if (res && res.status === 200) {
          var resClone = res.clone();
          caches.open(C).then(c => c.put(e.request, resClone));
        }
        return res;
      })
      .catch(() => caches.match(e.request).then(cached => cached || new Response('Offline', { status: 503 })))
  );
});