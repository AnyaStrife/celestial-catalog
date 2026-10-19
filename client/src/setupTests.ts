import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Clear the page after each test: otherwise, elements from previous tests will remain on the screen.
afterEach(() => {
  cleanup();
});
