import Link from "next/link";

import { SessaoSimulado } from "@/components/simulado/sessao-simulado";
import { montarSimulado } from "@/db/queries";

// Cada acesso monta um novo simulado (sorteio) → sempre dinâmica.
export const dynamic = "force-dynamic";

export default async function SimuladoPage() {
  const questoes = await montarSimulado();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Início
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Simulado</h1>
        <p className="text-sm text-muted-foreground">
          {questoes.length} questões na distribuição oficial da prova
          (Português 8 · Inglês 4 · História 3 · Geografia 3 · Matemática 3 ·
          Biologia 5 · Física 2 · Química 2). Sem feedback durante — gabarito e
          revisão só no final.
        </p>
      </header>

      {questoes.length > 0 ? (
        <SessaoSimulado questoes={questoes} />
      ) : (
        <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground ring-1 ring-foreground/10">
          Não há questões suficientes no banco para montar o simulado.
        </div>
      )}
    </main>
  );
}
