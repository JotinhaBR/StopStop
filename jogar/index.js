mudarCena('inicio');


async function clickJogar() {
    global.jogo.letraAtualDoJogo = letraRandom();
    shuffle(global.jogo.perguntas);
    await mudarCena('letrasRandom');

    setTimeout(async () => {
        clearInterval(global.jogo.intervalLetrasRandom);
        $("#randomLetras").html(global.jogo.letraAtualDoJogo);
        $("#randomLetras").addClass("letraAtual");
        setTimeout(async () => {
            await mudarCena('perguntas');
            global.jogo.nPerguntaAtual = 0;
            $("#cenas_perguntas .pergunta").html(global.jogo.perguntas[0]);
            $("#letraAtual").html(global.jogo.letraAtualDoJogo);
        }, 1000);
    }, 2000);
}
