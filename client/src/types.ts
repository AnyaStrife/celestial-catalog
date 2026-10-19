export const CELESTIAL_TYPES = [
  "star",
  "planet",
  "galaxy",
  "nebula",
  "black_hole",
] as const;
export type CelestialType = (typeof CELESTIAL_TYPES)[number];

export const TYPE_LABELS: Record<CelestialType, string> = {
  star: "Étoile",
  planet: "Planète",
  galaxy: "Galaxie",
  nebula: "Nébuleuse",
  black_hole: "Trou noir",
};

export type CelestialObject = {
  id: number;
  name: string;
  type: CelestialType;
  constellation: string | null;
  distanceLightYears: number;
  observed: boolean;
  createdAt: string;
};

export type CelestialObjectInput = Omit<CelestialObject, "id" | "createdAt">;
