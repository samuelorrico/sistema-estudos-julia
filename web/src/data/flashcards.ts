import type { NovoFlashcard } from "../db/schema";

// Curadoria inicial de conceitos (conteúdo original, não protegido).
// O tutor de IA pode adicionar mais depois (fonte: "IA").
export const flashcardsBase: NovoFlashcard[] = [
  // ---------- Português ----------
  {
    materia: "portugues",
    assunto: "Semântica",
    frente: "Denotação x conotação",
    verso:
      "Denotação é o sentido literal, dicionarizado. Conotação é o sentido figurado, que depende do contexto (metáforas, ironia, duplo sentido).",
  },
  {
    materia: "portugues",
    assunto: "Funções da linguagem",
    frente: "Função referencial x conativa (apelativa)",
    verso:
      "Referencial: foco na informação/realidade, objetiva, 3ª pessoa. Conativa: foco no receptor (imperativo, vocativo, 2ª pessoa) — típica da publicidade.",
  },
  {
    materia: "portugues",
    assunto: "Sintaxe",
    frente: "O que é uma oração subordinada substantiva?",
    verso:
      "Oração que exerce a função de um substantivo (sujeito, objeto…) na principal. Ex.: 'É importante QUE VOCÊ ESTUDE' (subjetiva).",
  },
  {
    materia: "portugues",
    assunto: "Ortografia",
    frente: "Diferença entre 'mas' e 'mais'",
    verso:
      "'Mas' = conjunção adversativa (= porém). 'Mais' = advérbio/pronome de intensidade ou quantidade (oposto de 'menos').",
  },

  // ---------- Inglês ----------
  {
    materia: "ingles",
    assunto: "Verb tenses",
    frente: "Present Perfect: quando usar?",
    verso:
      "Ação passada com efeito/relação no presente ou sem tempo definido: have/has + particípio. Ex.: 'I have studied' (já estudei).",
  },
  {
    materia: "ingles",
    assunto: "Quantifiers",
    frente: "'much' x 'many'",
    verso:
      "'much' para incontáveis (much water); 'many' para contáveis (many books). Comuns em frases negativas e perguntas.",
  },
  {
    materia: "ingles",
    assunto: "Comparatives",
    frente: "Comparativo e superlativo (adjetivos curtos)",
    verso:
      "Comparativo: adj + -er + than (taller than). Superlativo: the + adj + -est (the tallest). Irregular: good → better → best.",
  },

  // ---------- História ----------
  {
    materia: "historia",
    assunto: "Iluminismo",
    frente: "O que foi o Iluminismo?",
    verso:
      "Movimento intelectual do séc. XVIII que valorizava a razão, a ciência e a liberdade, criticando o absolutismo e a Igreja. Inspirou as revoluções liberais.",
  },
  {
    materia: "historia",
    assunto: "Revolução Industrial",
    frente: "Por que a Revolução Industrial começou na Inglaterra?",
    verso:
      "Acúmulo de capital, mão de obra (cercamentos), matérias-primas (carvão/ferro), mercado consumidor e inovações como a máquina a vapor.",
  },
  {
    materia: "historia",
    assunto: "Guerra Fria",
    frente: "O que foi a Guerra Fria?",
    verso:
      "Disputa ideológica (1947–1991) entre EUA (capitalismo) e URSS (socialismo), sem confronto direto: corrida armamentista/espacial e conflitos periféricos.",
  },
  {
    materia: "historia",
    assunto: "Era Vargas",
    frente: "Estado Novo (1937–1945)",
    verso:
      "Ditadura de Getúlio Vargas: centralização do poder, nacionalismo, propaganda (DIP), criação da CLT (leis trabalhistas) e censura.",
  },

  // ---------- Geografia ----------
  {
    materia: "geografia",
    assunto: "Climatologia",
    frente: "Diferença entre tempo e clima",
    verso:
      "Tempo é o estado momentâneo da atmosfera (hoje chove). Clima é o padrão médio ao longo de muitos anos numa região.",
  },
  {
    materia: "geografia",
    assunto: "Geografia urbana",
    frente: "O que são ilhas de calor urbanas?",
    verso:
      "Áreas urbanas mais quentes que o entorno, pela concentração de concreto/asfalto, pouca vegetação e poluição, que retêm calor.",
  },
  {
    materia: "geografia",
    assunto: "Geografia econômica",
    frente: "Divisão Internacional do Trabalho (DIT)",
    verso:
      "Especialização produtiva dos países: centrais (tecnologia/indústria) x periféricos (matérias-primas e mão de obra barata), gerando desigualdade.",
  },
  {
    materia: "geografia",
    assunto: "População",
    frente: "Tipos de migração",
    verso:
      "Êxodo rural (campo→cidade), pendular (diária casa-trabalho), sazonal, e refugiados (de guerra, ambientais).",
  },

  // ---------- Matemática ----------
  {
    materia: "matematica",
    assunto: "Função quadrática",
    frente: "Concavidade e vértice da parábola",
    verso:
      "f(x)=ax²+bx+c. a>0 → concavidade para cima (ponto de mínimo); a<0 → para baixo (máximo). Vértice em x = −b/2a.",
  },
  {
    materia: "matematica",
    assunto: "Geometria",
    frente: "Teorema de Pitágoras",
    verso:
      "Em todo triângulo retângulo: a² = b² + c², em que a é a hipotenusa e b, c são os catetos.",
  },
  {
    materia: "matematica",
    assunto: "Progressões",
    frente: "PA: termo geral e soma",
    verso:
      "Termo geral: aₙ = a₁ + (n−1)·r. Soma dos n primeiros: Sₙ = (a₁ + aₙ)·n / 2. r é a razão (constante somada).",
  },
  {
    materia: "matematica",
    assunto: "Probabilidade",
    frente: "Probabilidade básica",
    verso:
      "P = casos favoráveis / casos possíveis (entre 0 e 1). Eventos independentes: P(A e B) = P(A)·P(B).",
  },

  // ---------- Biologia ----------
  {
    materia: "biologia",
    assunto: "Divisão celular",
    frente: "Mitose x meiose",
    verso:
      "Mitose: 1 divisão → 2 células diploides idênticas (crescimento/reparo). Meiose: 2 divisões → 4 células haploides diferentes (gametas, variabilidade).",
  },
  {
    materia: "biologia",
    assunto: "Metabolismo",
    frente: "O que é fotossíntese?",
    verso:
      "Nos cloroplastos, converte CO₂ + H₂O + luz em glicose + O₂. É a base energética das cadeias alimentares.",
  },
  {
    materia: "biologia",
    assunto: "Genética",
    frente: "Herança ligada ao sexo (ex.: daltonismo)",
    verso:
      "Gene no cromossomo X. Homens (XY) manifestam com um único alelo; mulheres (XX) precisam de dois (ou são portadoras). Mais comum em homens.",
  },
  {
    materia: "biologia",
    assunto: "Ecologia",
    frente: "Fluxo de energia e níveis tróficos",
    verso:
      "Produtores → consumidores (1º, 2º…) → decompositores. A energia disponível cai cerca de 10% a cada nível (pirâmide de energia).",
  },
  {
    materia: "biologia",
    assunto: "Fisiologia",
    frente: "Respiração celular (resumo)",
    verso:
      "Oxidação da glicose: glicólise (citoplasma) → ciclo de Krebs e cadeia respiratória (mitocôndria). Consome O₂, libera CO₂ e gera ATP.",
  },

  // ---------- Física ----------
  {
    materia: "fisica",
    assunto: "Mecânica",
    frente: "As três Leis de Newton",
    verso:
      "1ª (inércia): sem força resultante, mantém o estado. 2ª: F = m·a. 3ª (ação-reação): forças iguais e opostas em corpos diferentes.",
  },
  {
    materia: "fisica",
    assunto: "Hidrostática",
    frente: "Pressão hidrostática",
    verso:
      "P = ρ·g·h (densidade × gravidade × profundidade). Não depende do formato do recipiente e aumenta com a profundidade.",
  },
  {
    materia: "fisica",
    assunto: "Eletrodinâmica",
    frente: "Lei de Ohm",
    verso:
      "U = R·I (tensão = resistência × corrente). Em um condutor ôhmico, a resistência R é constante.",
  },

  // ---------- Química ----------
  {
    materia: "quimica",
    assunto: "Ligações químicas",
    frente: "Ligação iônica x covalente",
    verso:
      "Iônica: transferência de elétrons (metal + ametal), forma íons. Covalente: compartilhamento de elétrons (entre ametais).",
  },
  {
    materia: "quimica",
    assunto: "Físico-química",
    frente: "O que é pH?",
    verso:
      "Mede acidez/basicidade (escala 0–14, logarítmica de [H⁺]). pH < 7 ácido, = 7 neutro, > 7 básico.",
  },
  {
    materia: "quimica",
    assunto: "Reações",
    frente: "Reação de oxirredução",
    verso:
      "Transferência de elétrons: oxidação (perde elétrons, Nox aumenta) e redução (ganha elétrons, Nox diminui) acontecem simultaneamente.",
  },
  {
    materia: "quimica",
    assunto: "Estequiometria",
    frente: "O que é estequiometria?",
    verso:
      "Cálculo das quantidades em uma reação usando mol, massa molar e a proporção dos coeficientes da equação balanceada.",
  },
];
