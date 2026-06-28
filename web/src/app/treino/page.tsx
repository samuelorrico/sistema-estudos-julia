import Link from "next/link";

import { FiltroTreino } from "@/components/treino/filtro-treino";
import { SessaoTreino } from "@/components/treino/sessao-treino";
import {
  assuntosComContagem,
  contarQuestoes,
  fontesComContagem,
  listarQuestoes,
  materiasComContagem,
} from "@/db/queries";
import {
  ehDificuldade,
  ehMateria,
  type Dificuldade,
  type Materia,
} from "@/lib/materias";
import { temChaveIA } from "@/lib/agente";

// Depende de searchParams + ordenação aleatória → sempre dinâmica.
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function TreinoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const materia: Materia | undefined = ehMateria(sp.materia)
    ? sp.materia
    : undefined;
  const assunto =
    materia && typeof sp.assunto === "string" ? sp.assunto : undefined;
  const dificuldade: Dificuldade | undefined = ehDificuldade(sp.dificuldade)
    ? sp.dificuldade
    : undefined;
  const fonte = typeof sp.fonte === "string" ? sp.fonte : undefined;

  const filtro = { materia, assunto, dificuldade, fonte };

  const [materias, assuntos, fontes, total, questoes] = await Promise.all([
    materiasComContagem(),
    materia ? assuntosComContagem(materia) : Promise.resolve([]),
    fontesComContagem(),
    contarQuestoes(filtro),
    listarQuestoes({ ...filtro, limite: 30 }),
  ]);

  const chave = `${materia ?? ""}|${assunto ?? ""}|${dificuldade ?? ""}|${fonte ?? ""}`;

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Início
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Treino</h1>
        <p className="text-sm text-muted-foreground">
          Escolha matéria, assunto e dificuldade. O resultado aparece na hora,
          com a alternativa correta em verde.
        </p>
      </header>

      <FiltroTreino
        materias={materias}
        assuntos={assuntos}
        fontes={fontes}
        valores={filtro}
        total={total}
      />

      {questoes.length > 0 ? (
        <SessaoTreino key={chave} questoes={questoes} iaDisponivel={temChaveIA()} />
      ) : (
        <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground ring-1 ring-foreground/10">
          Nenhuma questão encontrada para esse filtro. Tente afrouxar os
          critérios ou peça novas questões ao tutor (em breve).
        </div>
      )}
    </main>
  );
}
