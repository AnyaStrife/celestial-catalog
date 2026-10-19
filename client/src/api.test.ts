import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it } from "vitest";
import { getErrorMessage } from "./api";

// Fabrique une erreur Axios comme si le serveur avait répondu avec ce statut et ce corps.
function axiosErrorWith(status: number, data: unknown) {
  const config = { headers: new AxiosHeaders() };
  return new AxiosError("Request failed", "ERR_BAD_REQUEST", config, null, {
    status,
    statusText: "",
    headers: {},
    config,
    data,
  });
}

describe("getErrorMessage", () => {
  it("liste les erreurs de validation renvoyées par l’API", () => {
    const error = axiosErrorWith(400, {
      error: "Données invalides",
      details: [{ field: "name", message: "Le nom est obligatoire" }],
    });
    expect(getErrorMessage(error)).toBe("name : Le nom est obligatoire");
  });

  it("renvoie le message simple de l’API", () => {
    const error = axiosErrorWith(404, { error: "Objet céleste introuvable" });
    expect(getErrorMessage(error)).toBe("Objet céleste introuvable");
  });

  it("prévient quand le serveur ne répond pas", () => {
    const error = new AxiosError("Network Error", "ERR_NETWORK");
    expect(getErrorMessage(error)).toMatch(/impossible de joindre/i);
  });

  it("gère les erreurs inconnues", () => {
    expect(getErrorMessage(new Error("boom"))).toBe(
      "Une erreur inattendue est survenue",
    );
  });
});
