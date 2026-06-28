import Link from "next/link";

import { TutorGerador } from "@/components/tutor/tutor-gerador";
import { provedorAtivo, temChaveIA } from "@/lib/agente";
import { questoesParaPicker } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function TutorPage() {
  const temChave = temChaveIA();
  const provedor = provedorAtivo();
  const picker = temChave ? await questoesParaPicker() : [];

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Início
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Tutor de IA</h1>
        <p className="text-sm text-muted-foreground">
          Gere questões inéditas no padrão da banca (Strix/EBMSP): por
          matéria/assunto ou a partir de uma questão existente. Responda na hora
          para conferir o gabarito.
        </p>
        {temChave && provedor && (
          <p className="text-xs text-muted-foreground">Usando: {provedor}</p>
        )}
      </header>

      {temChave ? (
        <TutorGerador questoes={picker} />
      ) : (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-6 text-sm ring-1 ring-foreground/10">
          <p className="font-medium">
            🔑 Configure uma chave de IA para gerar questões.
          </p>
          <p className="text-muted-foreground">
            <strong className="text-foreground">Grátis (recomendado):</strong>{" "}
            crie uma chave no Google AI Studio (
            <code className="rounded bg-muted px-1">aistudio.google.com</code>) e
            adicione em{" "}
            <code className="rounded bg-muted px-1">web/.env.local</code> + na
            Vercel:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
            GOOGLE_GENERATIVE_AI_API_KEY=...
          </pre>
          <p className="text-muted-foreground">
            Ou, se preferir o Claude (pago):
          </p>
          <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
            ANTHROPIC_API_KEY=sk-ant-...
          </pre>
          <p className="text-muted-foreground">
            Depois reinicie o servidor (local) ou faça o redeploy (Vercel). A
            chave fica só na sua máquina/deploy.
          </p>
        </div>
      )}
    </main>
  );
}
