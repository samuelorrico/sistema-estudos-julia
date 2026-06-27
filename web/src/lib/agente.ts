import "server-only";

import { anthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

import {
  gerarQuestoesCom,
  type PedidoGeracao,
  type QuestaoGerada,
} from "@/lib/geracao";

export { questaoGeradaSchema } from "@/lib/geracao";
export type { PedidoGeracao, QuestaoGerada } from "@/lib/geracao";

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

export function temChaveIA(): boolean {
  return resolverModelo() !== null;
}

export function provedorAtivo(): string | null {
  return resolverModelo()?.nome ?? null;
}

export async function gerarQuestoes(
  pedido: PedidoGeracao,
): Promise<QuestaoGerada[]> {
  const m = resolverModelo();
  if (!m) {
    throw new Error(
      "Nenhuma chave de IA configurada. Defina GOOGLE_GEMINI_API_KEY (grátis) ou ANTHROPIC_API_KEY em web/.env.local.",
    );
  }
  return gerarQuestoesCom(m.modelo, pedido);
}
