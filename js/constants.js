// Constantes do jogo Mahalilah
const GAME_CONSTANTS = {
    // Dimensões do tabuleiro
    BOARD_WIDTH: 800,
    BOARD_HEIGHT: 720,
    
    // Número de casas e planos
    TOTAL_HOUSES: 72,
    HOUSES_PER_ROW: 9,
    TOTAL_ROWS: 8,
    
    // Posições especiais
    START_POSITION: 68, // Consciência Plena
    FIRST_HOUSE: 1,     // Gênesis
    
    // Cores dos planos
    COLORS: {
        PLANO_BASICO: [248, 211, 207],        // #F8D3CF
        PLANO_IMAGINARIO: [248, 194, 145],    // #F8C291
        PLANO_RACIONAL: [246, 229, 141],      // #F6E58D
        PLANO_EQUILIBRIO: [186, 220, 88],     // #BADC58
        PLANO_ABERTURA: [126, 214, 223],      // #7ED6DF
        PLANO_TRANSFORMACAO: [104, 109, 224], // #686DE0
        PLANO_CONEXAO: [214, 162, 232],       // #D6A2E8
        PLANO_DIVINO: [255, 255, 255]         // #FFFFFF
    },
    
    // Mapeamento das espadas (subidas)
    SWORDS: {
        6: 17,   // Confusão -> Perdão
        11: 27,  // Diversão -> Esperança
        22: 37,  // Autoconfiança -> Fogo Interior
        36: 54,  // Concentração -> Transparência
        45: 63,  // Disciplina -> Orgulho/Vaidade
        58: 69   // Meditação -> Sincronicidade
    },
    
    // Mapeamento das serpentes (descidas)
    SNAKES: {
        16: 4,   // Ciúmes -> Cobiça
        29: 6,   // Aromas da Vida -> Confusão
        43: 31,  // Energia Solar -> Reflexão
        55: 3,   // Amor Impessoal -> Cólera
        63: 2,   // Orgulho/Vaidade -> Ilusão
        72: 51   // Transformação -> Ecologia
    },
    
    // Estados do jogo
    GAME_STATES: {
        NOT_STARTED: 'not_started',
        WAITING_FOR_FIRST_SIX: 'waiting_for_first_six',
        PLAYING: 'playing',
        MOVING: 'moving',
        SHOWING_MEANING: 'showing_meaning',
        COMPLETED: 'completed'
    },
    
    // Nomes das casas
    HOUSE_NAMES: {
        1: "Gênesis",
        2: "Ilusão",
        3: "Cólera",
        4: "Cobiça",
        5: "Plano Físico",
        6: "Confusão",
        7: "Presunção",
        8: "Avidez",
        9: "Ego",
        10: "Sensualidade",
        11: "Diversão",
        12: "Apego",
        13: "Inveja",
        14: "Poder da Mente",
        15: "Luxúria",
        16: "Ciúmes",
        17: "Perdão",
        18: "Desapego",
        19: "Ação e Reação",
        20: "Compartilhar",
        21: "Perseverança",
        22: "Autoconfiança",
        23: "Falsidade",
        24: "Amizade",
        25: "Concentração",
        26: "Dispersão",
        27: "Esperança",
        28: "Saúde",
        29: "Aromas da Vida",
        30: "Alimentação",
        31: "Reflexão",
        32: "Discernimento",
        33: "Respiração Consciente",
        34: "Excreção Consciente",
        35: "Circulação Vital",
        36: "Missão de Vida",
        37: "Fogo Interior",
        38: "Renascimento",
        39: "Sedução",
        40: "Sabedoria",
        41: "Humildade",
        42: "Silêncio Interior",
        43: "Energia Solar",
        44: "Energia Lunar",
        45: "Disciplina",
        46: "Ecologia",
        47: "Intuição",
        48: "Som Sagrado",
        49: "Meditação",
        50: "Otimismo",
        51: "Pessimismo",
        52: "Prosperidade",
        53: "Orgulho/Vaidade",
        54: "Transparência",
        55: "Amor Impessoal",
        56: "Consciência Plena",
        57: "Sincronicidade",
        58: "Essência da Verdade",
        59: "Verdade em Ação",
        60: "Transformação",
        61: "Gênesis",
        62: "Ilusão",
        63: "Cólera",
        64: "Cobiça",
        65: "Plano Físico",
        66: "Confusão",
        67: "Presunção",
        68: "Consciência Plena",
        69: "Sincronicidade",
        70: "Essência da Verdade",
        71: "Verdade em Ação",
        72: "Transformação"
    },
    
    // Significados das casas (simplificados para algumas casas principais)
    HOUSE_MEANINGS: {
        1: "É a concepção de um jogo, aqui só se passa uma vez, é o primeiro passo. O elemento inicial atribuído é ÁGUA. Considerando que a vida física nasceu na água, atribuímos a este elemento o símbolo da Gênesis.",
        2: "Simboliza a criação do intelecto humano, a construção da personalidade que irá atuar no caminho, como sendo a forma ilusória que representará a realidade.",
        3: "É a criação do caráter humano, como resultado dos desejos da personalidade, aqui nasce o instinto/vontade que impulsiona o jogo.",
        4: "É a criação da estrutura humana, o corpo como realidade temporária para uma alma habitar. Devido a esta limitação estrutural nos apegamos ao corpo e ao mundo material.",
        5: "Aqui é a conclusão da formação inicial de um corpo, com seus 5 sentidos de percepção (visão, audição, olfato, paladar e tato) e seus 5 órgãos de ação.",
        6: "Aqui começa um jogo, é o nascimento de um caminho, a confusão que levará o jogador a buscar esclarecimento e realizações.",
        17: "O perdão é a capacidade de compreender que todos estamos em processo de evolução e que os erros fazem parte deste processo.",
        27: "A esperança é a força que nos impulsiona a continuar, mesmo diante das dificuldades. É a confiança de que tudo tem um propósito maior.",
        37: "O fogo interior representa nossa força vital, nossa energia criativa e nossa capacidade de transformação.",
        54: "A transparência é a qualidade de ser autêntico, verdadeiro e honesto em todas as situações. É a ausência de máscaras e disfarces.",
        63: "O orgulho/vaidade representa o ego inflado, a sensação de superioridade e a necessidade de reconhecimento externo.",
        68: "A casa 68 é a Consciência Plena. É nela que o jogo se inicia e termina sempre. Partimos do princípio de que viemos do Plano Divino e a Ele retornaremos.",
        72: "A Transformação é o processo contínuo de mudança e evolução. É a capacidade de transcender limitações e alcançar novos níveis de consciência."
    },
    
    // Significados dos números do dado
    DICE_MEANINGS: [
        "", // índice 0 não usado
        "NÃO - Você ainda não está preparado, jogue outra vez, peça mentalmente para entrar.",
        "Você está muito mental ou pensando muito.",
        "Você está nervoso ou apressado.",
        "Você está preocupado com coisas materiais. Está muito formal diante do jogo.",
        "Você precisa silenciar um pouco os seus desejos e ouvir seu íntimo que te pede convicção, fé.",
        "SIM - Você pode começar seu caminho pelo Mahalilah."
    ]
};
