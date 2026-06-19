const gabarito = {
  exercicio1: {
    titulo: 'Exercício 1 — Classificação dos verbos e complementos',
    instrucao: 'Classifique os verbos (VTD, VTI, VTDI, VI ou VL) e os complementos.',
    itens: [
      { item: 1, frase: 'Comprei o livro ontem à tarde.', classificacao: 'VTD', complementos: 'OD: o livro' },
      { item: 2, frase: 'Entreguei o dinheiro à funcionária.', classificacao: 'VTDI', complementos: 'OD: o dinheiro; OI: à funcionária' },
      { item: 3, frase: 'Meu irmão gosta de frutos do mar.', classificacao: 'VTI', complementos: 'OI: de frutos do mar' },
      { item: 4, frase: 'Nós saímos mais cedo.', classificacao: 'VI', complementos: 'Nenhum (sentido completo)' },
      { item: 5, frase: 'Depois de tudo, virou um santo na cidade.', classificacao: 'VL', complementos: 'Predicativo do Sujeito: um santo' },
      { item: 6, frase: 'Praticamos esporte na mesma academia.', classificacao: 'VTD', complementos: 'OD: esporte' },
      { item: 7, frase: 'Mandei o e-mail para você ontem.', classificacao: 'VTDI', complementos: 'OD: o e-mail; OI: para você' },
      { item: 8, frase: 'Eu continuo atento ao trabalho.', classificacao: 'VL', complementos: 'Predicativo do Sujeito: atento' },
      { item: 9, frase: 'Ele dormiu muito essa noite.', classificacao: 'VI', complementos: 'Nenhum (sentido completo)' },
      { item: 10, frase: 'Não devemos depender de nossos pais.', classificacao: 'VTI', complementos: 'OI: de nossos pais' }
    ]
  },
  exercicio2: {
    titulo: 'Exercício 2 — Objetos e predicativos',
    instrucao: 'Grife e classifique os objetos e os predicativos.',
    itens: [
      { item: 1, frase: 'Doou roupa aos pobres.', resposta: 'OD: roupa; OI: aos pobres' },
      { item: 2, frase: 'Ao motorista do Uber pagou a corrida.', resposta: 'OD: a corrida' },
      { item: 3, frase: 'Eles conversaram sobre a festa animados.', resposta: 'Predicativo do Sujeito: animados' },
      { item: 4, frase: 'Concedeu a oportunidade a quem tinha confiança.', resposta: 'OD: a oportunidade; OI: a quem tinha confiança' },
      { item: 5, frase: 'Acho as suas aulas fantásticas.', resposta: 'OD: as suas aulas; Predicativo do Objeto: fantásticas' },
      { item: 6, frase: 'Alguém impediu o assaltante de cometer o crime.', resposta: 'OD: o assaltante; Complemento verbal: de cometer o crime' },
      { item: 7, frase: 'Ele não parecia tão triste naquele dia.', resposta: 'Predicativo do Sujeito: triste' },
      { item: 8, frase: 'Ao público expôs seus pensamentos.', resposta: 'OI: Ao público; OD: seus pensamentos' }
    ]
  }
};

module.exports = gabarito;
