const CACHE_NAME = 'pertracker-v2';
const APP_VERSION = '2.0.0';

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './screenshots/mobile.jpg',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.global.prod.min.js'
];

// Install event - cache resources immediately
self.addEventListener('install', (e) => {
  console.log('SW: Install event');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Caching resources');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('SW: Skip waiting');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('SW: Cache failed', err);
      })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', (e) => {
  console.log('SW: Activate event');
  e.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('SW: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - offline-first strategy
self.addEventListener('fetch', (e) => {
  // Skip non-GET requests
  if (e.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!e.request.url.startsWith('http')) {
    return;
  }

  e.respondWith(
    caches.match(e.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('SW: Serving from cache', e.request.url);
          return cachedResponse;
        }

        // Try to fetch from network
        return fetch(e.request.clone())
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone and cache the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(e.request, responseToCache);
              });

            return response;
          })
          .catch((err) => {
            console.log('SW: Network failed, trying cache', e.request.url);
            // If network fails, try to serve from cache again
            return caches.match(e.request);
          });
      })
  );
});

// Background sync for data persistence
self.addEventListener('sync', (e) => {
  console.log('SW: Background sync', e.tag);
  if (e.tag === 'background-sync') {
    e.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  return new Promise((resolve) => {
    console.log('SW: Background sync completed');
    // Here you could sync data with server when connection is restored
    resolve();
  });
}

// Handle push notifications
self.addEventListener('push', (e) => {
  console.log('SW: Push notification received');
  
  const title = 'PerTracker';
  const options = {
    body: e.data ? e.data.text() : 'PerTracker notification',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 'pertracker-notification'
    },
    actions: [
      {
        action: 'open',
        title: 'Open PerTracker'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ],
    tag: 'pertracker-notification',
    renotify: true
  };
  
  e.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (e) => {
  console.log('SW: Notification clicked', e.action);
  e.notification.close();

  if (e.action === 'open' || !e.action) {
    e.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes('pertracker') && 'focus' in client) {
            return client.focus();
          }
        }
        // Open new window if not already open
        if (clients.openWindow) {
          return clients.openWindow('./');
        }
      })
    );
  }
});

// Handle message events from the main thread
self.addEventListener('message', (e) => {
  console.log('SW: Message received', e.data);
  
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (e.data && e.data.type === 'GET_VERSION') {
    e.ports[0].postMessage({
      type: 'VERSION',
      version: APP_VERSION
    });
  }
});

// Handle window focus for better PWA behavior
self.addEventListener('windowcontrolsoverlay', (e) => {
  console.log('SW: Window controls overlay event');
});
