import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vide la page après chaque test : sinon les composants des tests précédents restent affichés.
afterEach(() => {
  cleanup();
});
