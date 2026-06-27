"use client";

import { useState } from "react";
import { Check, Eye, RotateCcw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { rotuloMateria } from "@/lib/materias";
import type { Flashcard } from "@/db/schema";

export function SessaoFlashcards({
  flashcards: cards,
}: {
  flashcards: Flashcard[];
}) {
  const total = cards.length;
  const [restantes, setRestantes] = useState<Flashcard[]>(cards);
  const [virado, setVirado] = useState(false);

  const atual = restantes[0];
  const aprendidas = total - restantes.length;

  function sabia() {
    setVirado(false);
    setRestantes((r) => r.slice(1));
  }

  function naoSabia() {
    setVirado(false);
    // manda para o fim da fila para revisar de novo (mantém se for o último)
    setRestantes((r) => (r.length <= 1 ? r : [...r.slice(1), r[0]]));
  }

  function reiniciar() {
    setVirado(false);
    setRestantes(cards);
  }

  if (restantes.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border bg-card p-8 text-center ring-1 ring-foreground/10">
        <div className="text-4xl">🎉</div>
        <p className="font-medium">
          Você revisou todos os {total} conceitos!
        </p>
        <Button onClick={reiniciar} variant="outline">
          <RotateCcw /> Revisar de novo
        </Button>
      </div>
    );
  }

  const progresso = total ? Math.round((aprendidas / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          {aprendidas} de {total} dominados
        </span>
        <span className="text-muted-foreground">
          {restantes.length} na fila
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progresso}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => setVirado(true)}
        className={cn(
          "flex min-h-56 w-full flex-col items-center justify-center gap-4 rounded-xl border bg-card p-8 text-center ring-1 ring-foreground/10",
          !virado && "cursor-pointer hover:bg-muted/40",
        )}
      >
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
            {rotuloMateria(atual.materia)}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
            {atual.assunto}
          </span>
        </div>

        <p className="text-lg font-semibold whitespace-pre-line">
          {atual.frente}
        </p>

        {virado ? (
          <div
            key={atual.id}
            className="animate-flip border-t border-border pt-4 text-base leading-relaxed whitespace-pre-line text-foreground/90"
          >
            {atual.verso}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">
            Toque para ver a resposta
          </span>
        )}
      </button>

      {virado ? (
        <div className="flex items-center justify-center gap-2">
          <Button variant="destructive" size="lg" onClick={naoSabia}>
            <X /> Não sabia
          </Button>
          <Button
            size="lg"
            onClick={sabia}
            className="bg-green-600 text-white hover:bg-green-600/85"
          >
            <Check /> Sabia
          </Button>
        </div>
      ) : (
        <div className="flex justify-center">
          <Button size="lg" variant="outline" onClick={() => setVirado(true)}>
            <Eye /> Mostrar resposta
          </Button>
        </div>
      )}
    </div>
  );
}
