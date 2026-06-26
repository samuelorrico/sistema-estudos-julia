# Mapa de Estudos da Juju

**Vision:** Sistema web que guia a Juju a estudar da forma mais eficiente para o vestibular de Psicologia da EBMSP, com banco de questões filtrável, acompanhamento de desempenho e um tutor de IA personalizado.
**For:** A Juju (estudante de Psicologia, 3º semestre na UEMG, voltando a Salvador) e, futuramente, outros vestibulandos da EBMSP/PROSEF.
**Solves:** Ela não estudou nada ainda e precisa reativar a base de Ensino Médio com foco no formato e estilo exatos do vestibular, sem se perder em conteúdo irrelevante.

## Goals

- Permitir que ela pratique questões no estilo da prova filtrando por matéria/assunto/dificuldade.
- Mostrar desempenho por matéria/assunto para concentrar o tempo nos pontos fracos (priorizar Exatas e a redação ≥600).
- Oferecer um tutor de IA que explique erros, gere questões e corrija redação dissertativo-argumentativa.

## Tech Stack

**Core:**

- Framework: Next.js (App Router) — última versão estável
- Language: TypeScript
- Database: PostgreSQL (Neon, serverless)

**Key dependencies:** Drizzle ORM, Auth.js (NextAuth), Tailwind CSS + shadcn/ui, Vercel AI SDK (`ai`) + provider Anthropic (Claude). Hospedagem na Vercel.

## Scope

**v1 includes:**

- Banco de questões com filtros (matéria, assunto, dificuldade, fonte/ano) e modo de treino.
- Registro de tentativas e painel de desempenho por matéria/assunto.
- Tutor de IA: explicar erros, gerar questões por assunto, corrigir redação.

**Explicitly out of scope (v1):**

- Multiusuário / turmas (foco em 1 usuária; auth simples).
- App mobile nativo (web responsivo apenas).
- Pagamentos / planos.

## Constraints

- **Timeline:** A prova é em **12/07/2026** (≈16 dias após o início). Decisão registrada (AD-003): construir o **sistema completo com calma**, ciente de que **não fica pronto a tempo da prova de julho** — serve para o longo prazo / próxima tentativa. O estudo imediato dela é prioridade fora do sistema.
- **Technical:** Funções serverless da Vercel têm limite de tempo; o agente de IA opera via streaming.
- **Resources:** Desenvolvimento solo. Custo de IA desprezível (1 usuária).

---

## Contexto do Vestibular (EBMSP / PROSEF) — fonte da verdade

O vestibular dos cursos não-Medicina da EBMSP chama-se **PROSEF (Processo Seletivo Formativo)**. **Não cobra conteúdo de Psicologia** — cobra **conhecimentos gerais de nível Ensino Médio**, mas com **estilo/"modelo de cobrança" próprio da banca**, um pouco diferente do ENEM. Por isso o banco usa como **fonte primária os 3 últimos PROSEFs de Psicologia** (provas reais, via formulário da EBMSP em materiais.bahiana.edu.br/provas-psicologia) e **complementa com ENEM/equivalentes** só onde faltar volume (AD-002 revisada). O usuário não dispõe de outras provas antigas além dessas 3.

**Estrutura da prova de Psicologia:**

- Etapa Vivencial (interativa/vocacional — pouco "estudável").
- Prova objetiva: **30 questões** de múltipla escolha (conhecimentos gerais).
- **5 questões discursivas** transdisciplinares.
- Redação dissertativo-argumentativa.

**Matérias da objetiva (modelo ENEM):** Linguagens (Português, Inglês), Ciências Humanas (História, Geografia), Ciências da Natureza (Biologia, Física, Química), Matemática.

**Aprovação (Psicologia):** conhecimentos gerais **≥ 500**; redação **≥ 600** (barra mais alta). Também há ingresso por nota do ENEM com os mesmos cortes.

> ⚠️ Os **pesos exatos, duração e distribuição por matéria** estão só no **edital oficial em PDF do processo 2026.2** (ainda não localizado online). Pedir o PDF ao usuário para calibrar. Ver blocker B-001 em STATE.md.
