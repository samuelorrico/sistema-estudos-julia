// Gate de acesso simples (usuária única — não é multiusuário, ver AD-005).
// A senha real deve vir de APP_PASSCODE (defina em web/.env.local e na Vercel);
// o fallback existe só para o app funcionar sem configuração.
export const COOKIE_NAME = "juju_auth";
export const PASSCODE = process.env.APP_PASSCODE ?? "jujulinda123";
export const ERRO_SENHA = "você não é a juju linda 💔";
