

if ((global.config.precache) && (global.config.versao === global.config.versao)) {
    // Precache ativo pode usar a serviceWorker

    if ("serviceWorker" in navigator) {
        if (navigator.serviceWorker.controller) {
            console.log("[PWA Builder] active service worker found, no need to register");
        } else {
            navigator.serviceWorker
                .register("pwabuilder-sw.js?global=" + encodeURIComponent(btoa(JSON.stringify(global))), {
                    scope: "./"
                })
                .then(function (reg) {
                    console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
                });
        }
    }
} else {
    // Precache desativado removendo serviceWorker

    navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
            registration.unregister()
        }
    }).catch(function (err) {
        console.log('Service Worker unregistration failed: ', err);
    });
}
