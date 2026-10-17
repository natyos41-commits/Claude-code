/* Service worker: makes the app installable and fully usable offline (at the gym). */
var CACHE = 'wlog-v1';
var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './vendor/xlsx.full.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', function (ev) {
  ev.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (ev) {
  if (ev.request.method !== 'GET') return;
  var url = new URL(ev.request.url);
  if (url.origin !== location.origin) return;

  // The page itself: network first so updates arrive, cache fallback so it opens offline.
  if (ev.request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    ev.respondWith(
      fetch(ev.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html');
      })
    );
    return;
  }

  // Everything else (library, icons, manifest): cache first.
  ev.respondWith(
    caches.match(ev.request).then(function (hit) {
      return hit || fetch(ev.request).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(ev.request, copy); });
        return res;
      });
    })
  );
});
