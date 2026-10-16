import { db } from "./db";
import type { CelestialObjectInput } from "./schema";

// Une ligne telle qu'elle est stockée en base
type Row = {
  id: number;
  name: string;
  type: string;
  constellation: string | null;
  distance_light_years: number;
  observed: number;
  created_at: string;
};

// Convertit une ligne SQL en objet JSON propre pour l'API (camelCase, vrai booléen).
const toCelestialObject = (row: Row) => ({
  id: row.id,
  name: row.name,
  type: row.type,
  constellation: row.constellation,
  distanceLightYears: row.distance_light_years,
  observed: row.observed === 1,
  createdAt: row.created_at,
});

// Prépare les valeurs pour SQLite, qui ne connaît pas les booléens.
const toParams = (data: CelestialObjectInput) => ({
  name: data.name,
  type: data.type,
  constellation: data.constellation ?? null,
  distanceLightYears: data.distanceLightYears,
  observed: data.observed ? 1 : 0,
});

export function findAll() {
  const rows = db
    .prepare("SELECT * FROM celestial_objects ORDER BY name")
    .all() as Row[];
  return rows.map(toCelestialObject);
}

export function findById(id: number) {
  const row = db
    .prepare("SELECT * FROM celestial_objects WHERE id = ?")
    .get(id) as Row | undefined;
  return row ? toCelestialObject(row) : undefined;
}

export function create(data: CelestialObjectInput) {
  const result = db
    .prepare(
      `
      INSERT INTO celestial_objects (name, type, constellation, distance_light_years, observed)
      VALUES (@name, @type, @constellation, @distanceLightYears, @observed)
    `,
    )
    .run(toParams(data));
  return findById(Number(result.lastInsertRowid))!;
}

export function update(id: number, data: CelestialObjectInput) {
  const result = db
    .prepare(
      `
      UPDATE celestial_objects
      SET name = @name, type = @type, constellation = @constellation,
          distance_light_years = @distanceLightYears, observed = @observed
      WHERE id = @id
    `,
    )
    .run({ ...toParams(data), id });
  return result.changes > 0 ? findById(id) : undefined;
}

export function remove(id: number) {
  const result = db
    .prepare("DELETE FROM celestial_objects WHERE id = ?")
    .run(id);
  return result.changes > 0;
}
