# State

**Last Updated:** 2026-06-26
**Current Work:** M1 — Fundação. Scaffold Next.js criado em `web/`. Próximo: shadcn/ui → Drizzle/Neon → Auth.js.

---

## Recent Decisions (Last 60 days)

### AD-001: Stack técnica (2026-06-26)

**Decision:** Next.js (App Router) + TypeScript na Vercel; PostgreSQL no Neon com Drizzle ORM; Auth.js para login; Tailwind + shadcn/ui na UI.
**Reason:** Base pedida pelo usuário (JS/TS/React/Next/Node + Vercel); pareamento canônico e TS-first, ótimo para dev solo.
**Trade-off:** Auth.js exige mais setup que Supabase Auth (alternativa avaliada e descartada por enquanto).
**Impact:** Define scaffold do M1.

### AD-002 (revisada): Banco = 3 últimos PROSEFs como base; ENEM como complemento (2026-06-26)

**Decision:** Popular o banco **primariamente com os 3 últimos PROSEFs de Psicologia** (provas reais da banca, disponibilizadas pela EBMSP via formulário), etiquetados por matéria/assunto/dificuldade. Usar questões de ENEM/vestibulares equivalentes **apenas como complemento de volume** nos assuntos onde faltarem questões.
**Reason:** O usuário apontou (correto) que a EBMSP tem vestibular próprio com "modelo de cobrança" (estilo de cobrar o conteúdo) um pouco diferente do ENEM; treinar nas provas reais captura o estilo da banca. O usuário não possui outras provas além dessas 3 e está de acordo em usar só elas como base.
**Trade-off:** Volume pequeno (3 provas ≈ ~90 questões objetivas) vs. fidelidade ao estilo da banca; mitigado pelo complemento ENEM por assunto.
**Impact:** Fonte de seed (feature banco-questoes) = os 3 PROSEFs (PDFs via formulário) + complemento ENEM. Substitui a abordagem anterior (ENEM como base).
**Supersedes:** versão original de AD-002 (ENEM como base principal).

### AD-003: Construir o sistema completo, ciente de não ficar pronto p/ 12/07/2026 (2026-06-26)

**Decision:** Seguir com o sistema completo (banco + filtros + agente de IA) com calma; assumir que provavelmente não fica pronto para a prova de 12/07/2026.
**Reason:** Escolha explícita do usuário; serve para o longo prazo / próxima tentativa. Faltam ~16 dias para a prova.
**Trade-off:** O estudo imediato dela não depende do sistema; recomendado praticar ENEM por assunto e treinar redação em paralelo, fora do app.
**Impact:** Sem pressão de prazo no desenvolvimento; prioriza qualidade.

### AD-004: Agente de IA via Claude + Vercel AI SDK (2026-06-26)

**Decision:** Tutor de IA com Vercel AI SDK (`ai`) + provider Anthropic. Modelos: `claude-opus-4-8` (plano/explicações difíceis), `claude-sonnet-4-6` (chat), `claude-haiku-4-5` (tarefas baratas em massa). Streaming + tool use + prompt caching.
**Reason:** Integração natural em Next.js/Vercel (`useChat`); custo desprezível para 1 usuária.
**Trade-off:** Acopla a um provider (Claude) — aceitável; o AI SDK abstrai troca futura.
**Impact:** Define a feature do M3 (tutor).

---

## Active Blockers

### B-001: Edital oficial 2026.2 não localizado

**Discovered:** 2026-06-26
**Impact:** Pesos exatos, duração e distribuição de questões por matéria do PROSEF 2026.2 não confirmados (só o formato geral está mapeado).
**Workaround:** Usar o formato geral conhecido (30 objetivas + 5 discursivas + redação; cortes 500/600).
**Resolution:** Pedir ao usuário o PDF do edital do processo com prova em 12/07; recalibrar pesos no banco/plano.

---

## Lessons Learned

### L-001: PROSEF tem estilo próprio — provas reais > ENEM genérico (2026-06-26)

**Context:** Plano inicial usava ENEM como base do banco por disponibilidade.
**Problem:** O vestibular da EBMSP (PROSEF) tem "modelo de cobrança" próprio, diferente do ENEM; questões genéricas não treinam o estilo da banca.
**Solution:** Inverter a fonte — 3 últimos PROSEFs como base, ENEM só como complemento (AD-002 revisada).
**Prevents:** Treino desalinhado com o estilo real da prova; futuras decisões de fonte de conteúdo devem priorizar a banca específica.

---

## Quick Tasks Completed

| #   | Description | Date | Commit | Status |
| --- | ----------- | ---- | ------ | ------ |
| 001 | Conectar repo + push da documentação (.specs) | 2026-06-26 | 36d0b4b | ✅ Done |
| 002 | Scaffold Next.js em `web/` (TS, Tailwind, App Router) | 2026-06-26 | — | ✅ Done |

---

## Deferred Ideas

- [ ] Busca semântica de questões com pgvector (RAG) — Captured during: planejamento
- [ ] Simulado cronometrado no formato PROSEF completo — Captured during: planejamento
- [ ] Importação automática de questões (Playwright + IA) — Captured during: planejamento

---

## Todos

- [ ] Obter o PDF do edital EBMSP 2026.2 (Psicologia) para calibrar pesos (ver B-001)
- [ ] Baixar os 3 últimos PROSEFs de Psicologia (materiais.bahiana.edu.br/provas-psicologia, via formulário) — fonte do banco
- [x] Conectar ao repositório github.com/samuelorrico/sistema-estudos-julia (feito; `main` pushado)
- [ ] Definir local/nome final do app no scaffold (M1) quando partirmos para código

---

## Preferences

**Model Guidance Shown:** never
**Idioma do projeto:** Português (pt-BR)
