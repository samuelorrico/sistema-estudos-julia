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

  // ============ Lote 2 — alinhado aos assuntos das provas EBMSP ============

  // ---------- Português ----------
  {
    materia: "portugues",
    assunto: "Figuras de linguagem",
    frente: "Metáfora x metonímia x comparação",
    verso:
      "Metáfora: relação implícita ('seus olhos são o mar'). Comparação: explícita, com conectivo ('olhos como o mar'). Metonímia: troca por proximidade ('ler Machado' = a obra dele).",
  },
  {
    materia: "portugues",
    assunto: "Coesão e referência",
    frente: "Coesão referencial x sequencial",
    verso:
      "Referencial: retoma/antecipa termos (pronomes, sinônimos, elipse). Sequencial: encadeia as ideias com conectivos (mas, porque, portanto), marcando a relação lógica.",
  },
  {
    materia: "portugues",
    assunto: "Funções da linguagem",
    frente: "Função poética, fática e metalinguística",
    verso:
      "Poética: foco na forma da mensagem (literatura, publicidade). Fática: testa/mantém o canal ('alô?', 'né?'). Metalinguística: a linguagem fala dela mesma (dicionário, gramática).",
  },
  {
    materia: "portugues",
    assunto: "Gêneros textuais",
    frente: "Tipo textual x gênero textual",
    verso:
      "Tipo é a estrutura (narração, descrição, dissertação, injunção, exposição). Gênero é o texto em uso social (crônica, charge, e-mail, receita, notícia) e combina vários tipos.",
  },
  {
    materia: "portugues",
    assunto: "Análise linguística",
    frente: "Variação linguística e adequação",
    verso:
      "A língua varia por região, grupo social, época e situação. Não há fala 'errada', e sim mais ou menos adequada ao contexto. Preconceito linguístico é julgar a variedade do outro.",
  },
  {
    materia: "portugues",
    assunto: "Ironia e humor",
    frente: "Como a ironia funciona em tiras e charges?",
    verso:
      "Diz-se o oposto do que se quer dar a entender, gerando crítica/humor. Depende do contexto e de pistas (imagem, exagero, quebra de expectativa) para o leitor inferir o sentido.",
  },

  // ---------- Inglês ----------
  {
    materia: "ingles",
    assunto: "Modal verbs",
    frente: "can / must / should",
    verso:
      "can = habilidade/permissão; must = obrigação forte ou dedução; should = conselho/recomendação. Seguidos de verbo no infinitivo sem 'to' (You should rest).",
  },
  {
    materia: "ingles",
    assunto: "Vocabulary",
    frente: "False friends (cognatos falsos)",
    verso:
      "Palavras parecidas com o português, mas de sentido diferente: 'actually' = na verdade; 'pretend' = fingir; 'push' = empurrar; 'library' = biblioteca.",
  },
  {
    materia: "ingles",
    assunto: "Reading strategies",
    frente: "Skimming x scanning",
    verso:
      "Skimming: leitura rápida para captar a ideia geral. Scanning: busca de uma informação específica (nome, data, número). Úteis para responder à interpretação sem ler tudo.",
  },

  // ---------- História ----------
  {
    materia: "historia",
    assunto: "Estados Modernos",
    frente: "Absolutismo e formação dos Estados Nacionais",
    verso:
      "Centralização do poder no rei (soberania), exército e burocracia próprios, território definido e mercantilismo. Teóricos: Maquiavel, Hobbes, Bossuet ('direito divino').",
  },
  {
    materia: "historia",
    assunto: "Revoluções liberais",
    frente: "Revolução Francesa (1789)",
    verso:
      "Fim do Antigo Regime: 'Liberdade, Igualdade, Fraternidade'. Burguesia contra privilégios da nobreza/clero. Inspirada no Iluminismo; Declaração dos Direitos do Homem.",
  },
  {
    materia: "historia",
    assunto: "Apartheid",
    frente: "O que foi o Apartheid?",
    verso:
      "Regime de segregação racial na África do Sul (1948–1994) que separava brancos e negros por lei. Nelson Mandela liderou a luta e foi o 1º presidente negro do país.",
  },
  {
    materia: "historia",
    assunto: "Brasil República",
    frente: "Cidadania e voto no Brasil",
    verso:
      "Voto censitário (renda) no Império → exclusão de mulheres/analfabetos. Voto feminino em 1932; secreto na mesma época; analfabetos só em 1985. Hoje: universal, secreto e obrigatório (16–70).",
  },

  // ---------- Geografia ----------
  {
    materia: "geografia",
    assunto: "Biomas",
    frente: "Principais biomas brasileiros",
    verso:
      "Amazônia (floresta equatorial), Cerrado (savana, 'berço das águas'), Caatinga (semiárido, única exclusiva do Brasil), Mata Atlântica (muito devastada), Pampa e Pantanal.",
  },
  {
    materia: "geografia",
    assunto: "Geografia econômica",
    frente: "Blocos econômicos (Mercosul, UE)",
    verso:
      "Acordos para facilitar o comércio. Etapas: zona de livre comércio → união aduaneira (Mercosul) → mercado comum → união econômica e monetária (UE, com euro).",
  },
  {
    materia: "geografia",
    assunto: "Energia",
    frente: "Fontes renováveis x não renováveis",
    verso:
      "Renováveis: hidrelétrica, solar, eólica, biomassa (repõem-se). Não renováveis: petróleo, carvão, gás, urânio (esgotáveis e, os fósseis, poluentes). Brasil tem matriz elétrica muito renovável.",
  },
  {
    materia: "geografia",
    assunto: "População",
    frente: "Refugiados x migrantes econômicos",
    verso:
      "Refugiado foge de guerra, perseguição ou desastre (proteção pelo Direito Internacional). Migrante econômico se desloca em busca de trabalho/melhores condições. Crises recentes: Síria, Venezuela.",
  },

  // ---------- Matemática ----------
  {
    materia: "matematica",
    assunto: "Trigonometria",
    frente: "Seno, cosseno e tangente no triângulo retângulo",
    verso:
      "sen = cateto oposto / hipotenusa; cos = cateto adjacente / hipotenusa; tg = oposto / adjacente. Mnemônico SOH-CAH-TOA. Valores notáveis: 30°, 45°, 60°.",
  },
  {
    materia: "matematica",
    assunto: "Proporcionalidade",
    frente: "Regra de três e porcentagem",
    verso:
      "Regra de três: monta a proporção e multiplica em cruz (direta) ou invertida. Porcentagem: x% = x/100. Aumento de 20% = multiplicar por 1,20; desconto de 20% = por 0,80.",
  },
  {
    materia: "matematica",
    assunto: "Função exponencial",
    frente: "Função exponencial: forma e uso",
    verso:
      "f(x) = a·bˣ (b>0, b≠1). Cresce se b>1, decresce se 0<b<1. Modela juros compostos, crescimento populacional e meia-vida; cresce muito mais rápido que a linear.",
  },
  {
    materia: "matematica",
    assunto: "Sistemas lineares",
    frente: "Como resolver um sistema 2x2?",
    verso:
      "Métodos: substituição, adição (eliminação) ou comparação. Geometricamente, a solução é o ponto de encontro das duas retas. Pode ser determinado, impossível ou indeterminado.",
  },

  // ---------- Biologia ----------
  {
    materia: "biologia",
    assunto: "Imunologia",
    frente: "Vacina x soro",
    verso:
      "Vacina: imunização ativa e preventiva — antígeno induz o corpo a produzir anticorpos e memória. Soro: imunização passiva e curativa — anticorpos prontos, ação rápida (ex.: picada de cobra).",
  },
  {
    materia: "biologia",
    assunto: "Genética",
    frente: "1ª Lei de Mendel",
    verso:
      "Cada característica é determinada por um par de alelos que se separam na formação dos gametas (segregação). Cruzamento Aa × Aa → proporção fenotípica 3:1.",
  },
  {
    materia: "biologia",
    assunto: "Evolução",
    frente: "Lamarckismo x darwinismo",
    verso:
      "Lamarck: uso/desuso e herança de caracteres adquiridos (refutado). Darwin: variação + seleção natural — o mais adaptado ao ambiente deixa mais descendentes.",
  },
  {
    materia: "biologia",
    assunto: "Biologia molecular",
    frente: "Transcrição x tradução",
    verso:
      "Transcrição: DNA → RNAm (no núcleo). Tradução: RNAm → proteína nos ribossomos, com o RNAt trazendo aminoácidos conforme os códons. É o 'dogma central'.",
  },
  {
    materia: "biologia",
    assunto: "Ecologia",
    frente: "Relações ecológicas (exemplos)",
    verso:
      "Harmônicas: mutualismo, comensalismo, sociedade. Desarmônicas: predação, competição, parasitismo. Podem ser intra (mesma espécie) ou interespecíficas.",
  },
  {
    materia: "biologia",
    assunto: "Saúde e doenças",
    frente: "Vírus x bactéria",
    verso:
      "Vírus: acelular, parasita obrigatório, não responde a antibióticos (combate com vacina/antivirais). Bactéria: célula procarionte, pode ser combatida com antibióticos.",
  },

  // ---------- Física ----------
  {
    materia: "fisica",
    assunto: "Calorimetria",
    frente: "Calor sensível x calor latente",
    verso:
      "Sensível: muda a temperatura (Q = m·c·ΔT). Latente: muda o estado físico sem mudar a temperatura (Q = m·L), como na fusão e na vaporização.",
  },
  {
    materia: "fisica",
    assunto: "Ondulatória",
    frente: "Elementos de uma onda",
    verso:
      "Amplitude (intensidade), comprimento de onda λ, frequência f (Hz) e período T (=1/f). Velocidade: v = λ·f. Som e luz são ondas (mecânica x eletromagnética).",
  },
  {
    materia: "fisica",
    assunto: "Óptica",
    frente: "Reflexão x refração",
    verso:
      "Reflexão: a luz volta ao meio de origem (espelhos). Refração: a luz muda de meio e de velocidade, desviando (lentes, miragem, 'lápis quebrado' na água).",
  },

  // ---------- Química ----------
  {
    materia: "quimica",
    assunto: "Funções inorgânicas",
    frente: "Ácido, base, sal e óxido",
    verso:
      "Ácido libera H⁺ (HCl); base libera OH⁻ (NaOH); ácido + base → sal + água (neutralização); óxido é binário com oxigênio (CO₂). Ácido + base muda a cor de indicadores.",
  },
  {
    materia: "quimica",
    assunto: "Termoquímica",
    frente: "Reação endotérmica x exotérmica",
    verso:
      "Exotérmica: libera calor, ΔH < 0 (combustão). Endotérmica: absorve calor, ΔH > 0 (fotossíntese, cozimento). ΔH = H(produtos) − H(reagentes).",
  },
  {
    materia: "quimica",
    assunto: "Química orgânica",
    frente: "Como reconhecer funções orgânicas?",
    verso:
      "Pelo grupo funcional: álcool (–OH), ácido carboxílico (–COOH), aldeído (–CHO), cetona (C=O entre carbonos), éster (–COO–), amina (–NH₂). Comuns em fármacos e biomoléculas.",
  },
];
