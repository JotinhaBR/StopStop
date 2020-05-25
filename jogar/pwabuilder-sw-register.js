go(); async function go(){
    await getConfigWEB();
    if (global.config.cacheForceClear) {
        await serviceWorkerUnRegister();
        window.location.reload();
    } else {
        await serviceWorkerRegister();
    }
}

function serviceWorkerUnRegister() {
    return new Promise((resolve, reject) => {
        console.log("[PWA Builder] Cache desativado removendo serviceWorker");

        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            for (let registration of registrations) {
                console.log('[PWA Builder] remoção do registro do Service Worker bem sucedida');
                registration.unregister();
                resolve();
            }
        }).catch(function (err) {
            console.log('[PWA Builder] Falha na remoção do registro do Service Worker: ', err);
            reject();
        });
    });
}


function serviceWorkerRegister() {
    return new Promise((resolve) => {
        console.log("[PWA Builder] Cache ativo pode usar a serviceWorker");

        if ("serviceWorker" in navigator) {
            if (navigator.serviceWorker.controller) {
                console.log("[PWA Builder] funcionário de serviço ativo encontrado, não há necessidade de registrar");
                resolve();
            } else {
                navigator.serviceWorker
                    .register("pwabuilder-sw.js?global=" + encodeURIComponent(btoa(JSON.stringify(global))), {
                        scope: "./"
                    })
                    .then(function (reg) {
                        console.log("[PWA Builder] O trabalhador do serviço foi registrado para o escopo: " + reg.scope);
                        global.config.cacheForceClear = false;
                        resolve();
                    });
            }
        }
    });
}