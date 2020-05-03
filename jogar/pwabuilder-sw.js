let global = new URL(location).searchParams.get('global');
global = JSON.parse(atob(global));


// This is the service worker with the Cache-first network
const CACHE = "pwabuilder-precache";
const precacheFiles = [];

/* Add an array of files to precache for your app */
if (global.config.precache) {
  precacheFiles.push(
    global.config.front.host + "/index.html",
    global.config.front.host + "/index.js",
    global.config.front.host + "/src/img/logotipo.png",
    global.config.front.host + "/src/css/style.css",
    global.config.front.host + "/src/css/fw/animate.css",
    global.config.front.host + "/src/css/fw/bootstrap.css",
    global.config.front.host + "/src/css/fw/fontawesome-pro-5.12.0-web/css/all.min.css",
    global.config.front.host + "/src/js/fun.js",
    global.config.front.host + "/modals/carregando.html",
    global.config.front.host + "/cenas/acertou.html",
    global.config.front.host + "/cenas/erro.html",
    global.config.front.host + "/cenas/inicio.html",
    global.config.front.host + "/cenas/letrasRandom.html",
    global.config.front.host + "/cenas/perguntas.html",
    global.config.front.host + "/cenas/perguntas.js",
    global.config.front.host + "/cenas/vitoria.html"
  );
}

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
