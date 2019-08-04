
let CACHE_NAME = 'my-site-cache-v1'
// Progressive Web App: Update cache names any time any of the cached files change.
let urlsToCache = [
  '/chickuiz/offline.html'
]

// You need to define a callback for the install event and decide which files you want to cache.
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('[ServiceWorker] Pre-caching offline page')
      return cache.addAll(urlsToCache)
    })
  )
})

// Update a service worker
self.addEventListener('activate', function (event) {
  // Progressive Web App: Remove previous cached data from disk.
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
})

// Cache and return requests
self.addEventListener('fetch', function (event) {
  if (event.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return
  }
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match('/chickuiz/offline.html')
          })
      })
  )
})
