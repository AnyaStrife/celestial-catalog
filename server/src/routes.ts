import { Router } from "express";
import type { Request, Response } from "express";
import { celestialObjectSchema } from "./schema";
import * as repository from "./repository";

export const router = Router();

// Lit l'id dans l'URL ; renvoie null s'il n'est pas un entier positif.
function parseId(req: Request): number | null {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Valide le corps de la requête ; en cas d'erreur, répond 400 et renvoie null.
function validateBody(req: Request, res: Response) {
  const result = celestialObjectSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: "Données invalides",
      details: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return null;
  }
  return result.data;
}

// READ — toute la liste
router.get("/", (_req, res) => {
  res.json(repository.findAll());
});

// READ — un seul objet
router.get("/:id", (req, res) => {
  const id = parseId(req);
  if (id === null) {
    res.status(400).json({ error: "Identifiant invalide" });
    return;
  }
  const object = repository.findById(id);
  if (!object) {
    res.status(404).json({ error: "Objet céleste introuvable" });
    return;
  }
  res.json(object);
});

// CREATE
router.post("/", (req, res) => {
  const data = validateBody(req, res);
  if (!data) return;
  res.status(201).json(repository.create(data));
});

// UPDATE
router.put("/:id", (req, res) => {
  const id = parseId(req);
  if (id === null) {
    res.status(400).json({ error: "Identifiant invalide" });
    return;
  }
  const data = validateBody(req, res);
  if (!data) return;
  const updated = repository.update(id, data);
  if (!updated) {
    res.status(404).json({ error: "Objet céleste introuvable" });
    return;
  }
  res.json(updated);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = parseId(req);
  if (id === null) {
    res.status(400).json({ error: "Identifiant invalide" });
    return;
  }
  if (!repository.remove(id)) {
    res.status(404).json({ error: "Objet céleste introuvable" });
    return;
  }
  res.status(204).send();
});
