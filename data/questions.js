const questions = [
  {
    id: 'vtd-001',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo na frase:',
    sentence: 'Comprei o livro ontem.',
    highlight: 'Comprei',
    options: ['VTD', 'VTI', 'VTDI', 'VI', 'VL'],
    correct: 'VTD',
    explanation: 'O verbo "comprar" é transitivo direto porque quem compra, compra algo. "O livro" é o objeto direto (sem preposição).',
    distractorExplanations: {
      VTI: 'VTI exige preposição obrigatória, o que não ocorre com "o livro".',
      VI: 'Verbos intransitivos não possuem complemento, mas "comprar" exige um objeto.',
      VL: 'Verbos de ligação indicam estado, não uma ação sobre um objeto.'
    }
  },
  {
    id: 'vti-001',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo na frase:',
    sentence: 'Nós gostamos de chocolate.',
    highlight: 'gostamos',
    options: ['VTD', 'VTI', 'VTDI', 'VI', 'VL'],
    correct: 'VTI',
    explanation: 'O verbo "gostar" é transitivo indireto porque quem gosta, gosta de algo/alguém. "De chocolate" é o objeto indireto iniciado pela preposição "de".',
    distractorExplanations: {
      VTD: 'VTD não aceita preposição entre o verbo e o objeto. Aqui temos a preposição "de".',
      VI: 'O verbo exige um complemento para fazer sentido total na frase.',
      VL: 'Gostar indica um sentimento/ação, não um estado ou característica permanente.'
    }
  },
  {
    id: 'vtdi-001',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo na frase:',
    sentence: 'Entregamos o prêmio ao vencedor.',
    highlight: 'Entregamos',
    options: ['VTD', 'VTI', 'VTDI', 'VI', 'VL'],
    correct: 'VTDI',
    explanation: 'Quem entrega, entrega algo (o prêmio - OD) a alguém (ao vencedor - OI). O verbo possui dois complementos.',
    distractorExplanations: {
      VTD: 'O verbo possui um objeto indireto ("ao vencedor") além do direto.',
      VTI: 'O verbo possui um objeto direto ("o prêmio") além do indireto.'
    }
  },
  {
    id: 'vi-001',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo na frase:',
    sentence: 'O bebê dormiu cedo.',
    highlight: 'dormiu',
    options: ['VTD', 'VTI', 'VTDI', 'VI', 'VL'],
    correct: 'VI',
    explanation: 'O verbo "dormir" tem sentido completo. "Cedo" é apenas um adjunto adverbial de tempo, não um complemento obrigatório.',
    distractorExplanations: {
      VTD: 'Não há um objeto direto recebendo a ação.',
      VL: 'Dormir indica uma ação/estado fisiológico, não funciona como ponte para um predicativo.'
    }
  },
  {
    id: 'vl-001',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo na frase:',
    sentence: 'A professora parece cansada.',
    highlight: 'parece',
    options: ['VTD', 'VTI', 'VTDI', 'VI', 'VL'],
    correct: 'VL',
    explanation: 'O verbo "parecer" liga o sujeito "A professora" a uma característica "cansada" (predicativo do sujeito).',
    distractorExplanations: {
      VI: 'Verbos de ligação não indicam ação completa por si só.',
      VTD: 'Não há um objeto direto, mas sim uma característica do sujeito.'
    }
  },
  {
    id: 'obj-001',
    type: 'multiple-choice',
    prompt: 'Qual é o complemento do verbo na frase abaixo?',
    sentence: 'O aluno resolveu o exercício.',
    highlight: 'resolveu',
    options: ['Objeto Direto', 'Objeto Indireto', 'Predicativo do Sujeito', 'Adjunto Adverbial'],
    correct: 'Objeto Direto',
    explanation: '"O exercício" completa o sentido do verbo "resolver" sem auxílio de preposição.',
    distractorExplanations: {
      'Objeto Indireto': 'Não há preposição ligando o verbo ao complemento.',
      'Predicativo do Sujeito': 'O termo não indica uma qualidade do sujeito, mas o alvo da ação.'
    }
  },
  {
    id: 'vti-002',
    type: 'multiple-choice',
    prompt: 'Identifique a regência correta do verbo "assistir" no sentido de ver:',
    sentence: 'Assistimos ____ filme premiado.',
    options: ['o', 'ao', 'no', 'pelo'],
    correct: 'ao',
    explanation: 'No sentido de presenciar/ver, o verbo "assistir" é transitivo indireto e exige a preposição "a".',
    distractorExplanations: {
      'o': 'O uso sem preposição para "assistir" (ver) é considerado erro pela gramática normativa.',
      'no': 'A preposição correta exigida pela regência é "a".'
    }
  },
  {
    id: 'vf-001',
    type: 'multiple-choice',
    prompt: 'Julgue a afirmação: O verbo "chegar" em "João chegou tarde" é Transitivo Direto.',
    options: ['Verdadeiro', 'Falso'],
    correct: 'Falso',
    explanation: '"Chegar" é um verbo intransitivo. "Tarde" é um adjunto adverbial de tempo, não um objeto direto.',
    distractorExplanations: {
      'Verdadeiro': 'Lembre-se: advérbios de tempo/lugar não são objetos diretos.'
    }
  },
  {
    id: 'vtdi-002',
    type: 'multiple-choice',
    prompt: 'Identifique os objetos na frase: "O pai deu um presente ao filho."',
    options: [
      'OD: presente / OI: ao filho',
      'OD: ao filho / OI: presente',
      'Ambos são OD',
      'Ambos são OI'
    ],
    correct: 'OD: presente / OI: ao filho',
    explanation: '"Um presente" não tem preposição (OD), "ao filho" tem a preposição "a" (OI).',
    distractorExplanations: {
      'OD: ao filho / OI: presente': 'Inverteu a classificação; objetos indiretos possuem preposição.'
    }
  },
  {
    id: 'vl-002',
    type: 'multiple-choice',
    prompt: 'Na frase "Os alunos estão quietos", o verbo "estão" é:',
    options: ['VI', 'VL', 'VTD', 'VTI'],
    correct: 'VL',
    explanation: '"Estar" indica um estado passageiro e liga o sujeito ao predicativo "quietos".',
    distractorExplanations: {
      'VI': 'Nesta frase, ele funciona como ligação para o estado do sujeito.',
      'VTD': 'Não há uma ação sendo exercida sobre um objeto.'
    }
  },
  {
    id: 'vtd-002',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo: "Ele aspirou o aroma das flores."',
    options: ['VTD', 'VTI', 'VI', 'VL'],
    correct: 'VTD',
    explanation: 'No sentido de sorver/cheirar, "aspirar" é VTD.',
    distractorExplanations: {
      'VTI': '"Aspirar" só é VTI no sentido de pretender/desejar algo.'
    }
  },
  {
    id: 'vti-003',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo: "Ele aspira a um cargo de chefia."',
    options: ['VTD', 'VTI', 'VI', 'VL'],
    correct: 'VTI',
    explanation: 'No sentido de pretender/desejar, "aspirar" exige a preposição "a".',
    distractorExplanations: {
      'VTD': 'O sentido aqui é de desejo, exigindo obrigatoriamente a preposição.'
    }
  },
  {
    id: 'vtdi-003',
    type: 'multiple-choice',
    prompt: 'Identifique o VTDI:',
    options: [
      'Ela contou a história para as crianças.',
      'Ela contou a história.',
      'Ela contou com a sorte.',
      'Ela contou dez moedas.'
    ],
    correct: 'Ela contou a história para as crianças.',
    explanation: 'Contou algo (história) para alguém (crianças).',
    distractorExplanations: {
      'Ela contou a história.': 'Aqui é apenas VTD.',
      'Ela contou com a sorte.': 'Aqui é VTI.',
      'Ela contou dez moedas.': 'Aqui é VTD.'
    }
  },
  {
    id: 'vi-002',
    type: 'multiple-choice',
    prompt: 'Marque a frase com Verbo Intransitivo:',
    options: [
      'As flores murcharam.',
      'As flores precisam de água.',
      'As flores são lindas.',
      'As flores perfumam o ambiente.'
    ],
    correct: 'As flores murcharam.',
    explanation: '"Murchar" tem sentido completo; não exige complemento.',
    distractorExplanations: {
      'As flores precisam de água.': 'VTI (precisam de).',
      'As flores são lindas.': 'VL (são).',
      'As flores perfumam o ambiente.': 'VTD (perfumam o quê?).'
    }
  },
  {
    id: 'vl-003',
    type: 'multiple-choice',
    prompt: 'Qual verbo de ligação indica estado permanente?',
    options: ['Estar', 'Ficar', 'Ser', 'Parecer'],
    correct: 'Ser',
    explanation: '"Ser" geralmente indica uma característica intrínseca ou permanente.',
    distractorExplanations: {
      'Estar': 'Indica estado passageiro.',
      'Ficar': 'Indica mudança de estado.'
    }
  },
  {
    id: 'obj-002',
    type: 'multiple-choice',
    prompt: 'Qual o objeto indireto em: "Obedeça aos seus pais"?',
    options: ['Obedeça', 'aos seus pais', 'seus pais', 'não há'],
    correct: 'aos seus pais',
    explanation: '"Aos seus pais" é o complemento regido pela preposição "a" exigida pelo verbo "obedecer".',
    distractorExplanations: {
      'seus pais': 'Falta a preposição que caracteriza o Objeto Indireto.'
    }
  },
  {
    id: 'vtd-003',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo: "O artista pintou um quadro."',
    options: ['VTD', 'VTI', 'VTDI', 'VI'],
    correct: 'VTD',
    explanation: 'Pintou algo (um quadro). Sem preposição.',
    distractorExplanations: {
      'VTI': 'Não há preposição ligando o verbo ao objeto.'
    }
  },
  {
    id: 'vti-004',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo: "Eu concordo com você."',
    options: ['VTD', 'VTI', 'VTDI', 'VI'],
    correct: 'VTI',
    explanation: 'Concordar exige a preposição "com".',
    distractorExplanations: {
      'VTD': 'O uso da preposição "com" torna o objeto indireto.'
    }
  },
  {
    id: 'vtdi-004',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo: "Paguei a conta ao garçom."',
    options: ['VTD', 'VTI', 'VTDI', 'VI'],
    correct: 'VTDI',
    explanation: 'Pagou algo (a conta - OD) a alguém (ao garçom - OI).',
    distractorExplanations: {
      'VTD': 'Ignora o complemento indireto "ao garçom".',
      'VTI': 'Ignora o complemento direto "a conta".'
    }
  },
  {
    id: 'vi-003',
    type: 'multiple-choice',
    prompt: 'Na frase "Choveu muito ontem", o verbo é:',
    options: ['VTD', 'VTI', 'VI', 'VL'],
    correct: 'VI',
    explanation: 'Fenômenos da natureza são tipicamente verbos intransitivos.',
    distractorExplanations: {
      'VTD': 'Não há objeto sofrendo a ação de chover.'
    }
  },
  {
    id: 'vl-004',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo: "O tempo continua nublado."',
    options: ['VTD', 'VTI', 'VI', 'VL'],
    correct: 'VL',
    explanation: 'Indica a continuidade de um estado do sujeito.',
    distractorExplanations: {
      'VI': 'Nublado é um predicativo, não um advérbio.'
    }
  },
  {
    id: 'obj-003',
    type: 'multiple-choice',
    prompt: 'Identifique o predicativo do sujeito em: "A viagem foi cansativa."',
    options: ['A viagem', 'foi', 'cansativa', 'não há'],
    correct: 'cansativa',
    explanation: '"Cansativa" é a característica atribuída ao sujeito através do verbo de ligação.',
    distractorExplanations: {
      'A viagem': 'Este é o sujeito da frase.'
    }
  },
  {
    id: 'vf-002',
    type: 'multiple-choice',
    prompt: 'VTD exige preposição?',
    options: ['Sim', 'Não'],
    correct: 'Não',
    explanation: 'Transitivo Direto se liga ao objeto sem preposição obrigatória.',
    distractorExplanations: {
      'Sim': 'Verbos que exigem preposição são os Transitivos Indiretos.'
    }
  },
  {
    id: 'vtd-004',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo: "Os alunos leram o texto."',
    options: ['VTD', 'VTI', 'VI', 'VL'],
    correct: 'VTD',
    explanation: 'Leram algo (o texto). Direto.',
    distractorExplanations: {
      'VTI': 'Não há preposição.'
    }
  },
  {
    id: 'vti-005',
    type: 'multiple-choice',
    prompt: 'Classifique o verbo: "Ela não respondeu ao e-mail."',
    options: ['VTD', 'VTI', 'VTDI', 'VI'],
    correct: 'VTI',
    explanation: 'Responder no sentido de dar resposta a algo exige a preposição "a".',
    distractorExplanations: {
      'VTD': 'O uso correto exige a preposição "ao" (a + o).'
    }
  }
];

module.exports = questions;
