import { z } from "zod";

export const CELESTIAL_TYPES = [
  "star",
  "planet",
  "galaxy",
  "nebula",
  "black_hole",
] as const;

// Les règles que doit respecter un objet envoyé par le client.
export const celestialObjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom est obligatoire")
    .max(100, "100 caractères maximum"),
  type: z.enum(CELESTIAL_TYPES),
  constellation: z.string().trim().max(100).nullable().optional(),
  distanceLightYears: z.number().nonnegative("La distance doit être positive"),
  observed: z.boolean().default(false),
});

// Le type TypeScript est déduit automatiquement du schéma : une seule source de vérité.
export type CelestialObjectInput = z.infer<typeof celestialObjectSchema>;
