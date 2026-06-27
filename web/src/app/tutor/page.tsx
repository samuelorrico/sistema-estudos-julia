import Link from "next/link";

import { TutorGerador } from "@/components/tutor/tutor-gerador";
import { temChaveAnthropic } from "@/lib/agente";

export const dynamic = "force-dynamic";

export default function TutorPage() {
  const temChave = temChaveAnthropic();

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
          Gere questões inéditas no padrão da banca (Strix/EBMSP) quando o banco
          não bastar — gerais ou de uma matéria/assunto específico.
        </p>
      </header>

      {temChave ? (
        <TutorGerador />
      ) : (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-6 text-sm ring-1 ring-foreground/10">
          <p className="font-medium">🔑 Falta configurar a chave da Anthropic.</p>
          <p className="text-muted-foreground">
            Para o tutor funcionar, adicione sua chave da API da Anthropic ao
            arquivo <code className="rounded bg-muted px-1">web/.env.local</code>{" "}
            (não versionado) e reinicie o servidor:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs">
            ANTHROPIC_API_KEY=sk-ant-...
          </pre>
          <p className="text-muted-foreground">
            A chave fica só na sua máquina/deploy. Modelo usado:{" "}
            <code className="rounded bg-muted px-1">claude-opus-4-8</code>.
          </p>
        </div>
      )}
    </main>
  );
}
