# Tutor de IA — Specification

## Problem Statement

A Juju precisa de ajuda personalizada para estudar: praticar com mais questões no estilo da banca
quando o banco "acaba", entender por que errou, e treinar a redação (que vale 40% do escore). Um tutor
de IA integrado resolve isso sob demanda, sem depender de professor humano.

## Goals

- [ ] Gerar questões inéditas no **padrão Strix** (ver `padrao-strix.md`), gerais ou por matéria/assunto.
- [ ] Explicar por que ela errou uma questão, em linguagem didática.
- [ ] Corrigir uma redação dissertativo-argumentativa pelas 5 competências (0–10).

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| Voz / áudio | Texto basta no v1 |
| Geração de imagens nas questões | Estímulo só em texto/descrição no v1 |
| Multiusuário | 1 usuária (sem login — AD-005) |

---

## User Stories

### P1: Gerar questões no padrão Strix ⭐ MVP do tutor

**User Story**: Como a Juju, quando o banco não tem questões suficientes, quero pedir ao tutor que gere
mais questões (gerais ou de uma matéria/assunto), para nunca ficar sem treino.

**Why P1**: É o pedido explícito do usuário e o maior valor do agente.

**Acceptance Criteria**:

1. WHEN a usuária pede N questões de uma matéria/assunto/dificuldade THEN o sistema SHALL gerar N
   questões no formato do schema (5 alternativas A–E, 1 correta, gabarito + explicação), respeitando
   o padrão Strix descrito em `padrao-strix.md`.
2. WHEN a usuária pede "questões gerais" THEN o sistema SHALL respeitar a proporção da prova
   (Port 8 / Inglês 4 / Hist 3 / Geo 3 / Mat 3 / Bio 5 / Fís 2 / Quím 2).
3. WHEN uma questão é gerada THEN o sistema SHALL marcá-la com `fonte = "IA"` e permitir salvá-la no banco.
4. WHEN a geração falha ou retorna formato inválido THEN o sistema SHALL avisar e não inserir lixo no banco.

**Independent Test**: Pedir "5 questões de Biologia, média" e receber 5 questões válidas no padrão.

---

### P2: Explicar erros

**User Story**: Como a Juju, ao errar uma questão, quero uma explicação do tutor, para aprender com o erro.

**Acceptance Criteria**:

1. WHEN a usuária erra e pede explicação THEN o sistema SHALL explicar por que a correta está certa e
   por que a alternativa marcada está errada, em tom didático.

---

### P3: Corrigir redação

**User Story**: Como a Juju, quero colar minha redação e receber nota por competência + comentários,
para melhorar a parte que mais pesa (40%).

**Acceptance Criteria**:

1. WHEN a usuária envia um texto dissertativo-argumentativo THEN o sistema SHALL pontuar as 5
   competências (0–2 cada, total 0–10) e apontar pontos a melhorar.

---

## Edge Cases

- WHEN a IA gera questão sem exatamente 5 alternativas ou sem gabarito válido THEN o sistema SHALL
  rejeitar (validação Zod) e tentar novamente / avisar.
- WHEN a `ANTHROPIC_API_KEY` não está configurada THEN o sistema SHALL exibir mensagem clara
  (recurso indisponível), sem quebrar o app.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| TUTOR-01 | P1: gerar por matéria/assunto/dificuldade | Design | Pending |
| TUTOR-02 | P1: questões gerais na proporção da prova | Design | Pending |
| TUTOR-03 | P1: marcar fonte=IA + salvar no banco | Design | Pending |
| TUTOR-04 | P1: validação do formato (Zod) | Design | Pending |
| TUTOR-05 | P2: explicar erros | - | Pending |
| TUTOR-06 | P3: corrigir redação (5 competências) | - | Pending |

**ID format:** `TUTOR-[NUMBER]`

---

## Success Criteria

- [ ] A usuária gera questões no padrão Strix sob demanda (geral ou específico) e elas entram no banco.
- [ ] As questões geradas têm sempre 5 alternativas, 1 correta e explicação coerente.
- [ ] Dependências externas: `ANTHROPIC_API_KEY` (em `web/.env.local`).
