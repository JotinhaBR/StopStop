function submitFormPerguntasNaoSei() {
    event.preventDefault();
    $("#cenas_perguntas #resposta").val("NAO_SEI");
    $("#formPerguntas").submit();
}

async function submitFormPerguntas(shelf) {
    event.preventDefault();
    var formId = $(shelf).attr("id");
    var formData = getFormObj("#" + formId);
    var respostaPrimeraLetra = formData.resposta.substring(0, 1);
    global.jogo.nPerguntaAtual++;

    if (formData.resposta.length >= 2) {
        if (formData.resposta === "NAO_SEI") {
            if (global.jogo.nPerguntaAtual >= global.jogo.perguntas.length) {
                //  Clicou em não sei, vitoriaa
                global.jogo.pontosAtual = global.jogo.pontosAtual + 1;
                await mudarCena('vitoria');
                return;
            } else
                if (global.jogo.nPerguntaAtual !== 0) {
                    // Clicou em não sei, passando pra proxima pergunta
                    global.jogo.pontosAtual = global.jogo.pontosAtual + 1;

                    await mudarCena("acertou");
                    $("#cenas_acertou h1").html("Passou");
                    $("#cenas_acertou p").html("Você escolheu a saída mais fácil, vamo pra próxima pergunta !");
                    setTimeout(async () => {
                        await mudarCena('perguntas');
                    }, 1000);
                    return;
                }
        } else
            if (respostaPrimeraLetra.toUpperCase() === global.jogo.letraAtualDoJogo.toUpperCase()) {
                if (global.jogo.nPerguntaAtual >= global.jogo.perguntas.length) {
                    // Vitoriaa
                    global.jogo.pontosAtual = global.jogo.pontosAtual + 10;
                    await mudarCena('vitoria');
                    return;
                } else
                    if (global.jogo.nPerguntaAtual !== 0) {
                        // Acertou indo para procima pergunta.
                        global.jogo.pontosAtual = global.jogo.pontosAtual + 10;

                        await mudarCena("acertou");
                        $("#cenas_acertou h1").html("Booaaa");
                        $("#cenas_acertou p").html("Você acertou, booaaa, vamo pra próxima pergunta !");
                        setTimeout(async () => {
                            await mudarCena('perguntas');
                        }, 1000);
                        return;
                    } else {
                        // erro não esperado
                        console.log(formData, global);
                        await mudarCena("erro");
                        $("#cenas_erro h1").html("Erro inesperado");
                        $("#cenas_erro p").html("Parece que ocorreu um erro inesperado em nosso código, deixe o desenvolvedor saber o que aconteceu.");
                        $("#cenas_erro .conteudoAdd").html('<button onclick=\'mudarCena("inicio")\' type="button" class="btn btn-stopstop">Voltar ao Início</button>');
                    }
            } else {
                // errou
                await mudarCena("erro");
                $("#cenas_erro h1").html("Errrrouu");
                $("#cenas_erro p").html("Parece que essa resposta não começa com a letra " + global.jogo.letraAtualDoJogo + ".");
                $("#cenas_erro .conteudoAdd").html('<button onclick=\'mudarCena("inicio")\' type="button" class="btn btn-stopstop">Voltar ao Início</button>');
            }
    } else {
        // errouu
        await mudarCena("erro");
        $("#cenas_erro h1").html("Errrrouu");
        $("#cenas_erro p").html("Essa resposta está muito curta.");
        $("#cenas_erro .conteudoAdd").html('<button onclick=\'mudarCena("inicio")\' type="button" class="btn btn-stopstop">Voltar ao Início</button>');
    }
}