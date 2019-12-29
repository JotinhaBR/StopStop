// This is the service worker with the Cache-first network

const CACHE = "pwabuilder-precache";
const precacheFiles = [
  /* Add an array of files to precache for your app */
  "https://jotinhabr.github.io/StopStop/index.html",
  "https://jotinhabr.github.io/StopStop/index.js",
  "https://jotinhabr.github.io/StopStop/global.js",
  "https://jotinhabr.github.io/StopStop/src/img/logotipo.png",
  "https://jotinhabr.github.io/StopStop/src/css/style.css",
  "https://jotinhabr.github.io/StopStop/src/js/fun.js",
  "https://jotinhabr.github.io/StopStop/modals/carregando.html",
  "https://jotinhabr.github.io/StopStop/cenas/acertou.html",
  "https://jotinhabr.github.io/StopStop/cenas/erro.html",
  "https://jotinhabr.github.io/StopStop/cenas/inicio.html",
  "https://jotinhabr.github.io/StopStop/cenas/letrasRandom.html",
  "https://jotinhabr.github.io/StopStop/cenas/perguntas.html",
  "https://jotinhabr.github.io/StopStop/cenas/perguntas.js",
  "https://jotinhabr.github.io/StopStop/cenas/vitoria.html"
];

self.addEventListener("install", function (event) {
  console.log("[PWA Builder] Install Event processing");

  console.log("[PWA Builder] Skip waiting on install");
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      console.log("[PWA Builder] Caching pages during install");
      return cache.addAll(precacheFiles);
    })
  );
});

// Allow sw to control of current page
self.addEventListener("activate", function (event) {
  console.log("[PWA Builder] Claiming clients for current page");
  event.waitUntil(self.clients.claim());
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function (event) { 
  if (event.request.method !== "GET") return;

  event.respondWith(
    fromCache(event.request).then(
      function (response) {
        // The response was found in the cache so we responde with it and update the entry

        // This is where we call the server to get the newest version of the
        // file to use the next time we show view
        event.waitUntil(
          fetch(event.request).then(function (response) {
            return updateCache(event.request, response);
          })
        );

        return response;
      },
      function () {
        // The response was not found in the cache so we look for it on the server
        return fetch(event.request)
          .then(function (response) {
            // If request was success, add or update it in the cache
            event.waitUntil(updateCache(event.request, response.clone()));

            return response;
          })
          .catch(function (error) {
            console.log("[PWA Builder] Network request failed and no cache." + error);
          });
      }
    )
  );
});

function fromCache(request) {
  // Check to see if you have it in the cache
  // Return response
  // If not in the cache, then return
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }

      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE).then(function (cache) {
    return cache.put(request, response);
  });
}
