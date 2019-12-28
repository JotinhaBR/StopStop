mudarCena('inicio').then(()=>{
    $("#cenas_inicio .versao").html("V "+global.config.versao);
});


async function clickJogar() {
    global.jogo.letraAtualDoJogo = letraRandom();
    await mudarCena('letrasRandom');

    setTimeout(async () => {
        clearInterval(global.jogo.intervalLetrasRandom);
        $("#randomLetras").html(global.jogo.letraAtualDoJogo);
        $("#randomLetras").addClass("letraAtual");
        setTimeout(async () => {
            await mudarCena('perguntas');
            $("#cenas_perguntas .pergunta").html("Nome");
            $("#letraAtual").html(global.jogo.letraAtualDoJogo);
        }, 1000);
    }, 3000);
}
