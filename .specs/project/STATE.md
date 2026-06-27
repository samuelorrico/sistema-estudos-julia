# State

**Last Updated:** 2026-06-27
**Current Work:** M1. **Banco semeado: 110 questões reais** (Bahiana 34 / UNIT 39 / ZARNS 37) classificadas por matéria/assunto/dificuldade, com gabarito oficial, 22 textos de apoio e 44 figuras hospedadas. Próximo: **construir os 3 modos** (começar pelo Treino) e depois o agente (precisa `ANTHROPIC_API_KEY`).

**Stack notável:** Next.js **16** + React **19**; shadcn sobre **Base UI** (`Button` sem `asChild` — usar `buttonVariants` no `Link` ou prop `render`). Rotas tipadas ativas (links só para rotas existentes).

---

## Recent Decisions (Last 60 days)

### AD-001: Stack técnica (2026-06-26)

**Decision:** Next.js (App Router) + TypeScript na Vercel; PostgreSQL no Neon com Drizzle ORM; Tailwind + shadcn/ui na UI. *(O login/Auth.js foi removido — ver AD-005.)*
**Reason:** Base pedida pelo usuário (JS/TS/React/Next/Node + Vercel); pareamento canônico e TS-first.
**Impact:** Define scaffold do M1.

### AD-002 (revisada): Banco = provas reais da banca como base; ENEM como complemento (2026-06-26)

**Decision:** Popular o banco **primariamente com as provas reais da Strix** (banca da EBMSP), etiquetadas por matéria/assunto/dificuldade. ENEM/equivalentes só como complemento de volume.
**Reason:** A EBMSP tem estilo próprio de cobrança; treinar nas provas reais captura o estilo da banca.
**Trade-off:** Volume limitado vs. fidelidade ao estilo; mitigado por geração de IA (AD-006) e complemento ENEM.
**Impact:** Fonte de seed = provas fornecidas pelo usuário; ver Quick Task 005. **Provas reais obtidas:** Bahiana Área de Saúde 2025.1 (formato idêntico ao de Psicologia) + Bahiana/ZARNS/UNIT Medicina 2025.1 (referência de estilo).

### AD-003: Construir o sistema completo, ciente de não ficar pronto p/ 12/07/2026 (2026-06-26)

**Decision:** Seguir com o sistema completo com calma; assumir que provavelmente não fica pronto para 12/07/2026.
**Reason:** Escolha explícita do usuário; serve para o longo prazo / próxima tentativa.
**Impact:** Sem pressão de prazo; prioriza qualidade.

### AD-004: Agente de IA via Claude + Vercel AI SDK (2026-06-26)

**Decision:** Tutor de IA com Vercel AI SDK (`ai`) + provider Anthropic. Modelos: `claude-opus-4-8` (rigor), `claude-sonnet-4-6` (chat/geração em volume), `claude-haiku-4-5` (tarefas baratas). Streaming + tool use + prompt caching.
**Reason:** Integração natural em Next.js/Vercel; custo desprezível para 1 usuária.
**Impact:** Define a feature do tutor (M3).

### AD-005: Sem login — app de usuária única (2026-06-26)

**Decision:** **Remover Auth.js/login.** O app é de uso pessoal da Juju; só ela acessa. Sem cadastro/autenticação no v1.
**Reason:** Pedido explícito do usuário ("não tem necessidade de login, só ela vai acessar").
**Trade-off:** Sem isolamento entre usuários; aceitável (1 usuária). Se quiser privacidade depois, adicionar uma senha simples (Basic/passcode).
**Impact:** Remove a task de Auth.js do M1; simplifica o scaffold. **Supersede** a parte de auth do AD-001.

### AD-006: Agente gera questões no padrão Strix (2026-06-26)

**Decision:** O agente de IA gera questões inéditas no **padrão exato da banca** (Strix/EBMSP, área de saúde), gerais ou por matéria/assunto, com saída estruturada compatível com a tabela `questoes`.
**Reason:** Pedido explícito do usuário; garante treino infinito no estilo certo.
**Impact:** Definido em `features/tutor-ia/padrao-strix.md` (padrão + prompt + few-shot reais) e `features/tutor-ia/spec.md` (TUTOR-01..04). Requer adicionar coluna `textoApoio` ao schema.

### AD-007: 3 modos de estudo; redação por conta da Juju (2026-06-26)

**Decision:** O app terá 3 modos — **Simulado** (prova inteira; gabarito + revisão colorida ao fim), **Treino** (questões filtradas por matéria/assunto; feedback imediato com animação) e **Flashcards** (conceitos; resposta na hora). A **correção de redação fica fora do escopo** — a Juju faz a redação por conta dela.
**Reason:** Pedido explícito do usuário.
**Impact:** Nova feature `features/modos-estudo/spec.md` (MODO-01..06). A correção de redação do tutor vira **geração de flashcards**. Implica tabela `flashcards` e montagem do simulado na distribuição 8/4/3/3/3/5/2/2; feedback com animação verde/vermelho (respeitando `reduce-motion`).

---

## Active Blockers

_(nenhum ativo)_

### B-001 (RESOLVIDO): Edital oficial 2026.2 — obtido em 2026-06-26

**Resolução:** Usuário forneceu o PDF do **Edital PROSEL 2026.2** (área de saúde, inclui Psicologia). Fatos confirmados (ver PROJECT.md → Contexto): prova = **30 objetivas (5 alternativas) + redação**; distribuição Port 8/Inglês 4/Hist 3/Geo 3/Mat 3/Bio 5/Fís 2/Quím 2; pesos objetiva 6 / redação 4; eliminação < 6/30 (objetiva) ou < 3/10 (redação); prova 12/07/2026, Campus Cabula; Psicologia 5 vagas.

---

## Lessons Learned

### L-001: Banca tem estilo próprio — provas reais > ENEM genérico (2026-06-26)

**Solution:** Provas reais da Strix como base; ENEM só complemento (AD-002 revisada).
**Prevents:** Treino desalinhado com o estilo real da prova.

### L-002: Formato de Psicologia ≠ Medicina (2026-06-26)

**Context:** Mapeamento inicial (por estimativa/web) dizia "30 objetivas + 5 discursivas + etapa vivencial; cortes 500/600".
**Problem:** Isso era do curso de **Medicina** (e desatualizado). O edital real mostra que a área de saúde (Psicologia) tem **30 objetivas + redação**, sem discursivas/vivencial; eliminação 6/30 e 3/10; escore padronizado (média 500) com pesos 6/4.
**Solution:** Corrigido em PROJECT.md e `padrao-strix.md` a partir do edital oficial.
**Prevents:** Gerar questões/simulados no formato errado; calibrar mal o estudo.

---

## Quick Tasks Completed

| #   | Description | Date | Commit | Status |
| --- | ----------- | ---- | ------ | ------ |
| 001 | Conectar repo + push da documentação (.specs) | 2026-06-26 | 36d0b4b | ✅ Done |
| 002 | Scaffold Next.js em `web/` (TS, Tailwind, App Router) | 2026-06-26 | b50ed0d | ✅ Done |
| 003 | shadcn/ui + landing + rotas stub | 2026-06-26 | 4114c4b | ✅ Done |
| 004 | Drizzle + Neon (schema `questoes` + migração) | 2026-06-26 | f0ff43b | ✅ Done |
| 005 | Edital 2026.2 + provas reais; padrão Strix do agente documentado | 2026-06-26 | — | ✅ Done |
| 006 | Extração + seed de 110 questões reais (3 provas) no Neon, com figuras e classificação; `textoApoio`/`numero`/`imagens` no schema; `npm run db:seed` | 2026-06-27 | add4a61 | ✅ Done |

---

## Deferred Ideas

- [ ] Busca semântica de questões com pgvector (RAG) — Captured during: planejamento
- [ ] Simulado cronometrado no formato real (30 objetivas + redação) — Captured during: planejamento
- [ ] Importação automática de questões (Playwright + IA) — Captured during: planejamento

---

## Todos

- [x] ~~Adicionar coluna `textoApoio` à tabela `questoes`~~ — feito (migração 0001: `textoApoio`/`numero`/`imagens`)
- [x] ~~Extrair e semear o banco com as provas reais~~ — feito (110 questões: Bahiana/UNIT/ZARNS)
- [ ] **Construir os 3 modos** (Treino → Simulado → Flashcards) — ler `node_modules/next/dist/docs/` antes (Next 16 tem breaking changes)
- [ ] Camada de dados/queries (listar por filtro, montar simulado 8/4/3/3/3/5/2/2)
- [ ] Wiring do agente de IA (Vercel AI SDK + Claude) usando o prompt de `padrao-strix.md` — precisa `ANTHROPIC_API_KEY` em `web/.env.local`
- [ ] Criar tabela `flashcards` (frente/verso/materia/assunto) para o Modo Flashcards
- [ ] Escolher lib de animação (Framer Motion vs CSS) para o feedback acerto/erro
- [ ] Hospedar figuras no deploy (Vercel Blob ou repo privado) — hoje servidas localmente (gitignoradas)
- [ ] Cladograma da UNIT Q33 e digestão da ZARNS Q33 são vetoriais (sem raster) — questões ficaram sem figura

---

## Preferences

**Model Guidance Shown:** never
**Idioma do projeto:** Português (pt-BR)
