import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CelestialFormDialog } from "./CelestialFormDialog";
import { betelgeuse } from "../mocks/celestialObjects";

describe("CelestialFormDialog", () => {
  it("affiche les erreurs et n'envoie rien si les champs obligatoires sont vides", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <CelestialFormDialog
        initialValue={null}
        isSubmitting={false}
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Enregistrer" }));

    expect(screen.getByText("Le nom est obligatoire")).toBeInTheDocument();
    expect(screen.getByText("Entre un nombre positif")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("envoie les données saisies, converties au bon format", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <CelestialFormDialog
        initialValue={null}
        isSubmitting={false}
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />,
    );

    await user.type(screen.getByLabelText(/nom/i), "  Véga  ");
    await user.type(screen.getByLabelText(/distance/i), "25");
    await user.click(screen.getByRole("button", { name: "Enregistrer" }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Véga",
      type: "star",
      constellation: null,
      distanceLightYears: 25,
      observed: false,
    });
  });

  it("préremplit les champs en mode modification", () => {
    render(
      <CelestialFormDialog
        initialValue={betelgeuse}
        isSubmitting={false}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByText("Modifier un objet céleste")).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toHaveValue("Bételgeuse");
    expect(screen.getByLabelText(/distance/i)).toHaveValue(548);
  });
});
