# Roadmap

**Current Milestone:** M1 — Fundação + Banco de Questões
**Status:** Planning

---

## M1 — Fundação + Banco de Questões (MVP)

**Goal:** A Juju consegue logar, filtrar questões por matéria/assunto/dificuldade e treinar respondendo, com gabarito.
**Target:** Primeira fatia vertical demo-ável (login → filtrar → responder → ver acerto).

### Features

**Fundação do projeto** - PLANNED

- Scaffold Next.js + TypeScript + Tailwind + shadcn/ui
- Banco Neon + Drizzle (schema inicial) + migrações
- Auth.js com login simples
- Deploy inicial na Vercel

**Banco de questões + filtros** - PLANNED  *(spec: features/banco-questoes/spec.md)*

- Schema de `questoes` com matéria/assunto/dificuldade/fonte/ano/alternativas/gabarito
- Seed inicial de questões ENEM etiquetadas (≥300)
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

- Acertos por matéria/assunto
- Destaque de pontos fracos (foco Exatas)

**Plano de estudo (cronograma)** - PLANNED

- Cronograma sugerido por prioridade (redação + áreas fracas)

---

## M3 — Agente de IA (Tutor)

**Goal:** Tutor de IA personalizado integrado ao fluxo de estudo.

### Features

**Tutor conversacional** - PLANNED

- Chat com streaming (Vercel AI SDK + Claude)
- Ferramentas: consultar pontos fracos, buscar questões, registrar sessão

**Explicação de erros** - PLANNED
**Geração de questões por assunto** - PLANNED
**Correção de redação (critério ≥600)** - PLANNED

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
- Simulado completo cronometrado no formato PROSEF (30 + 5 discursivas + redação)
- Abrir para outros vestibulandos da EBMSP (multiusuário)
- Importar/etiquetar automaticamente novas questões (Playwright + IA)
