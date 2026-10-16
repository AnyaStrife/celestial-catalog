import Database from "better-sqlite3";
import path from "node:path";

// Le fichier de base de données est créé à côté du dossier src/ s'il n'existe pas.
const dbPath = path.join(import.meta.dirname, "..", "celestial.db");
export const db = new Database(dbPath);

// Création de la table au démarrage (ne fait rien si elle existe déjà).
db.exec(`
  CREATE TABLE IF NOT EXISTS celestial_objects (
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    name                 TEXT    NOT NULL,
    type                 TEXT    NOT NULL,
    constellation        TEXT,
    distance_light_years REAL    NOT NULL,
    observed             INTEGER NOT NULL DEFAULT 0,
    created_at           TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

// Données d'exemple : la première fois, la table est vide, on la remplit.
const { count } = db
  .prepare("SELECT COUNT(*) AS count FROM celestial_objects")
  .get() as { count: number };

if (count === 0) {
  const insert = db.prepare(`
    INSERT INTO celestial_objects (name, type, constellation, distance_light_years, observed)
    VALUES (?, ?, ?, ?, ?)
  `);
  insert.run("Bételgeuse", "star", "Orion", 548, 1);
  insert.run("Galaxie d'Andromède", "galaxy", "Andromède", 2537000, 1);
  insert.run("Nébuleuse d'Orion", "nebula", "Orion", 1344, 0);
  insert.run("Sagittarius A*", "black_hole", "Sagittaire", 26670, 0);
  insert.run("Proxima Centauri b", "planet", "Centaure", 4.24, 0);
}
