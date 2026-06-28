"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { zerarHistorico } from "@/actions/tentativas";

export function BotaoZerar() {
  const router = useRouter();
  const [pendente, startTransition] = useTransition();
  const [confirmando, setConfirmando] = useState(false);

  function zerar() {
    startTransition(async () => {
      await zerarHistorico();
      setConfirmando(false);
      router.refresh();
    });
  }

  if (!confirmando) {
    return (
      <Button variant="outline" onClick={() => setConfirmando(true)}>
        <Icon name="refresh" /> Zerar histórico
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">
        Apagar todas as tentativas? Não dá para desfazer.
      </span>
      <Button variant="outline" onClick={() => setConfirmando(false)} disabled={pendente}>
        Cancelar
      </Button>
      <Button
        onClick={zerar}
        disabled={pendente}
        className="bg-destructive text-white hover:bg-destructive/90"
      >
        {pendente ? <Icon name="progress_activity" className="animate-spin" /> : null}
        Sim, apagar
      </Button>
    </div>
  );
}
