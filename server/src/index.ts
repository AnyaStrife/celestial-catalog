import express from "express";
import type { NextFunction, Request, Response } from "express";
import { router } from "./routes";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Transforme le corps JSON des requêtes en objet JavaScript
app.use(express.json());

// Toutes les routes du CRUD sont préfixées par /api/celestial-objects.
app.use("/api/celestial-objects", router);

// Route inconnue → 404 en JSON (au lieu de la page HTML par défaut d'Express).
app.use((_req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

// Gestion centralisée des erreurs : aucune erreur ne fait planter le serveur.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({ error: "JSON mal formé" });
    return;
  }
  console.error(err);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

app.listen(PORT, () => {
  console.log(`API prête sur http://localhost:${PORT}/api/celestial-objects`);
});
