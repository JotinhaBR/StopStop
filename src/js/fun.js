async function clickRedirect(url) {
    modalAtivar("carregando");
    window.location.href = url;
}

function letraRandom() {
    var letra = Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z");
    var numero = Math.floor(Math.random() * letra.length);
    return letra[numero];
}

function modalAtivar(nome) {
    return new Promise((resolve) => {
        $(document).ready(function () {
            $("#modal_" + nome).remove();
            getHTML(config.front.host+'/modals/' + nome + '.html').then((res) => {
                $("body").append(res);
                $("#modal_" + nome).modal("show");
                $("#modal_" + nome).addClass("animated fadeIn");
                resolve();
            });
        });
    });
}

function modalDesAtivar(nome) {
    return new Promise((resolve) => {
        $(document).ready(function () {
            setTimeout(() => {
                $("#modal_" + nome).addClass("animated fadeOut");
                $(".modal-backdrop").addClass("animated fadeOut");
                setTimeout(() => {
                    $("#modal_" + nome).modal("hide");
                    $("#modal_" + nome).remove();
                    $(".modal-backdrop").remove();
                    resolve();
                }, 1000);
            }, 1000);
        });
    });
}

function getFormObj(form) {
    var formObj = {};
    var inputs = $(form).serializeArray();
    $.each(inputs, function (i, input) {
        formObj[input.name] = input.value;
    });
    return formObj;
}

function includeHTML() {
    var z, i, elmnt, file;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            getHTML(file).then((res) => {
                elmnt.innerHTML = res;
            }).catch((err) => {
                elmnt.innerHTML = err;
            });
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
            return;
        }
    }
}

async function getHTML(file) {
    return new Promise((resolve, reject) => {
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { resolve(this.responseText); }
                    if (this.status == 404) { reject("Page not found."); }
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }

    });
}