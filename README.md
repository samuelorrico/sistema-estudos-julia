# Mapa de Estudos da Juju 📚💗

Aplicação web de estudo focada no vestibular de **Psicologia da EBMSP** (processo seletivo PROSEF/PROSEL, banca **Strix Educação**). Treina no **formato exato da prova** — provas reais da banca etiquetadas por matéria/assunto/dificuldade — com três modos de estudo, painel de desempenho e um tutor de IA.

> **Status:** 🟢 Em produção (uso pessoal). App completo: 3 modos de estudo, gate de senha, painel de desempenho e tutor de IA.

---

## 🎯 Objetivo

A EBMSP seleciona Psicologia por uma prova de **30 questões objetivas + redação**, de conhecimentos gerais de Ensino Médio, com **estilo próprio** da banca (cada questão parte de um estímulo — texto, charge, dado — seguido de um comando). A distribuição oficial é:

> Português **8** · Inglês **4** · História **3** · Geografia **3** · Matemática **3** · Biologia **5** · Física **2** · Química **2**

O app monta um ambiente de treino fiel a esse formato (e não a questões genéricas de ENEM).

---

## ✨ Funcionalidades

- **🎯 Treino** — questões filtradas por matéria, assunto, dificuldade **e prova**, com correção e feedback na hora (verde/vermelho, com animação que respeita `prefers-reduced-motion`).
- **📝 Simulado** — escolha uma **prova real inteira** (na ordem original) ou um **simulado sorteado** na distribuição oficial; gabarito e revisão só no final, com corte eliminatório proporcional.
- **⚡ Flashcards** — revisão rápida de conceitos (vire o card e marque o que já sabe).
- **📊 Desempenho** — registra cada tentativa e mostra acertos por matéria, assuntos a reforçar e dias de estudo; com botão de **zerar histórico**.
- **🤖 Tutor de IA** — gera questões inéditas no padrão da banca (por **assunto** ou **a partir de uma questão existente**) e, ao errar uma questão, gera uma **explicação sob demanda** (“Dúvidas? Gerar explicação”). Detecta automaticamente o provedor: **Google Gemini** (grátis) ou **Claude** (Anthropic).
- **🔒 Gate de senha** — acesso protegido por uma senha simples (app de usuária única).
- **🌗 Tema claro/escuro** — visual no estilo Google (Material Symbols + Roboto).

---

## 🧱 Stack & dependências

**Plataforma:** Next.js 16 (App Router, Turbopack, rotas tipadas) · React 19 · TypeScript 5 · Deploy na **Vercel** · PostgreSQL no **Neon**.

### Dependências de produção

| Pacote | Versão | Para quê |
| --- | --- | --- |
| `next` | 16.2.9 | Framework (App Router, Server Components, Server Actions) |
| `react` / `react-dom` | 19.2.4 | Biblioteca de UI |
| `drizzle-orm` | ^0.45.2 | ORM TypeScript-first |
| `@neondatabase/serverless` | ^1.1.0 | Driver Postgres (Neon) sobre HTTP/WebSocket |
| `ai` | ^7.0.3 | Vercel AI SDK (geração estruturada / texto) |
| `@ai-sdk/google` | ^4.0.1 | Provedor Google Gemini (padrão, grátis) |
| `@ai-sdk/anthropic` | ^4.0.0 | Provedor Claude (Anthropic) |
| `zod` | ^4.4.3 | Validação / schema da saída estruturada da IA |
| `@vercel/blob` | ^2.5.0 | Hospedagem das figuras das questões |
| `@base-ui/react` | ^1.6.0 | Primitivos de UI acessíveis (base do shadcn) |
| `shadcn` | ^4.12.0 | Componentes de UI |
| `class-variance-authority` | ^0.7.1 | Variantes de classes (botões etc.) |
| `clsx` | ^2.1.1 | Composição condicional de classes |
| `tailwind-merge` | ^3.6.0 | Resolve conflitos de classes Tailwind |
| `tw-animate-css` | ^1.4.0 | Utilitários de animação |
| `next-themes` | ^0.4.6 | Alternância de tema claro/escuro |
| `lucide-react` | ^1.21.0 | Ícones (complementares aos Material Symbols) |
| `server-only` | ^0.0.1 | Garante que módulos sensíveis fiquem no servidor |

### Dependências de desenvolvimento

| Pacote | Versão | Para quê |
| --- | --- | --- |
| `typescript` | ^5 | Tipagem estática |
| `tailwindcss` / `@tailwindcss/postcss` | ^4 | CSS utilitário (Tailwind v4) |
| `drizzle-kit` | ^0.31.10 | Migrações e introspecção do schema |
| `tsx` | ^4.22.4 | Executa os scripts TS (seed, upload) |
| `dotenv` | ^17.4.2 | Carrega `.env.local` nos scripts CLI |
| `eslint` / `eslint-config-next` | ^9 / 16.2.9 | Lint |
| `@types/node`, `@types/react`, `@types/react-dom` | — | Tipos |

> Ferramentas externas usadas na **extração das provas** (fora do app, não versionadas): **Python 3** + **PyMuPDF (fitz)** — ver `provas-fonte/extracao/` (ignorado pelo Git).

---

## 🚀 Versão demonstrativa (rodar a partir de um clone)

As **provas reais** da banca são protegidas por direitos autorais e **não ficam no repositório** (ver [`.gitignore`](.gitignore)). Para que qualquer pessoa possa rodar uma versão funcional, o projeto traz um **conjunto de questões de exemplo originais** (`fonte: DEMO`, escritas para este projeto).

```bash
git clone https://github.com/samuelorrico/sistema-estudos-julia.git
cd sistema-estudos-julia/web
npm install

# configure o ambiente (use SEU banco — Neon grátis serve)
cp .env.example .env.local   # e preencha DATABASE_URL e APP_PASSCODE

npm run db:migrate           # cria as tabelas
npm run db:seed:demo         # popula com as questões DEMO + flashcards
npm run dev                  # http://localhost:3000
```

> A demo é **isolada**: usa `fonte="DEMO"` e um banco seu — não inclui as provas reais nem interfere no ambiente de produção/uso real. O tutor de IA aparece se você configurar uma chave (Gemini é grátis).

---

## ⚙️ Configuração (variáveis de ambiente)

Crie `web/.env.local` com:

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `DATABASE_URL` | ✅ | String de conexão PostgreSQL (Neon). |
| `APP_PASSCODE` | ✅ | Senha de acesso ao app (gate de login). |
| `NEXT_PUBLIC_BLOB_BASE` | para figuras | URL base pública do Vercel Blob (em produção). |
| `BLOB_READ_WRITE_TOKEN` | para upload | Token do Vercel Blob (usado por `blob:upload`). |
| `GOOGLE_GEMINI_API_KEY` *(ou `GOOGLE_GENERATIVE_AI_API_KEY`)* | para o tutor | Chave do Google AI Studio (grátis). |
| `ANTHROPIC_API_KEY` | alternativa ao tutor | Usa Claude em vez do Gemini, se preferir. |

> Na demo, só `DATABASE_URL` e `APP_PASSCODE` são necessárias. As figuras só existem nas provas reais; a demo é textual.

---

## 📜 Scripts (`web/`)

| Script | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (Turbopack). |
| `npm run build` / `npm start` | Build de produção / iniciar. |
| `npm run lint` | ESLint. |
| `npm run db:generate` | Gera migração a partir do schema. |
| `npm run db:migrate` | Aplica as migrações no banco. |
| `npm run db:studio` | Drizzle Studio (inspeção do banco). |
| `npm run db:seed` | Semeia as **provas reais** (de `src/data/questoes/*.json`, fora do repo). |
| `npm run db:seed:demo` | Semeia as **questões DEMO** + flashcards (para clone/showcase). |
| `npm run blob:upload` | Envia as figuras para o Vercel Blob. |

---

## 🗂️ Estrutura do repositório

```text
.specs/                      → documentação spec-driven (visão, roadmap, decisões, specs)
provas-fonte/                → PDFs e scripts de extração (IGNORADO pelo Git — material protegido)
web/
  drizzle/                   → migrações SQL
  scripts/                   → seed de demo, upload de figuras
  src/
    app/                     → rotas (treino, simulado, flashcards, tutor, desempenho, login)
    actions/                 → server actions (tentativas, explicação por IA)
    components/              → UI (questão, treino, simulado, flashcards, tutor, desempenho)
    data/
      demo-questoes.ts       → questões de DEMONSTRAÇÃO (versionadas)
      flashcards.ts          → flashcards de curadoria (versionados)
      questoes/              → provas reais em JSON (IGNORADO pelo Git)
    db/                      → schema, conexão, queries e seed (Drizzle)
    lib/                     → matérias, auth, agente/geração de IA
```

---

## 🧠 Arquitetura (resumo)

- **Server Components** buscam dados direto no Postgres (Drizzle) por requisição; páginas dinâmicas (`force-dynamic`) por dependerem de filtros/sorteio.
- **Server Actions** registram tentativas (Treino/Simulado), zeram o histórico e chamam a IA (explicação e geração) — sem expor chaves ao cliente.
- **Conexão lazy** ao banco (Proxy): a `DATABASE_URL` só é exigida em tempo de requisição, não no build (Vercel).
- **Gate de acesso** via `proxy.ts` (convenção do Next 16) + cookie de senha.
- **Provedor de IA** auto-detectado em `lib/agente.ts` (Gemini grátis por padrão; Claude se a chave estiver presente).

---

## 📚 Documentação (spec-driven)

Todo o planejamento vive em [`.specs/`](.specs/):

- [`project/PROJECT.md`](.specs/project/PROJECT.md) — visão, escopo e contexto do vestibular
- [`project/ROADMAP.md`](.specs/project/ROADMAP.md) — milestones e features
- [`project/STATE.md`](.specs/project/STATE.md) — decisões, blockers e memória entre sessões
- [`features/`](.specs/features/) — specs por feature

---

## ⚖️ Conteúdo e licença

As **provas reais** da EBMSP/Strix são de seus detentores de direitos e **não** são distribuídas neste repositório. As questões `DEMO` e os flashcards são conteúdo **original** criado para o projeto. Código de uso pessoal/educacional.
