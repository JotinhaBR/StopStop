var numeroLetraRandom = uniqueRandom(1, 25);


async function clickRedirect(url) {
    modalAtivar("carregando");
    window.location.href = url;
}

async function mudarCena(nome, body = "body") {
    await modalAtivar("carregando");
    var res = await getHTML(global.config.front.host + '/cenas/' + nome + '.html');
    await modalDesAtivar("carregando");
    $(body).html(res);
    if (nome == "inicio") {
        mudarDificuldadeDoJogo();   
    }
    return;
}

function letraRandom() {
    var letra = Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "U", "V", "W", "X", "Y", "Z");
    var retorno = letra[numeroLetraRandom()];
    if (String(retorno) == "undefined") {
        retorno = letra[numeroLetraRandom()];
        if (String(retorno) == "undefined") {
            retorno = letra[numeroLetraRandom()];
        }
    }
    return retorno;
}

function embaralhadorDeArray(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function modalAtivar(nome) {
    return new Promise((resolve) => {
        $(document).ready(function () {
            $("#modal_" + nome).remove();
            getHTML(global.config.front.host + '/modals/' + nome + '.html').then((res) => {
                $("body").append(res);
                setTimeout(() => {
                    $("#modal_" + nome).modal("show");
                    $("#modal_" + nome).addClass("animated fadeIn");
                }, 500);
                resolve();
            });
        });
    });
}

function modalDesAtivar(nome) {
    return new Promise((resolve) => {
        $(document).ready(function () {
            $("#modal_" + nome).addClass("animated fadeOut");
            $(".modal-backdrop").addClass("animated fadeOut");
            setTimeout(() => {
                $("#modal_" + nome).modal().hide();
                $("#modal_" + nome).modal("hide");
                $("#modal_" + nome).remove();
                $(".modal-backdrop").remove();
                resolve();
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

async function getConfigWEB() {
    return new Promise(async(resolve, reject) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(global.config.front.host+"/configWEB.json", requestOptions)
        .then(async(response) => {
            var resposta = await response.json();
            localStorage.setItem("configWEB", btoa(JSON.stringify(resposta)));
            console.log(resposta.versao,localStorage.getItem("ultimaVersao"));
            if (String(resposta.versao) === String(localStorage.getItem("ultimaVersao"))) {
                global.config.cacheForceClear = false;
            } else {
                localStorage.setItem("ultimaVersao", resposta.versao);
                global.config.cacheForceClear = true;
            }
            console.log(resposta.versao,localStorage.getItem("ultimaVersao"),global.config.cacheForceClear);
            resolve(resposta)
        })
        .catch(error => {
            var resposta = {
                versao: "ErroDeConexaoSemInternet"
            }
            localStorage.setItem("configWEB", btoa(JSON.stringify(resposta)));
            reject(error)
        });
    });
}

function uniqueRandom(minimum, maximum) {
	let previousValue;
	return function random() {
		const number = Math.floor(
			(Math.random() * (maximum - minimum + 1)) + minimum
		);
		previousValue = number === previousValue && minimum !== maximum ? random() : number;
		return previousValue;
	};
};