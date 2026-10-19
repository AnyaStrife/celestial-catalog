import { z } from "zod";

export const CELESTIAL_TYPES = [
  "star",
  "planet",
  "galaxy",
  "nebula",
  "black_hole",
] as const;

// The rules that an object sent by the client must follow.
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

// The TypeScript type is automatically inferred from the schema
export type CelestialObjectInput = z.infer<typeof celestialObjectSchema>;
