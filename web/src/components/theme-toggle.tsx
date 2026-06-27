"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Icon } from "@/components/ui/icon";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);

  const escuro = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={escuro ? "Mudar para tema claro" : "Mudar para tema escuro"}
      onClick={() => setTheme(escuro ? "light" : "dark")}
      className="fixed right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
    >
      {/* evita mismatch de hidratação: só decide o ícone após montar */}
      <Icon
        name={escuro ? "light_mode" : "dark_mode"}
        className={montado ? "" : "opacity-0"}
      />
    </button>
  );
}
