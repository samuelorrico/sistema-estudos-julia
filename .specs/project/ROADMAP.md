# Roadmap

**Current Milestone:** M1 — Fundação + Banco de Questões
**Status:** In Progress

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

**Banco de questões + filtros** - PLANNED  *(spec: features/banco-questoes/spec.md)*

- Schema de `questoes` (matéria/assunto/dificuldade/fonte/ano/alternativas/gabarito) ✅ + `textoApoio`
- **Seed a partir das provas reais** (começar pela Bahiana Área de Saúde 2025.1 — formato idêntico)
- Listagem com filtros combináveis
- Modo de treino (responder, ver gabarito e explicação)

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

**Geração de questões no padrão Strix** - PLANNED ⭐ (prioridade do usuário)

- Gerar questões inéditas gerais ou por matéria/assunto, no padrão da banca (`padrao-strix.md`)
- Saída estruturada (Zod) compatível com a tabela `questoes`; `fonte = "IA"`; salvar no banco

**Tutor conversacional** - PLANNED

- Chat com streaming (Vercel AI SDK + Claude); ferramentas: pontos fracos, buscar questões

**Explicação de erros** - PLANNED
**Correção de redação (5 competências, 0–10)** - PLANNED

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
