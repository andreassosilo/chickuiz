
let CACHE_NAME = 'my-site-cache-v1'
// Progressive Web App: Update cache names any time any of the cached files change.
let urlsToCache = [
  '/chickuiz/offline.html',
  '/chickuiz',
  '/chickuiz/end.html',
  '/chickuiz/game.html',
  '/chickuiz/gameplay.html',
  '/chickuiz/highscores.html',
  '/chickuiz/app.css',
  '/chickuiz/game.css',
  '/chickuiz/highscores.css',
  '/chickuiz/end.js',
  '/chickuiz/game.js'
]

// You need to define a callback for the install event and decide which files you want to cache.
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    })
  )
})

// Cache and return requests
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response
        }

        return fetch(event.request).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache)
              })

            return response
          }
        )
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
