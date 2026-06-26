# Banco de Questões + Filtros — Specification

## Problem Statement

A Juju precisa treinar com questões no estilo da prova (PROSEF/EBMSP), mas se perde sem foco. Ela precisa filtrar questões por matéria/assunto/dificuldade e responder com gabarito imediato, para concentrar o estudo onde mais importa (Exatas) sem caçar provas dispersas.

## Goals

- [ ] Banco etiquetado por matéria/assunto/dificuldade/fonte-ano, tendo **os 3 últimos PROSEFs como base** e ENEM como complemento de volume (AD-002 revisada).
- [ ] Filtragem combinável que retorna a lista correta em < 1s.
- [ ] Modo de treino: responder, ver acerto/erro e a explicação do gabarito.

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| Registro de desempenho histórico | É a feature do M2 (tentativas/painel) |
| Geração de questões por IA | É a feature do M3 (tutor) |
| Simulado cronometrado completo | Future Consideration (roadmap) |

---

## User Stories

### P1: Filtrar e responder questões ⭐ MVP

**User Story**: Como a Juju, quero filtrar questões por matéria, assunto e dificuldade e respondê-las, para treinar exatamente o conteúdo que preciso.

**Why P1**: É o núcleo do produto — sem isto não há treino.

**Acceptance Criteria**:

1. WHEN a usuária seleciona uma ou mais matérias/assuntos/dificuldades THEN o sistema SHALL listar apenas as questões que satisfazem todos os filtros aplicados.
2. WHEN a usuária seleciona uma alternativa e confirma THEN o sistema SHALL indicar se acertou ou errou e destacar a alternativa correta.
3. WHEN existe explicação cadastrada para a questão THEN o sistema SHALL exibi-la após a resposta.
4. WHEN nenhum filtro retorna questões THEN o sistema SHALL exibir estado vazio com orientação ("ajuste os filtros").

**Independent Test**: Filtrar por "Matemática → Função do 1º grau → Média", responder uma questão e ver o resultado + explicação.

---

### P2: Navegar um conjunto filtrado em sequência

**User Story**: Como a Juju, quero avançar para a próxima questão do conjunto filtrado, para treinar em série sem reconfigurar filtros.

**Why P2**: Importante para fluidez do estudo, mas o treino unitário já entrega valor.

**Acceptance Criteria**:

1. WHEN a usuária responde uma questão THEN o sistema SHALL oferecer "próxima questão" dentro do mesmo conjunto filtrado.
2. WHEN não há mais questões no conjunto THEN o sistema SHALL informar o fim e oferecer recomeçar/ajustar filtros.

**Independent Test**: Aplicar um filtro com ≥3 questões e percorrê-las até o fim.

---

### P3: Buscar questão por texto

**User Story**: Como a Juju, quero buscar por palavra no enunciado, para revisar um tema específico.

**Why P3**: Conveniência; os filtros estruturados já cobrem o essencial.

**Acceptance Criteria**:

1. WHEN a usuária digita um termo THEN o sistema SHALL retornar questões cujo enunciado contém o termo (case-insensitive).

---

## Edge Cases

- WHEN a questão não tem explicação cadastrada THEN o sistema SHALL exibir só o gabarito, sem quebrar.
- WHEN os filtros combinados são mutuamente exclusivos THEN o sistema SHALL mostrar estado vazio (não erro).
- WHEN o seed importa uma questão com dados faltantes (sem gabarito/alternativas) THEN o sistema SHALL rejeitar/sinalizar no import, não inserir parcial.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| BANCO-01 | P1: Filtrar e responder | Design | Pending |
| BANCO-02 | P1: Gabarito + acerto/erro | Design | Pending |
| BANCO-03 | P1: Exibir explicação | Design | Pending |
| BANCO-04 | P1: Estado vazio | Design | Pending |
| BANCO-05 | P2: Navegação em sequência | - | Pending |
| BANCO-06 | P3: Busca por texto | - | Pending |
| BANCO-07 | Seed do banco: 3 PROSEFs (base) + ENEM (complemento), etiquetados | Design | Pending |

**ID format:** `BANCO-[NUMBER]`
**Status values:** Pending → In Design → In Tasks → Implementing → Verified
**Coverage:** 7 total, 0 mapeados a tasks (Tasks ainda não criadas)

---

## Success Criteria

- [ ] Banco com os 3 PROSEFs importados e etiquetados (matéria + assunto + dificuldade + gabarito), complementado por ENEM onde faltar volume.
- [ ] Filtro combinável retorna a lista correta em < 1s.
- [ ] A usuária consegue responder e ver acerto + explicação em ≤ 2 cliques após filtrar.
