const CACHE_NAME = 'pertracker-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.global.prod.min.js'
];

// Install event - cache resources
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(e.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // Clone the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(e.request, responseToCache);
            });
          return response;
        });
      })
  );
});

// Background sync for data backup
self.addEventListener('sync', (e) => {
  if (e.tag === 'background-sync') {
    e.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Sync period data when back online
  return new Promise((resolve) => {
    console.log('Background sync triggered');
    resolve();
  });
}

// Push notifications
self.addEventListener('push', (e) => {
  const options = {
    body: e.data ? e.data.text() : 'PerTracker notification',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  
  e.waitUntil(
    self.registration.showNotification('PerTracker', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow('./index.html')
  );
});
