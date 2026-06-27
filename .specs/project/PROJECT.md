# Mapa de Estudos da Juju

**Vision:** Sistema web que guia a Juju a estudar da forma mais eficiente para o vestibular de Psicologia da EBMSP, com banco de questões filtrável, acompanhamento de desempenho e um tutor de IA que gera questões no padrão da banca.
**For:** A Juju (estudante de Psicologia, 3º semestre na UEMG, voltando a Salvador). Uso pessoal — só ela acessa.
**Solves:** Ela não estudou nada ainda e precisa reativar a base de Ensino Médio com foco no formato e estilo exatos do vestibular, sem se perder em conteúdo irrelevante.

## Goals

- Praticar questões no estilo da prova, filtrando por matéria/assunto/dificuldade.
- Mostrar desempenho por matéria/assunto para focar nos pontos fracos (Exatas) e na **redação (vale 40% do escore)**.
- Tutor de IA que gera questões no **padrão Strix**, explica erros e corrige redação dissertativo-argumentativa.

## Tech Stack

**Core:**

- Framework: Next.js 16 (App Router)
- Language: TypeScript / React 19
- Database: PostgreSQL (Neon, serverless) + Drizzle ORM

**Key dependencies:** Tailwind CSS + shadcn/ui (sobre Base UI), Vercel AI SDK (`ai`) + provider Anthropic (Claude). **Sem login** (uso pessoal — AD-005). Hospedagem na Vercel.

## Scope

**v1 includes:**

- Banco de questões com filtros (matéria, assunto, dificuldade, fonte/ano) e modo de treino.
- Registro de tentativas e painel de desempenho por matéria/assunto.
- Tutor de IA: gerar questões no padrão Strix, explicar erros, corrigir redação.

**Explicitly out of scope (v1):**

- Login / multiusuário (1 usuária; sem autenticação — AD-005).
- App mobile nativo (web responsivo apenas).
- Pagamentos / planos.

## Constraints

- **Timeline:** Prova em **12/07/2026**. Decisão (AD-003): construir o sistema completo com calma, ciente de que **não fica pronto a tempo de julho** — serve para o longo prazo / próxima tentativa.
- **Technical:** Funções serverless da Vercel têm limite de tempo; o agente opera via streaming. Agente precisa de `ANTHROPIC_API_KEY`.
- **Resources:** Desenvolvimento solo. Custo de IA desprezível (1 usuária).

---

## Contexto do Vestibular (EBMSP / PROSEL 2026.2) — fonte da verdade

Confirmado pelo **Edital PROSEL 2026.2** (Processo Seletivo Presencial – 2ª Edição, área de saúde, inclui Psicologia). Banca: **Strix Educação**. A prova **não cobra conteúdo de Psicologia** — cobra **conhecimentos gerais de nível Ensino Médio**, com estilo próprio da banca (ver `features/tutor-ia/padrao-strix.md`).

**Datas e vagas (Psicologia):**

- Inscrições: 01/06 a 06/07/2026 (taxa R$40). **Prova: 12/07/2026**, Salvador, Campus Cabula (início 9h, duração 3h30). Resultado previsto: 16/07/2026.
- Psicologia: **5 vagas**, matutino, Campus Brotas, 10 semestres.

**Estrutura da prova (área de saúde / Psicologia):**

- **Prova de Conhecimentos Gerais Contemporâneos (PCGC):** **30 questões objetivas**, múltipla escolha, **5 alternativas (A–E)**, uma correta. (Sem questões discursivas; sem etapa vivencial — isso é só de Medicina.)
- **Prova de Redação:** texto **dissertativo-argumentativo** (0–10).

**Distribuição das 30 objetivas:**

| Matéria | Questões |
|---|---|
| Língua Portuguesa | 8 |
| Inglês | 4 |
| História | 3 |
| Geografia | 3 |
| Matemática | 3 |
| Biologia | 5 |
| Física | 2 |
| Química | 2 |

**Correção, eliminação e classificação:**

- Nota bruta objetiva = nº de acertos (0–30). **Eliminado se < 6/30.**
- Redação: 5 competências (0–2 cada; total 0–10), 2 corretores. **Eliminado se < 3/10.**
- **Escore Global** = [(NP_Redação × 4,0) + (NP_Objetiva × 6,0)] ÷ 100, onde NP = nota padronizada (média 500, ±100 por desvio-padrão). **Pesos: objetiva 6 / redação 4** → a redação vale **40%**. Desempate: maior nota na redação, depois na objetiva, depois maior idade.

> 💡 Implicações de estudo: a redação pesa muito (40%) e tem corte eliminatório baixo (3/10) — não pode zerar. Na objetiva, o corte é 6/30, mas a classificação é por escore padronizado, então **cada acerto conta**. Forças dela (Humanas/Linguagens = 12+6 = 18 das 30) e a redação são alavancas; risco em Exatas (Mat/Fís/Quím = 7 questões).
