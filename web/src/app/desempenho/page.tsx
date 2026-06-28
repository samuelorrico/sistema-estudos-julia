import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BotaoZerar } from "@/components/desempenho/botao-zerar";
import { cn } from "@/lib/utils";
import {
  desempenhoPorMateria,
  pontosFracos,
  resumoDesempenho,
} from "@/db/queries";

export const dynamic = "force-dynamic";

function pct(acertos: number, total: number): number {
  return total ? Math.round((acertos / total) * 100) : 0;
}

// Cor da barra/percentual conforme o aproveitamento.
function corPct(p: number): { barra: string; texto: string } {
  if (p < 50)
    return { barra: "bg-red-500", texto: "text-red-600 dark:text-red-400" };
  if (p < 75)
    return { barra: "bg-amber-500", texto: "text-amber-600 dark:text-amber-400" };
  return { barra: "bg-green-500", texto: "text-green-600 dark:text-green-400" };
}

export default async function DesempenhoPage() {
  const [resumo, porMateria, fracos] = await Promise.all([
    resumoDesempenho(),
    desempenhoPorMateria(),
    pontosFracos(),
  ]);

  const pctGeral = pct(resumo.acertos, resumo.total);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          ← Início
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Desempenho</h1>
        <p className="text-sm text-muted-foreground">
          Seus acertos por matéria e os assuntos para reforçar.
        </p>
      </header>

      {resumo.total === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-8 text-center ring-1 ring-foreground/10">
          <p className="text-muted-foreground">
            Ainda não há respostas registradas. Faça um treino ou um simulado
            que os números aparecem aqui.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/treino" className={buttonVariants()}>
              Ir para o Treino
            </Link>
            <Link
              href="/simulado"
              className={buttonVariants({ variant: "outline" })}
            >
              Fazer um Simulado
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Resumo */}
          <section className="grid grid-cols-3 gap-3">
            <Stat valor={resumo.total} rotulo="respondidas" />
            <Stat
              valor={`${pctGeral}%`}
              rotulo="de acerto"
              className={corPct(pctGeral).texto}
            />
            <Stat
              valor={resumo.dias}
              rotulo={resumo.dias === 1 ? "dia de estudo" : "dias de estudo"}
            />
          </section>

          {/* Por matéria */}
          <section className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-muted-foreground">
              Acertos por matéria
            </h2>
            <div className="flex flex-col gap-3 rounded-xl border bg-card p-5 ring-1 ring-foreground/10">
              {porMateria.map((m) => {
                const p = pct(m.acertos, m.total);
                const cor = corPct(p);
                return (
                  <div key={m.materia} className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="font-medium">{m.rotulo}</span>
                      <span className="text-muted-foreground">
                        {m.acertos}/{m.total}{" "}
                        <span className={cn("font-semibold", cor.texto)}>
                          ({p}%)
                        </span>
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={cn("h-full rounded-full", cor.barra)}
                        style={{ width: `${p}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pontos a reforçar */}
          {fracos.length > 0 && (
            <section className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-muted-foreground">
                Assuntos para reforçar
              </h2>
              <ul className="flex flex-col divide-y rounded-xl border bg-card ring-1 ring-foreground/10">
                {fracos.map((f) => {
                  const p = pct(f.acertos, f.total);
                  return (
                    <li
                      key={`${f.materia}-${f.assunto}`}
                      className="flex items-center justify-between gap-3 px-5 py-3 text-sm"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{f.assunto}</span>
                        <span className="text-xs text-muted-foreground">
                          {f.rotulo}
                        </span>
                      </div>
                      <span className="text-muted-foreground">
                        {f.acertos}/{f.total}{" "}
                        <span className={cn("font-semibold", corPct(p).texto)}>
                          ({p}%)
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-xs text-muted-foreground">
                Dica: filtre o Treino por esses assuntos para praticar onde mais
                erra.
              </p>
            </section>
          )}

          <div className="mt-2 flex justify-end">
            <BotaoZerar />
          </div>
        </>
      )}
    </main>
  );
}

function Stat({
  valor,
  rotulo,
  className,
}: {
  valor: number | string;
  rotulo: string;
  className?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border bg-card p-4 text-center ring-1 ring-foreground/10">
      <span
        className={cn(
          "text-3xl font-bold tracking-tight tabular-nums",
          className,
        )}
      >
        {valor}
      </span>
      <span className="text-xs text-muted-foreground">{rotulo}</span>
    </div>
  );
}
