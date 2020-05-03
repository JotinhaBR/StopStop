var global = {
    config: {
        versao: "1.0.6",
        precache: true,
        // precache: false,
        front: {
            // host: "https://stopstop.planetsweb.com.br/jogar"
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
            "CEP",
            "Marca",
            "Filme/Série",
            "Meu namorado é"
        )
    }
}