# Modos de Estudo — Specification

## Problem Statement

A Juju estuda de formas diferentes conforme o momento: às vezes quer simular a prova inteira,
às vezes treinar um assunto específico com correção imediata, às vezes revisar conceitos rápidos.
O app oferece **3 modos** sobre o mesmo banco de questões, com feedback visual claro (animações e cores).

## Goals

- [ ] 3 modos: **Simulado** (prova inteira), **Treino** (questões filtradas, feedback na hora), **Flashcards**.
- [ ] Feedback visual: animação de acerto/erro nos painéis de múltipla escolha; cores verde (acerto) / vermelho (erro).
- [ ] Na revisão do Simulado, destacar sempre a alternativa **correta em verde** e a escolhida errada em **vermelho**.

## Out of Scope

| Feature | Reason |
| ------- | ------ |
| Correção de redação | A Juju faz a redação por conta dela (AD-007) |
| Ranking/competição entre usuários | 1 usuária (sem login) |

---

## User Stories

### P1: Modo Simulado (prova inteira) ⭐

**User Story**: Como a Juju, quero fazer uma prova completa (sem ver o resultado durante), e só no
final consultar o gabarito e revisar cada questão, para simular a prova real.

**Why P1**: Reproduz a experiência da prova (12/07) — treino de resistência e gestão de tempo.

**Acceptance Criteria**:

1. WHEN a usuária inicia um simulado THEN o sistema SHALL montar uma prova de **30 questões**
   respeitando a distribuição da prova real (Port 8 / Inglês 4 / Hist 3 / Geo 3 / Mat 3 / Bio 5 / Fís 2 / Quím 2).
2. WHILE responde o simulado THEN o sistema SHALL **não** mostrar acerto/erro (como na prova real),
   permitindo navegar entre questões e alterar respostas.
3. WHEN a usuária finaliza THEN o sistema SHALL mostrar o **resultado geral** (nº de acertos / 30)
   e a revisão **questão por questão**.
4. WHEN revisa uma questão THEN o sistema SHALL destacar a alternativa **correta em verde**; se a
   usuária errou, marcar a escolhida em **vermelho** (a correta permanece em verde) e exibir a explicação.
5. WHEN há questões em branco ao finalizar THEN o sistema SHALL contá-las como não-acerto e
   sinalizá-las na revisão.

**Independent Test**: Iniciar um simulado, responder algumas, deixar outras em branco, finalizar e
ver o placar + a revisão colorida.

---

### P2: Modo Treino (questões selecionadas, feedback na hora) ⭐

**User Story**: Como a Juju, quero treinar questões filtradas por matéria e/ou assunto e ver na hora
se acertei, para fixar conteúdo específico.

**Why P2**: Estudo focado nos pontos fracos com reforço imediato.

**Acceptance Criteria**:

1. WHEN a usuária filtra por matéria e/ou assunto (e dificuldade) THEN o sistema SHALL listar as questões correspondentes.
2. WHEN a usuária responde uma questão THEN o sistema SHALL mostrar **imediatamente** acerto/erro,
   com **animação** (verde no acerto, vermelho no erro) e destacar a alternativa correta em verde,
   exibindo a explicação.
3. WHEN avança THEN o sistema SHALL apresentar a próxima questão do conjunto filtrado.

**Independent Test**: Filtrar "Biologia → genética", responder e ver feedback animado na hora.

---

### P3: Modo Flashcards (conceitos, resposta na hora) ⭐

**User Story**: Como a Juju, quero revisar conceitos em flashcards (frente = conceito/pergunta,
verso = resposta), com resposta revelada na hora, para memorização rápida.

**Why P3**: Revisão ágil de definições/conceitos (complementa as questões de múltipla escolha).

**Acceptance Criteria**:

1. WHEN a usuária inicia flashcards (filtrável por matéria/assunto) THEN o sistema SHALL mostrar a **frente** (conceito/pergunta).
2. WHEN a usuária revela THEN o sistema SHALL mostrar o **verso** (resposta) imediatamente, com animação (virar o card).
3. WHEN a usuária marca "sabia" / "não sabia" THEN o sistema SHALL registrar para priorizar revisão futura (repetição simples).
4. WHEN não há flashcards do filtro THEN o sistema SHALL oferecer gerar conceitos via tutor de IA (ver tutor-ia, TUTOR-06).

**Independent Test**: Abrir flashcards de um assunto, virar o card e classificar.

---

## Edge Cases

- WHEN não há 30 questões suficientes (por matéria) para montar o simulado THEN o sistema SHALL
  completar com o que houver e avisar o déficit (ou oferecer gerar via IA).
- WHEN a animação não é suportada (reduce-motion) THEN o sistema SHALL aplicar só as cores (acessibilidade).

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| -------------- | ----- | ----- | ------ |
| MODO-01 | P1: montar simulado na distribuição real | Design | Pending |
| MODO-02 | P1: sem feedback durante; placar + revisão ao fim | Design | Pending |
| MODO-03 | P1: revisão colorida (verde correta / vermelho errada) | Design | Pending |
| MODO-04 | P2: filtrar + feedback imediato com animação | Design | Pending |
| MODO-05 | P3: flashcards (virar card, resposta na hora, sabia/não) | Design | Pending |
| MODO-06 | Animação acerto/erro nos painéis (respeitando reduce-motion) | Design | Pending |

**ID format:** `MODO-[NUMBER]`

---

## Notas de implementação (orientam o Design)

- **Dados:** reaproveita a tabela `questoes` (Simulado + Treino). Flashcards precisam de tabela
  própria `flashcards` (frente/verso/materia/assunto/fonte). Simulado/Treino registram tentativas (M2).
- **Animações:** Framer Motion (ou CSS) sobre os componentes shadcn; cores via tokens Tailwind
  (`green`/`red`). Respeitar `prefers-reduced-motion`.
- **Montagem do Simulado:** consulta por matéria com as cotas 8/4/3/3/3/5/2/2, embaralhando.

## Success Criteria

- [ ] Os 3 modos funcionam ponta a ponta sobre o mesmo banco.
- [ ] Feedback imediato (Treino/Flashcards) tem animação verde/vermelho; revisão do Simulado é colorida.
- [ ] Acessível: com `reduce-motion`, as cores continuam transmitindo acerto/erro.
