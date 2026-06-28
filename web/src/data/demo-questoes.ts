import type { NovaQuestao } from "../db/schema";

/**
 * Questões de DEMONSTRAÇÃO — conteúdo ORIGINAL, escrito para este projeto, no
 * estilo da banca (não são provas reais e não infringem direitos autorais).
 *
 * Servem para que qualquer pessoa que clone o repositório possa rodar uma
 * versão funcional do app (`npm run db:seed:demo`) sem precisar das provas
 * reais (que ficam fora do versionamento — ver .gitignore).
 *
 * fonte: "DEMO" — isolada das provas reais; o seed normal NÃO usa este arquivo.
 */
export const demoQuestoes: NovaQuestao[] = [
  {
    materia: "portugues",
    assunto: "Interpretação de texto",
    dificuldade: "facil",
    fonte: "DEMO",
    textoApoio:
      "A pressa virou sintoma do nosso tempo: queremos tudo agora, e a espera passou a parecer um defeito. Mas há aprendizados que só amadurecem devagar.",
    enunciado: "Depreende-se do texto que o autor",
    alternativas: [
      { id: "A", texto: "defende que a tecnologia tornou a espera desnecessária." },
      { id: "B", texto: "critica a impaciência como traço da sociedade contemporânea." },
      { id: "C", texto: "afirma que todo aprendizado é necessariamente lento." },
      { id: "D", texto: "considera a pressa uma qualidade a ser estimulada." },
      { id: "E", texto: "nega que o tempo influencie o amadurecimento." },
    ],
    gabarito: "B",
    explicacao:
      "O texto trata a pressa como 'sintoma' (algo negativo) e valoriza o que 'amadurece devagar', criticando a impaciência. As demais alternativas extrapolam ou contrariam o texto.",
  },
  {
    materia: "portugues",
    assunto: "Funções da linguagem",
    dificuldade: "media",
    fonte: "DEMO",
    textoApoio: "Campanha de saúde: “Cuide-se: vacine-se hoje!”",
    enunciado: "Na frase da campanha, predomina a função da linguagem",
    alternativas: [
      { id: "A", texto: "referencial, centrada na informação objetiva." },
      { id: "B", texto: "poética, centrada na forma da mensagem." },
      { id: "C", texto: "fática, centrada no canal de comunicação." },
      { id: "D", texto: "conativa (apelativa), centrada no receptor." },
      { id: "E", texto: "metalinguística, centrada no próprio código." },
    ],
    gabarito: "D",
    explicacao:
      "Os verbos no imperativo ('cuide-se', 'vacine-se') e o objetivo de convencer o leitor caracterizam a função conativa, típica da publicidade.",
  },
  {
    materia: "ingles",
    assunto: "Reading comprehension",
    dificuldade: "facil",
    fonte: "DEMO",
    textoApoio:
      "Reading every day, even for a few minutes, improves vocabulary and concentration over time.",
    enunciado: "According to the text, daily reading",
    alternativas: [
      { id: "A", texto: "is only useful for children." },
      { id: "B", texto: "gradually improves vocabulary and concentration." },
      { id: "C", texto: "must last several hours to have any effect." },
      { id: "D", texto: "replaces the need for studying other subjects." },
      { id: "E", texto: "has no effect on attention." },
    ],
    gabarito: "B",
    explicacao:
      "The text says reading 'even for a few minutes' improves vocabulary and concentration 'over time' — i.e., gradually.",
  },
  {
    materia: "historia",
    assunto: "Guerra Fria",
    dificuldade: "media",
    fonte: "DEMO",
    textoApoio: null,
    enunciado: "A Guerra Fria (1947–1991) caracterizou-se principalmente por",
    alternativas: [
      { id: "A", texto: "confronto militar direto e contínuo entre EUA e URSS." },
      { id: "B", texto: "uma aliança entre capitalismo e socialismo contra um inimigo comum." },
      { id: "C", texto: "disputa ideológica e geopolítica, sem conflito armado direto entre as superpotências." },
      { id: "D", texto: "ausência de corrida armamentista e tecnológica." },
      { id: "E", texto: "um mundo unipolar liderado pela URSS." },
    ],
    gabarito: "C",
    explicacao:
      "A Guerra Fria foi uma disputa ideológica/geopolítica entre EUA e URSS marcada por corrida armamentista e conflitos periféricos, mas sem guerra direta entre as superpotências.",
  },
  {
    materia: "geografia",
    assunto: "Biomas brasileiros",
    dificuldade: "facil",
    fonte: "DEMO",
    textoApoio: null,
    enunciado:
      "Assinale o bioma brasileiro de clima semiárido, vegetação xerófila e exclusivo do território nacional.",
    alternativas: [
      { id: "A", texto: "Amazônia" },
      { id: "B", texto: "Cerrado" },
      { id: "C", texto: "Mata Atlântica" },
      { id: "D", texto: "Caatinga" },
      { id: "E", texto: "Pampa" },
    ],
    gabarito: "D",
    explicacao:
      "A Caatinga é o único bioma exclusivamente brasileiro, típico do semiárido nordestino, com vegetação xerófila adaptada à seca.",
  },
  {
    materia: "matematica",
    assunto: "Porcentagem",
    dificuldade: "facil",
    fonte: "DEMO",
    textoApoio: "Um produto que custava R$ 80,00 teve um desconto de 15%.",
    enunciado: "O novo preço do produto, após o desconto, é",
    alternativas: [
      { id: "A", texto: "R$ 65,00" },
      { id: "B", texto: "R$ 68,00" },
      { id: "C", texto: "R$ 72,00" },
      { id: "D", texto: "R$ 12,00" },
      { id: "E", texto: "R$ 95,00" },
    ],
    gabarito: "B",
    explicacao: "Desconto de 15% → paga-se 85%: 80 × 0,85 = R$ 68,00.",
  },
  {
    materia: "biologia",
    assunto: "Genética (1ª lei de Mendel)",
    dificuldade: "media",
    fonte: "DEMO",
    textoApoio:
      "Em ervilhas, o alelo para semente amarela (V) domina o alelo para semente verde (v).",
    enunciado:
      "Do cruzamento entre dois indivíduos heterozigotos (Vv), a proporção fenotípica esperada na prole é",
    alternativas: [
      { id: "A", texto: "1 amarela : 1 verde" },
      { id: "B", texto: "100% amarelas" },
      { id: "C", texto: "3 amarelas : 1 verde" },
      { id: "D", texto: "100% verdes" },
      { id: "E", texto: "2 amarelas : 1 verde" },
    ],
    gabarito: "C",
    explicacao:
      "Vv × Vv → 1 VV : 2 Vv : 1 vv. Como V domina, 3 são amarelas e 1 é verde (proporção 3:1).",
  },
  {
    materia: "fisica",
    assunto: "Eletrodinâmica (Lei de Ohm)",
    dificuldade: "facil",
    fonte: "DEMO",
    textoApoio: "Um resistor de 10 Ω é percorrido por uma corrente de 2 A.",
    enunciado: "A diferença de potencial (ddp) nos terminais do resistor é",
    alternativas: [
      { id: "A", texto: "5 V" },
      { id: "B", texto: "12 V" },
      { id: "C", texto: "20 V" },
      { id: "D", texto: "0,2 V" },
      { id: "E", texto: "8 V" },
    ],
    gabarito: "C",
    explicacao: "Pela Lei de Ohm, U = R · I = 10 × 2 = 20 V.",
  },
  {
    materia: "quimica",
    assunto: "Físico-química (pH)",
    dificuldade: "facil",
    fonte: "DEMO",
    textoApoio: null,
    enunciado: "Uma solução aquosa com pH = 3, a 25 °C, é classificada como",
    alternativas: [
      { id: "A", texto: "básica" },
      { id: "B", texto: "neutra" },
      { id: "C", texto: "ácida" },
      { id: "D", texto: "salina" },
      { id: "E", texto: "anfótera" },
    ],
    gabarito: "C",
    explicacao: "Na escala de pH (0–14), valores abaixo de 7 indicam solução ácida.",
  },
  {
    materia: "biologia",
    assunto: "Ecologia (níveis tróficos)",
    dificuldade: "media",
    fonte: "DEMO",
    textoApoio: "Considere a cadeia alimentar: capim → gafanhoto → sapo → cobra.",
    enunciado: "Nessa cadeia, o sapo ocupa o nível de",
    alternativas: [
      { id: "A", texto: "produtor" },
      { id: "B", texto: "consumidor primário" },
      { id: "C", texto: "consumidor secundário" },
      { id: "D", texto: "decompositor" },
      { id: "E", texto: "consumidor quaternário" },
    ],
    gabarito: "C",
    explicacao:
      "Capim é produtor; o gafanhoto (herbívoro) é consumidor primário; o sapo, que come o gafanhoto, é consumidor secundário.",
  },
];
