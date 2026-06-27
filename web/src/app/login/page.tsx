"use client";

import { useActionState } from "react";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { entrar, type LoginState } from "./actions";

const inicial: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pendente] = useActionState<LoginState, FormData>(
    entrar,
    inicial,
  );

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border bg-card p-8 text-center ring-1 ring-foreground/10">
        <div className="flex size-14 items-center justify-center rounded-full bg-secondary">
          <Icon name="favorite" filled className="text-[32px] text-rose-500" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tight">
            Mapa de Estudos da Juju
          </h1>
          <p className="text-sm text-muted-foreground">
            Área da Juju 💛 — digite a senha para entrar.
          </p>
        </div>

        <form action={formAction} className="flex w-full flex-col gap-3">
          <input
            name="senha"
            type="password"
            autoFocus
            autoComplete="current-password"
            placeholder="Senha"
            aria-invalid={!!state.erro}
            className="h-10 rounded-lg border border-border bg-background px-3 text-center text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
          />
          <Button type="submit" size="lg" disabled={pendente}>
            {pendente ? (
              <Icon name="progress_activity" className="animate-spin" />
            ) : null}
            Entrar
          </Button>
          {state.erro && (
            <p className="animate-erro text-sm font-medium text-destructive">
              {state.erro}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
