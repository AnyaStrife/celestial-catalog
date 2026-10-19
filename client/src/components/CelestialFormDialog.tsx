import { useState } from "react";
import type { FormEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { CELESTIAL_TYPES, TYPE_LABELS } from "../types";
import type {
  CelestialObject,
  CelestialObjectInput,
  CelestialType,
} from "../types";

type Props = {
  initialValue: CelestialObject | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: CelestialObjectInput) => void;
};

export function CelestialFormDialog({
  initialValue,
  isSubmitting,
  onClose,
  onSubmit,
}: Props) {
  // Initialize the form with the existing object's values when editing, or with default values when creating a new object.
  const [name, setName] = useState(initialValue?.name ?? "");
  const [type, setType] = useState<CelestialType>(initialValue?.type ?? "star");
  const [constellation, setConstellation] = useState(
    initialValue?.constellation ?? "",
  );
  const [distance, setDistance] = useState(
    initialValue ? String(initialValue.distanceLightYears) : "",
  );
  const [observed, setObserved] = useState(initialValue?.observed ?? false);
  const [submitted, setSubmitted] = useState(false);

  // Check the current values to determine whether the required fields are valid.
  const distanceValue = Number(distance);
  const nameError = name.trim() === "" ? "Le nom est obligatoire" : "";
  const distanceError =
    distance.trim() === "" || Number.isNaN(distanceValue) || distanceValue < 0
      ? "Entre un nombre positif"
      : "";

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);

    // Prevent submission if any required field is invalid.
    if (nameError || distanceError) return;

    // Trim text fields and convert the distance to a number before sending the data.
    onSubmit({
      name: name.trim(),
      type,
      constellation: constellation.trim() || null,
      distanceLightYears: distanceValue,
      observed,
    });
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit} noValidate>
        <DialogTitle>
          {initialValue
            ? "Modifier un objet céleste"
            : "Ajouter un objet céleste"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              error={submitted && nameError !== ""}
              helperText={submitted ? nameError : ""}
            />
            <TextField
              select
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value as CelestialType)}
            >
              {CELESTIAL_TYPES.map((t) => (
                <MenuItem key={t} value={t}>
                  {TYPE_LABELS[t]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Constellation"
              value={constellation}
              onChange={(e) => setConstellation(e.target.value)}
              helperText="Facultatif"
            />
            <TextField
              label="Distance (années-lumière)"
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
              error={submitted && distanceError !== ""}
              helperText={submitted ? distanceError : ""}
              slotProps={{ htmlInput: { min: 0, step: "any" } }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={observed}
                  onChange={(e) => setObserved(e.target.checked)}
                />
              }
              label="Déjà observé"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Annuler</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement…" : "Enregistrer"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
