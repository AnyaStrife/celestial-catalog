import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CelestialTable } from "./CelestialTable";
import { betelgeuse, celestialObjects } from "../mocks/celestialObjects";

describe("CelestialTable", () => {
  it("affiche une ligne par objet avec son type en français", () => {
    render(
      <CelestialTable
        objects={celestialObjects}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText("Bételgeuse")).toBeInTheDocument();
    expect(screen.getByText("Trou noir")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(4);
  });

  it("affiche un message quand la liste est vide", () => {
    render(<CelestialTable objects={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText(/aucun objet céleste/i)).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("appelle onEdit et onDelete avec l'objet de la ligne", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    const onDelete = vi.fn();
    render(
      <CelestialTable
        objects={[betelgeuse]}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Modifier Bételgeuse" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Supprimer Bételgeuse" }),
    );

    expect(onEdit).toHaveBeenCalledWith(betelgeuse);
    expect(onDelete).toHaveBeenCalledWith(betelgeuse);
  });
});
