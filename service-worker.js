const CACHE_NAME = 'alta-miner-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './alta-coin.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
