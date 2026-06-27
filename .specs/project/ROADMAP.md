# Roadmap

**Current Milestone:** M1 — Fundação + Banco de Questões
**Status:** Banco + 3 modos + tutor de IA prontos (build passando). Falta deploy na Vercel. Próximo: M2 (desempenho).

---

## M1 — Fundação + Banco de Questões (MVP)

**Goal:** A Juju consegue filtrar questões por matéria/assunto/dificuldade e treinar respondendo, com gabarito + explicação.
**Target:** Primeira fatia vertical demo-ável (filtrar → responder → ver acerto/explicação).

### Features

**Fundação do projeto** - IN PROGRESS

- [x] Scaffold Next.js + TypeScript + Tailwind (App Router) em `web/`
- [x] shadcn/ui + página inicial + rotas stub (/treino, /desempenho)
- [x] Banco Neon + Drizzle (schema `questoes` + migração aplicada)
- [x] ~~Auth.js~~ — **removido**: app sem login (AD-005)
- [ ] Adicionar coluna `textoApoio` ao schema (AD-006)
- [ ] Deploy inicial na Vercel

**Banco de questões + filtros** - DONE  *(spec: features/banco-questoes/spec.md)*

- Schema `questoes` + `textoApoio`/`numero`/`imagens` ✅
- **Seed das provas reais** ✅ — 110 questões (Bahiana 34 / UNIT 39 / ZARNS 37) + 31 flashcards
- Filtros combináveis (matéria/assunto/dificuldade) ✅

**Modos de estudo (3)** - DONE  *(spec: features/modos-estudo/spec.md)*

- Simulado (30 questões) → placar + revisão colorida ao fim (verde acerto / vermelho erro) ✅
- Treino (filtrado) → feedback imediato com animação ✅
- Flashcards (conceitos) → virar card, sabia/não sabia ✅

---

## M2 — Acompanhamento + Plano de Estudo

**Goal:** O sistema registra o que ela acertou/errou e mostra onde focar.

### Features

**Registro de tentativas** - PLANNED

- Persistir cada resposta (questão, acerto/erro, tempo)
- Evitar repetir questões já dominadas

**Painel de desempenho** - PLANNED

- Acertos por matéria/assunto; destaque de pontos fracos (foco Exatas)

**Plano de estudo (cronograma)** - PLANNED

- Cronograma por prioridade (redação 40% + áreas fracas)

---

## M3 — Agente de IA (Tutor)  *(spec: features/tutor-ia/spec.md)*

**Goal:** Tutor de IA personalizado integrado ao fluxo de estudo. Precisa de `ANTHROPIC_API_KEY`.

### Features

**Geração de questões no padrão Strix** - DONE ⭐ (precisa `ANTHROPIC_API_KEY` para usar)

- Gera questões inéditas gerais ou por matéria/assunto, no padrão da banca (`padrao-strix.md`) ✅
- Saída estruturada (Zod) compatível com `questoes`; `fonte = "IA"`; prévia + salvar em `/tutor` ✅
- Vercel AI SDK (`ai`) + `@ai-sdk/anthropic`, modelo `claude-opus-4-8`

**Tutor conversacional** - PLANNED

- Chat com streaming (Vercel AI SDK + Claude); ferramentas: pontos fracos, buscar questões

**Explicação de erros** - PLANNED
**Geração de flashcards/conceitos** - PLANNED
*(Correção de redação: fora do escopo — a Juju faz a redação por conta dela — AD-007)*

---

## M4 — Polimento + Operação

**Goal:** Sistema estável e observável em produção.

### Features

**Testes E2E (Playwright)** - PLANNED
**Revisão de segurança (security-best-practices)** - PLANNED
**Monitoramento (Sentry)** - PLANNED

---

## Future Considerations

- Busca semântica de questões com pgvector (RAG)
- Simulado completo cronometrado no formato real (30 objetivas + redação)
- Senha simples (passcode) se quiser privacidade, sem virar multiusuário
- Importar/etiquetar automaticamente novas questões (Playwright + IA)
