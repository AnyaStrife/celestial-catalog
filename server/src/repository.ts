import { db } from "./db";
import type { CelestialObjectInput } from "./schema";

// Represents a row as it is stored in the database.
type Row = {
  id: number;
  name: string;
  type: string;
  constellation: string | null;
  distance_light_years: number;
  observed: number;
  created_at: string;
};

// Convert database field names to camelCase and SQLite booleans to actual booleans.
const toCelestialObject = (row: Row) => ({
  id: row.id,
  name: row.name,
  type: row.type,
  constellation: row.constellation,
  distanceLightYears: row.distance_light_years,
  observed: row.observed === 1,
  createdAt: row.created_at,
});

// Convert the input to match the database format.
const toParams = (data: CelestialObjectInput) => ({
  name: data.name,
  type: data.type,
  constellation: data.constellation ?? null,
  distanceLightYears: data.distanceLightYears,
  observed: data.observed ? 1 : 0,
});

// Return all objects, sorted by name.
export function findAll() {
  const rows = db
    .prepare("SELECT * FROM celestial_objects ORDER BY name")
    .all() as Row[];
  return rows.map(toCelestialObject);
}

// Find an object by its ID, or return undefined if it doesn't exist.
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
  // Return the newly created object with its generated ID and creation date.
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
  // Return the updated object, or undefined if no object matched the ID.
  return result.changes > 0 ? findById(id) : undefined;
}

export function remove(id: number) {
  const result = db
    .prepare("DELETE FROM celestial_objects WHERE id = ?")
    .run(id);
  // Return whether an object was actually deleted.
  return result.changes > 0;
}
