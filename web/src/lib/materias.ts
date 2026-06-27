// Rótulos e tipos das matérias/dificuldades — seguro para client e server
// (sem importar o schema/Drizzle). A distribuição oficial vive em db/queries.

export const MATERIAS = [
  "portugues",
  "ingles",
  "historia",
  "geografia",
  "matematica",
  "biologia",
  "fisica",
  "quimica",
] as const;

export type Materia = (typeof MATERIAS)[number];

export const MATERIA_LABEL: Record<Materia, string> = {
  portugues: "Português",
  ingles: "Inglês",
  historia: "História",
  geografia: "Geografia",
  matematica: "Matemática",
  biologia: "Biologia",
  fisica: "Física",
  quimica: "Química",
};

export function rotuloMateria(m: string): string {
  return MATERIA_LABEL[m as Materia] ?? m;
}

export function ehMateria(v: unknown): v is Materia {
  return typeof v === "string" && (MATERIAS as readonly string[]).includes(v);
}

export const DIFICULDADES = ["facil", "media", "dificil"] as const;
export type Dificuldade = (typeof DIFICULDADES)[number];

export const DIFICULDADE_LABEL: Record<Dificuldade, string> = {
  facil: "Fácil",
  media: "Média",
  dificil: "Difícil",
};

export function ehDificuldade(v: unknown): v is Dificuldade {
  return typeof v === "string" && (DIFICULDADES as readonly string[]).includes(v);
}

// Letra da alternativa (A, B, C, ...) a partir do índice.
export function letraAlternativa(i: number): string {
  return String.fromCharCode(65 + i);
}

// --- Fonte/prova de origem ---
const FONTE_BANCA: Record<string, string> = {
  EBMSP: "EBMSP",
  BAHIANA: "Bahiana",
  UNIT: "UNIT",
  ZARNS: "ZARNS",
};
const FONTE_AREA: Record<string, string> = {
  SAUDE: "Área de Saúde",
  MED: "Medicina",
};

/** Rótulo amigável da fonte, ex.: "EBMSP_SAUDE_2025.1" → "EBMSP · Área de Saúde · 2025.1". */
export function rotuloFonte(fonte: string): string {
  if (fonte === "IA") return "Geradas por IA";
  const partes = fonte.split("_");
  const out: string[] = [];
  out.push(FONTE_BANCA[partes[0]] ?? partes[0] ?? fonte);
  if (partes[1] && FONTE_AREA[partes[1]]) out.push(FONTE_AREA[partes[1]]);
  const ano = partes[partes.length - 1];
  if (partes.length > 1 && /^\d{4}/.test(ano)) out.push(ano);
  return out.join(" · ");
}

/** A prova é do formato da prova da Juju (Área de Saúde, 30 q na distribuição oficial)? */
export function ehAreaSaude(fonte: string): boolean {
  return fonte.includes("_SAUDE_");
}
