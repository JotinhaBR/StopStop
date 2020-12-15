var global = {
    config: {
        nIntervaloVitoriasModalAvaliar: 5,
        tempoDeRespostaPergunta: 30,
        cacheForceClear: false,
        front: {
            host: "https://www.stopstop.planetsgames.com.br/jogar"
            // host: "http://localhost:5500/jogar"
        },
    },
    jogo: {
        intervalLetrasRandom: null,
        letraAtualDoJogo: "A",
        nPerguntaAtual: 0,
        progressBar: null,
        progressBarStop: false,
        pontosAtual: 0,
        pontosTotais: localStorage.getItem("pontosTotais") || 0,
        perguntas: Array(
            "Nome",
            "Cor",
            "Fruta",
            "Animal",
            "Comida",
            "Objeto",
            "Profissão",
            "Nome de lugares",
            "Marca",
            "Filme/Série",
            "Meu namorado(a) é",
            "Minha sogra é",
            "Meu sogro é"
        )
    }
}