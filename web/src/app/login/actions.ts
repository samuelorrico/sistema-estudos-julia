"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { COOKIE_NAME, ERRO_SENHA, PASSCODE } from "@/lib/auth";

export type LoginState = { erro?: string };

export async function entrar(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const senha = String(formData.get("senha") ?? "");

  if (senha !== PASSCODE) {
    return { erro: ERRO_SENHA };
  }

  const jar = await cookies();
  jar.set(COOKIE_NAME, PASSCODE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 180, // ~6 meses
  });

  redirect("/");
}
