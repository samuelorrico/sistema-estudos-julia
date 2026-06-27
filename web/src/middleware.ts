import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { COOKIE_NAME, PASSCODE } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const autenticada = req.cookies.get(COOKIE_NAME)?.value === PASSCODE;
  const naLogin = req.nextUrl.pathname === "/login";

  if (autenticada) {
    // já entrou: não faz sentido ver o login de novo
    if (naLogin) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (naLogin) return NextResponse.next();
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  // protege todas as rotas, exceto assets do Next, favicon e arquivos estáticos
  // (que contêm ponto, ex.: /questoes/...png — as figuras das questões)
  matcher: ["/((?!_next|favicon.ico|.*\\.).*)"],
};
