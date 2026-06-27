# Padrão Strix de Questões — Referência para o Agente de IA

Este documento "treina" o agente de IA: define o **padrão exato** das questões da banca
(Strix Educação / EBMSP, área de saúde) para que ele **gere questões novas no mesmo estilo**,
gerais ou de uma matéria específica. Fonte: edital PROSEL 2026.2 + provas reais 2025 fornecidas.

## 1. Fonte da verdade

- **Banca:** Strix Educação (responsável pela prova da EBMSP).
- **Prova da Juju (Psicologia / área de saúde):** **30 questões objetivas** (Prova de Conhecimentos
  Gerais Contemporâneos — PCGC) **+ 1 redação** dissertativo-argumentativa. **Sem discursivas,
  sem etapa vivencial** (isso é só do curso de Medicina).
- **Provas reais de referência (2025), fornecidas pelo usuário:**
  - **Bahiana — Área de Saúde 2025.1** (Biomedicina/Ed. Física/Enfermagem/Fisioterapia/Odonto/**Psicologia**):
    30 objetivas + redação. **Formato idêntico** ao que a Juju fará → referência principal.
  - Bahiana Medicina 2025.1, ZARNS Medicina 2025.1, UNIT Medicina 2025.1: mesma banca/estilo Strix
    (Medicina tem 35–40 objetivas + discursivas; usar só como referência de **estilo**, não de formato).

## 2. Distribuição das 30 questões (espelhar) — edital 2026.2

| Área | Matéria | Questões |
|---|---|---|
| Linguagens, Códigos e suas Tecnologias | Língua Portuguesa | 8 |
| Linguagens, Códigos e suas Tecnologias | Língua Estrangeira (Inglês) | 4 |
| Ciências Humanas e suas Tecnologias | História | 3 |
| Ciências Humanas e suas Tecnologias | Geografia | 3 |
| Matemática e suas Tecnologias | Matemática | 3 |
| Ciências da Natureza e suas Tecnologias | Biologia | 5 |
| Ciências da Natureza e suas Tecnologias | Física | 2 |
| Ciências da Natureza e suas Tecnologias | Química | 2 |
| **Total** | | **30** |

## 3. Anatomia de uma questão Strix (o que o agente deve reproduzir)

1. **Texto de apoio (estímulo):** trecho de texto, citação de autor, poema, charge/infográfico
   (descrito em palavras), tabela, gráfico, frase, estrutura química, fragmento de música, etc.
   Tema recorrente: **saúde, meio ambiente, sociedade contemporânea** ("saúde planetária").
2. **Fonte do estímulo:** sempre citada (autor / "Disponível em:").
3. **Comando (enunciado):** pede **interpretação / análise / aplicação** (estilo ENEM,
   por competências e habilidades) — não é "decoreba".
4. **5 alternativas (A, B, C, D, E)** — mutuamente exclusivas, **apenas uma correta**.
5. **Distratores plausíveis:** erros conceituais comuns, leituras parciais do texto, ou um
   "fato verdadeiro mas que não responde ao comando". (Ex.: na questão de melanoma acral,
   "radiação UV" é um distrator forte porque é a causa do melanoma *comum*, mas não do *acral*.)

## 4. Características por matéria (observadas nas provas reais)

- **Português (8):** interpretação (crônica, conto, poema, propaganda, charge, tirinha);
  análise linguística (função sintática, processos de formação de palavras, transitividade,
  vozes verbais, coesão, figuras de linguagem); semântica.
- **Inglês (4):** leitura/interpretação de texto ou citação; vocabulário em contexto;
  gramática (modais, comparativos, conjunções correlativas, pronomes relativos).
- **História (3) / Geografia (3):** mundo contemporâneo, Brasil, geopolítica, meio ambiente,
  recursos hídricos, energia; sempre com **análise crítica** a partir de um texto/charge.
- **Matemática (3):** função quadrática, logaritmo, probabilidade, geometria, estatística —
  **aplicada a um contexto** (saúde, ambiente, esporte).
- **Biologia (5):** fisiologia humana, genética/herança, ecologia, citologia, evolução,
  vírus/doenças — contexto saúde/ambiente.
- **Física (2):** óptica, eletricidade, mecânica, ondas, termodinâmica — contextualizada.
- **Química (2):** estequiometria, funções inorgânicas/orgânicas, termoquímica, atomística — contextualizada.

## 5. Critérios da prova (edital 2026.2) — para o agente calibrar prioridade

- Nota bruta objetiva = nº de acertos (0–30). **Eliminado se < 6/30.**
- Redação 0–10 (5 competências). **Eliminado se < 3/10.**
- Escore final padronizado, **pesos: objetiva 6 / redação 4** → a redação vale **40%**.
  ⇒ O agente deve **priorizar redação** e não deixar a candidata zerar nenhuma área.

## 6. Saída estruturada (esquema que o agente produz)

Cada questão gerada deve ser um objeto compatível com a tabela `questoes`
(ver `web/src/db/schema.ts`). **Adicionar coluna `textoApoio`** (texto, opcional) para o estímulo.

```ts
{
  textoApoio: string | null,        // estímulo (texto/citação/descrição de imagem); pode ser null
  enunciado: string,                // o comando da questão
  materia: "portugues" | "ingles" | "historia" | "geografia" |
           "matematica" | "biologia" | "fisica" | "quimica",
  assunto: string,                  // ex.: "interpretação de texto", "genética", "função quadrática"
  dificuldade: "facil" | "media" | "dificil",
  alternativas: [                   // exatamente 5
    { id: "A", texto: string }, { id: "B", texto: string },
    { id: "C", texto: string }, { id: "D", texto: string },
    { id: "E", texto: string }
  ],
  gabarito: "A" | "B" | "C" | "D" | "E",
  explicacao: string,               // por que a correta está certa E por que os distratores erram
  fonte: "IA"                        // distingue das questões reais (PROSEL/ENEM)
}
```

Implementação: `generateObject` do Vercel AI SDK com um schema Zod igual ao acima
(array de questões), modelo `claude-sonnet-4-6` (geração em volume) ou `claude-opus-4-8`
(quando exigir mais rigor, ex.: Matemática/Física com cálculo).

## 7. PROMPT DO AGENTE (gerar questões no padrão Strix)

**System prompt:**

```
Você é um elaborador de questões do vestibular da EBMSP (banca Strix Educação), área de saúde.
Gere questões objetivas INÉDITAS no padrão exato dessa banca para a candidata Juju treinar.

REGRAS DO PADRÃO STRIX:
- Estilo ENEM: contextualizado, por competências; nunca "decoreba" puro.
- Toda questão tem: um TEXTO DE APOIO (trecho, citação com autor/fonte, ou descrição de
  charge/gráfico/tabela), um COMANDO claro, e EXATAMENTE 5 alternativas (A–E), com apenas
  UMA correta.
- Temas preferenciais: saúde, meio ambiente, sociedade contemporânea, ciência.
- Distratores PLAUSÍVEIS: erros conceituais comuns, leitura parcial do texto, ou um fato
  verdadeiro que NÃO responde ao comando. Nada de alternativas absurdas.
- Nível: Ensino Médio. Português pt-BR; questões de Inglês têm o texto/comando em inglês.
- Sempre forneça a EXPLICAÇÃO: por que a correta está certa e por que cada distrator erra.

NÃO copie questões existentes; crie novas no mesmo estilo.
Responda SOMENTE no formato estruturado pedido (sem texto fora do schema).
```

**Instrução por chamada (parâmetros que a Juju controla na UI):**

```
Gere {N} questões.
Matéria: {materia ou "mistas, respeitando a proporção da prova: Port 8, Inglês 4, Hist 3,
  Geo 3, Mat 3, Bio 5, Fís 2, Quím 2"}.
Assunto específico (opcional): {assunto}.
Dificuldade: {facil|media|dificil|mista}.
{Se houver pontos fracos da Juju: "Priorize os assuntos onde ela mais erra: {lista}."}
```

## 8. Exemplos reais (few-shot) — extraídos das provas fornecidas

> Usar como referência de **estilo e nível** (não copiar).

**Exemplo A — Português (interpretação) · gabarito D**
- *Texto de apoio:* fragmento que define saúde (OMS) e explica a criação do SUS (universalidade,
  igualdade, integralidade), com fonte citada.
- *Comando:* "Considerando a organização desse fragmento de texto, é correto afirmar que nele
  predominam características de cunho..."
- *Alternativas:* A) narrativo  B) injuntivo  C) descritivo  **D) expositivo**  E) argumentativo
- *Explicação:* o texto **informa saberes consensuais de forma clara e objetiva, sem intenção de
  persuadir** → expositivo. Não há enredo (narrativo), instrução (injuntivo), retrato sensorial
  (descritivo) nem defesa de tese com provas (argumentativo).

**Exemplo B — Biologia (mutações) · gabarito E**
- *Texto de apoio:* o melanoma acral surge em regiões **pouco expostas ao sol** (palmas, plantas,
  sob as unhas), não tem pele clara como fator de risco e ocorre em **qualquer etnia**.
- *Comando:* "Identifique o principal fator considerado para a alta ocorrência de melanoma acral."
- *Alternativas:* A) gases CFC/ozônio  B) cremes e hidratantes  C) alta incidência de radiação UV
  nas regiões afetadas  D) troca de medicamentos  **E) componentes genéticos específicos, presentes
  em indivíduos de diferentes etnias**
- *Explicação:* como o melanoma acral aparece em áreas **não** expostas ao sol, "radiação UV" (C) é
  um **distrator** (é a causa do melanoma comum, não do acral). A causa principal é **genética** (E),
  coerente com a manifestação em qualquer etnia.
```
