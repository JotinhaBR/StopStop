var letraAtualDoJogo = "A";
var intervalLetrasRandom;

modalAtivar("carregando").then(() => {
    getHTML(config.front.host+'/cenas/inicio.html').then((res) => {
        modalDesAtivar("carregando").then(()=>{
            $("body").html(res);
        })
    });
});




async function clickJogar() {
    await modalAtivar("carregando");
    letraAtualDoJogo = letraRandom();
    
    var res = await getHTML(config.front.host+'/cenas/letrasRandom.html');
    await modalDesAtivar("carregando");
    $("body").html(res);

    setTimeout(async () => {
        clearInterval(intervalLetrasRandom);
        $("#randomLetras").html(letraAtualDoJogo);
        $("#randomLetras").addClass("letraAtual");
        setTimeout(async () => {
            var res = await getHTML(config.front.host+'/cenas/perguntas.html');
            $("body").html(res);
            $("#cenas_perguntas .pergunta").html("Nome");
            $("#letraAtual").html(letraAtualDoJogo);
        }, 1000);
    }, 3000);
}
