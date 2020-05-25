var global = {
    config: {
        cacheForceClear: false,
        front: {
            // host: "https://www.stopstop.planetsgames.com.br/jogar"
            host: "http://localhost:5500/jogar"
        },
    },
    jogo: {
        intervalLetrasRandom: null,
        letraAtualDoJogo: "A",
        nPerguntaAtual: 0,
        pontosAtual: 0,
        pontosTotais: 0,
        perguntas: Array(
            "Nome",
            "Cor",
            "Fruta",
            "Animal",
            "Comida",
            "Objeto",
            "Nome de lugares",
            "Marca",
            "Filme/Série",
            "Meu namorado(a) é"
        )
    }
}