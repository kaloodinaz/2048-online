const CACHE_NAME = '2048-cache-v1';
const urlsToCache = [
  'https://kaloodinaz.github.io/2048-online/index.html',
  'https://kaloodinaz.github.io/2048-online/favicon.ico',
  'https://kaloodinaz.github.io/2048-online/main.js',
  'https://kaloodinaz.github.io/2048-online/main.css',
  'https://kaloodinaz.github.io/2048-online/icons/icon-72x72.png',
  'https://kaloodinaz.github.io/2048-online/icons/icon-96x96.png',
  'https://kaloodinaz.github.io/2048-online/icons/icon-128x128.png',
  'https://kaloodinaz.github.io/2048-online/icons/icon-144x144.png',
  'https://kaloodinaz.github.io/2048-online/icons/icon-152x152.png',
  'https://kaloodinaz.github.io/2048-online/icons/icon-192x192.png',
  'https://kaloodinaz.github.io/2048-online/icons/icon-384x384.png',
  'https://kaloodinaz.github.io/2048-online/icons/icon-512x512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => console.log('Cache successfully initialized'))
      .catch(error => console.log('Cache initialization failed:', error))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(error => console.log('Fetch error:', error))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
