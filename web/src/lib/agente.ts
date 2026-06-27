import "server-only";

import { anthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

import {
  DIFICULDADES,
  MATERIAS,
  rotuloMateria,
  type Dificuldade,
  type Materia,
} from "@/lib/materias";

// Provider de IA: usa o Gemini (grátis) se a chave do Google existir; senão,
// o Claude. Dá pra começar de graça e trocar só adicionando a outra chave.
function resolverModelo() {
  // aceita o nome padrão do SDK e o alias GOOGLE_GEMINI_API_KEY
  const googleKey =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GOOGLE_GEMINI_API_KEY;
  if (googleKey) {
    const gemini = createGoogleGenerativeAI({ apiKey: googleKey });
    return {
      modelo: gemini("gemini-2.5-flash"),
      nome: "Gemini 2.5 Flash (grátis)",
    };
  }
  if (process.env.ANTHROPIC_API_KEY) {
    return { modelo: anthropic("claude-opus-4-8"), nome: "Claude Opus 4.8" };
  }
  return null;
}

const alternativaSchema = z.object({
  id: z.enum(["A", "B", "C", "D", "E"]),
  texto: z.string().min(1),
});

export const questaoGeradaSchema = z.object({
  materia: z.enum(MATERIAS),
  assunto: z.string().min(2),
  dificuldade: z.enum(DIFICULDADES),
  // Estímulo/base (texto, citação, dados). null quando a questão dispensa.
  textoApoio: z.string().nullable(),
  enunciado: z.string().min(10),
  alternativas: z.array(alternativaSchema).length(5),
  gabarito: z.enum(["A", "B", "C", "D", "E"]),
  explicacao: z.string().min(10),
});

export type QuestaoGerada = z.infer<typeof questaoGeradaSchema>;

// Proporção oficial da prova (PROSEL 2026.2) para pedidos "gerais".
const PROPORCAO = "Português 8 · Inglês 4 · História 3 · Geografia 3 · Matemática 3 · Biologia 5 · Física 2 · Química 2";

const SISTEMA = `Você é um elaborador de questões da banca Strix Educação, que faz o vestibular da EBMSP (Escola Bahiana de Medicina e Saúde Pública). Você gera questões da Prova de Conhecimentos Gerais Contemporâneos (PCGC) — objetivas, de nível Ensino Médio, no estilo EXATO dessa banca.

ESTILO DA BANCA (siga rigorosamente):
- Cada questão parte de um ESTÍMULO contextual (textoApoio): um texto curto, citação, fragmento literário, notícia, dado ou situação — quase sempre ligado a temas contemporâneos (saúde, meio ambiente, ciência, sociedade, tecnologia). Em questões puramente matemáticas/objetivas o estímulo pode ser um enunciado-problema; use null em textoApoio só quando não houver base separada.
- Depois vem um COMANDO claro (enunciado): "é correto afirmar", "é correto o que se afirma em", "com base no texto...", etc.
- Exatamente 5 alternativas (A, B, C, D, E), com UMA única correta.
- Os DISTRATORES são plausíveis e bem construídos: refletem erros conceituais comuns, leituras parciais ou trocas sutis — nunca absurdos óbvios. Alternativas longas e elaboradas são típicas da banca.
- A explicacao é didática: diz por que a correta está certa e, quando útil, por que as erradas estão erradas.

ESTILO POR MATÉRIA:
- portugues: interpretação de texto OU análise linguística (coesão, funções da linguagem, classes gramaticais, figuras, sintaxe), a partir do estímulo.
- ingles: o estímulo e TODAS as alternativas em INGLÊS; cobre interpretação, vocabulário ou gramática (tempos verbais, comparativos, modais).
- historia / geografia: temas contextualizados e atuais, conectando conteúdo de Ensino Médio ao estímulo (processos históricos, geopolítica, clima, urbanização, economia).
- matematica / fisica / quimica: problema aplicado com dados numéricos; a correta deve ser de fato calculável e correta; distratores = resultados de erros típicos.
- biologia: fisiologia, genética, ecologia, evolução, citologia — conectada a saúde/ambiente.

REGRAS:
- Português do Brasil (exceto o conteúdo de Inglês).
- Conteúdo factualmente correto; o gabarito DEVE corresponder a uma alternativa de fato correta.
- Não use imagens (apenas texto). Não copie questões reais existentes — crie inéditas no mesmo padrão.
- "assunto" deve ser específico (ex.: "Genética (herança ligada ao sexo)", "Funções da linguagem", "Hidrostática").`;

export function temChaveIA(): boolean {
  return resolverModelo() !== null;
}

export function provedorAtivo(): string | null {
  return resolverModelo()?.nome ?? null;
}

export type PedidoGeracao = {
  materia?: Materia;
  assunto?: string;
  dificuldade?: Dificuldade;
  quantidade: number;
};

export async function gerarQuestoes(
  pedido: PedidoGeracao,
): Promise<QuestaoGerada[]> {
  const m = resolverModelo();
  if (!m) {
    throw new Error(
      "Nenhuma chave de IA configurada. Defina GOOGLE_GENERATIVE_AI_API_KEY (grátis) ou ANTHROPIC_API_KEY em web/.env.local.",
    );
  }

  const { materia, assunto, dificuldade, quantidade } = pedido;
  const partes: string[] = [`Gere ${quantidade} questão(ões) inédita(s).`];

  if (materia) {
    partes.push(`Matéria: ${rotuloMateria(materia)} (campo "materia" = "${materia}").`);
    if (assunto) partes.push(`Assunto/foco: ${assunto}.`);
  } else {
    partes.push(
      `Questões GERAIS, variando as matérias e respeitando a proporção da prova (${PROPORCAO}).`,
    );
  }

  if (dificuldade) {
    partes.push(`Dificuldade: ${dificuldade}.`);
  } else {
    partes.push("Varie a dificuldade entre fácil, média e difícil.");
  }

  const { object } = await generateObject({
    model: m.modelo,
    schema: z.object({ questoes: z.array(questaoGeradaSchema) }),
    system: SISTEMA,
    prompt: partes.join(" "),
    temperature: 0.8,
  });

  return object.questoes;
}
