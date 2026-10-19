import type { CelestialObject } from "../types";

export const betelgeuse: CelestialObject = {
  id: 1,
  name: "Bételgeuse",
  type: "star",
  constellation: "Orion",
  distanceLightYears: 548,
  observed: true,
  createdAt: "2026-01-01 00:00:00",
};

export const andromeda: CelestialObject = {
  id: 2,
  name: "Galaxie d'Andromède",
  type: "galaxy",
  constellation: "Andromède",
  distanceLightYears: 2537000,
  observed: false,
  createdAt: "2026-01-01 00:00:00",
};

export const sagittariusA: CelestialObject = {
  id: 3,
  name: "Sagittarius A*",
  type: "black_hole",
  constellation: null,
  distanceLightYears: 26670,
  observed: false,
  createdAt: "2026-01-01 00:00:00",
};

export const celestialObjects = [betelgeuse, andromeda, sagittariusA];
