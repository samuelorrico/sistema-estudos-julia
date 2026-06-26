# Mapa de Estudos da Juju 📚

Sistema web para ajudar a Juju a estudar de forma eficiente para o vestibular de **Psicologia da EBMSP** (PROSEF), com banco de questões filtrável, acompanhamento de desempenho e um tutor de IA personalizado.

> **Status:** 🟢 Em desenvolvimento — documentação spec-driven concluída; app Next.js inicializado (M1).

## O que é

A EBMSP (Escola Bahiana de Medicina e Saúde Pública) seleciona Psicologia pelo **PROSEF**, que cobra **conhecimentos gerais de nível Ensino Médio** com estilo próprio da banca. Este projeto monta um ambiente de estudo focado nesse formato real (e não em questões genéricas).

## Funcionalidades planejadas (v1)

- 🗂️ Banco de questões com filtros (matéria, assunto, dificuldade) e modo de treino
- 📊 Painel de desempenho por matéria/assunto (foco nos pontos fracos)
- 🤖 Tutor de IA: explica erros, gera questões e corrige redação dissertativo-argumentativa

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS** + shadcn/ui
- **PostgreSQL** (Neon) + **Drizzle ORM** + **Auth.js**
- **Vercel AI SDK** + **Claude** (Anthropic) para o tutor
- Deploy na **Vercel**

## Estrutura do repositório

```text
.specs/   → documentação spec-driven (visão, roadmap, decisões, specs)
web/      → aplicação Next.js (código)
```

### Rodar o app (web/)

```bash
cd web
npm run dev
```

## Documentação (spec-driven)

Todo o planejamento vive em [`.specs/`](.specs/):

- [`project/PROJECT.md`](.specs/project/PROJECT.md) — visão, escopo e contexto do vestibular
- [`project/ROADMAP.md`](.specs/project/ROADMAP.md) — milestones e features
- [`project/STATE.md`](.specs/project/STATE.md) — decisões, blockers e memória entre sessões
- [`features/`](.specs/features/) — specs por feature (ex.: banco de questões)

## Roadmap (resumo)

1. **M1** — Fundação + Banco de Questões  *(em andamento)*
2. **M2** — Acompanhamento + Plano de Estudo
3. **M3** — Agente de IA (Tutor)
4. **M4** — Polimento + Operação
