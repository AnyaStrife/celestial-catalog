import express from "express";
import type { NextFunction, Request, Response } from "express";
import { router } from "./routes";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Converts the JSON body of requests into a JavaScript object
app.use(express.json());

// All CRUD endpoints are prefixed with /api/celestial-objects.
app.use("/api/celestial-objects", router);

// Unknown route → 404 in JSON (instead of the default Express HTML page).
app.use((_req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

// Centralized error handling : no error causes the server to crash.
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
