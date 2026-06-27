import Link from "next/link";

import { FiltroFlashcards } from "@/components/flashcards/filtro-flashcards";
import { SessaoFlashcards } from "@/components/flashcards/sessao-flashcards";
import {
  assuntosFlashcards,
  listarFlashcards,
  materiasFlashcards,
} from "@/db/queries";
import { ehMateria, type Materia } from "@/lib/materias";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function FlashcardsPage({
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

  const [materias, assuntos, cards] = await Promise.all([
    materiasFlashcards(),
    materia ? assuntosFlashcards(materia) : Promise.resolve([]),
    listarFlashcards({ materia, assunto, limite: 60 }),
  ]);

  const chave = `${materia ?? ""}|${assunto ?? ""}`;

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-10">
      <header className="flex flex-col gap-1">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Início
        </Link>
        <h1 className="mt-1 text-2xl font-bold tracking-tight">Flashcards</h1>
        <p className="text-sm text-muted-foreground">
          Revise conceitos: veja a pergunta, vire o card e marque se sabia. As
          que você não sabia voltam para o fim da fila.
        </p>
      </header>

      <FiltroFlashcards
        materias={materias}
        assuntos={assuntos}
        valores={{ materia, assunto }}
        total={cards.length}
      />

      {cards.length > 0 ? (
        <SessaoFlashcards key={chave} flashcards={cards} />
      ) : (
        <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground ring-1 ring-foreground/10">
          Ainda não há flashcards para esse filtro. Em breve o tutor de IA
          poderá gerar conceitos sob demanda.
        </div>
      )}
    </main>
  );
}
