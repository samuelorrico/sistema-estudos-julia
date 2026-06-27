import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { COOKIE_NAME, PASSCODE } from "@/lib/auth";

// Convenção do Next 16 (substitui o antigo `middleware`).
export function proxy(req: NextRequest) {
  const autenticada = req.cookies.get(COOKIE_NAME)?.value === PASSCODE;
  const naLogin = req.nextUrl.pathname === "/login";

  if (autenticada) {
    if (naLogin) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (naLogin) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  // protege todas as rotas, exceto assets do Next, favicon e arquivos estáticos
  matcher: ["/((?!_next|favicon.ico|.*\\.).*)"],
};
