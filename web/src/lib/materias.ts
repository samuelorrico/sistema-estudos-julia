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
