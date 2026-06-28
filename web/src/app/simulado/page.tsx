import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { SessaoSimulado } from "@/components/simulado/sessao-simulado";
import {
  fontesComContagem,
  montarSimulado,
  questoesPorFonte,
} from "@/db/queries";
import { ehAreaSaude, rotuloFonte } from "@/lib/materias";
import { temChaveIA } from "@/lib/agente";

// Cada acesso monta/escolhe um simulado → sempre dinâmica.
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SimuladoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const fonte = typeof sp.fonte === "string" ? sp.fonte : undefined;
  const sorteado = sp.modo === "sorteio";

  // --- Tela de seleção: escolher qual prova fazer ---
  if (!fonte && !sorteado) {
    const fontes = await fontesComContagem();
    const saude = fontes.filter((f) => ehAreaSaude(f.fonte));
    const outras = fontes.filter(
      (f) => !ehAreaSaude(f.fonte) && f.fonte !== "IA",
    );

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
            Escolha qual prova fazer. Sem feedback durante — gabarito e revisão
            só no final.
          </p>
        </header>

        <Link
          href={{ pathname: "/simulado", query: { modo: "sorteio" } }}
          className="flex items-center gap-3 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 transition-colors hover:bg-muted"
        >
          <Icon name="shuffle" className="text-[22px] text-primary" />
          <div className="flex flex-col">
            <span className="font-medium">Simulado sorteado</span>
            <span className="text-sm text-muted-foreground">
              30 questões sorteadas de todo o banco, na distribuição oficial
              (Port 8 · Ing 4 · Hist 3 · Geo 3 · Mat 3 · Bio 5 · Fís 2 · Quí 2).
            </span>
          </div>
        </Link>

        {saude.length > 0 && (
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Provas no formato da sua prova (Área de Saúde)
            </h2>
            <div className="flex flex-col gap-2">
              {saude.map((f) => (
                <ProvaCard key={f.fonte} fonte={f.fonte} total={f.total} />
              ))}
            </div>
          </section>
        )}

        {outras.length > 0 && (
          <section className="flex flex-col gap-2">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Outras provas (Medicina) — para treinar com mais questões
            </h2>
            <div className="flex flex-col gap-2">
              {outras.map((f) => (
                <ProvaCard key={f.fonte} fonte={f.fonte} total={f.total} />
              ))}
            </div>
          </section>
        )}
      </main>
    );
  }

  // --- Sessão de simulado ---
  const questoes = fonte ? await questoesPorFonte(fonte) : await montarSimulado();
  const titulo = fonte ? rotuloFonte(fonte) : "Simulado sorteado";
  const descricao = fonte
    ? `${questoes.length} questões da prova, na ordem original.`
    : `${questoes.length} questões na distribuição oficial da prova (Português 8 · Inglês 4 · História 3 · Geografia 3 · Matemática 3 · Biologia 5 · Física 2 · Química 2).`;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <Link
          href="/simulado"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Escolher outra prova
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">{titulo}</h1>
        <p className="text-sm text-muted-foreground">
          {descricao} Sem feedback durante — gabarito e revisão só no final.
        </p>
      </header>

      {questoes.length > 0 ? (
        <SessaoSimulado questoes={questoes} iaDisponivel={temChaveIA()} />
      ) : (
        <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground ring-1 ring-foreground/10">
          Não há questões suficientes no banco para montar o simulado.
        </div>
      )}
    </main>
  );
}

function ProvaCard({ fonte, total }: { fonte: string; total: number }) {
  return (
    <Link
      href={{ pathname: "/simulado", query: { fonte } }}
      className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 transition-colors hover:bg-muted"
    >
      <div className="flex flex-col">
        <span className="font-medium">{rotuloFonte(fonte)}</span>
        <span className="text-sm text-muted-foreground">
          {total} {total === 1 ? "questão" : "questões"}
        </span>
      </div>
      <Icon name="chevron_right" className="text-muted-foreground" />
    </Link>
  );
}
