
async function submitFormPerguntas(shelf) {
    event.preventDefault();
    var formId = $(shelf).attr("id");
    var formData = getFormObj("#"+formId);
    var respostaPrimeraLetra = formData.resposta.substring(0,1);

    if (formData.resposta.length >= 2) {
        if (respostaPrimeraLetra.toUpperCase() === letraAtualDoJogo.toUpperCase()) {
            // acertou

        } else {
            // errou
            await modalAtivar("erro");
            $("#modal_erro h1").html("Errrrouu");
            $("#modal_erro p").html("Parece que essa resposta não começa com a letra "+letraAtualDoJogo+".");
        }
    }else{
        // errouu
        await modalAtivar("erro");
        $("#modal_erro h1").html("Errrrouu");
        $("#modal_erro p").html("Essa resposta está muito curta.");
    }

    console.log("#"+formId, formData);
}