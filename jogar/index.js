mudarCena('inicio');


async function clickJogar() {
    global.jogo.letraAtualDoJogo = letraRandom();
    await mudarCena('letrasRandom');

    setTimeout(async () => {
        clearInterval(global.jogo.intervalLetrasRandom);
        $("#randomLetras").html(global.jogo.letraAtualDoJogo);
        $("#randomLetras").addClass("letraAtual");
        setTimeout(async () => {
            await mudarCena('perguntas');
            global.jogo.nPerguntaAtual = 0;
            global.jogo.perguntas = embaralhadorDeArray(global.jogo.perguntas);
            $("#cenas_perguntas .pergunta").html(global.jogo.perguntas[0]);
            $("#letraAtual").html(global.jogo.letraAtualDoJogo);
        }, 1000);
    }, 2000);
}

async function mudarDificuldadeDoJogo() {
    // Acionar dificuldade já selecionada.
    setTimeout(()=>{
        $( ".dificuldade-jogo-selecao" ).val(global.config.tempoDeRespostaPergunta);
    }, 100);

    // Verificar mudanças no campo de dificuldade.
    $( ".dificuldade-jogo-selecao" ).change(function() {
        var dificuldade = $(this).val();
        global.config.tempoDeRespostaPergunta = dificuldade;
      });
}
