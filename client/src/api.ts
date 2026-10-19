import axios from "axios";
import type { CelestialObject, CelestialObjectInput } from "./types";

// Use a shared Axios instance for all celestial object requests.
const http = axios.create({ baseURL: "/api/celestial-objects" });

export const celestialApi = {
  // Fetch all celestial objects from the API.
  getAll: async () => (await http.get<CelestialObject[]>("")).data,

  // Create a new celestial object.
  create: async (data: CelestialObjectInput) =>
    (await http.post<CelestialObject>("", data)).data,

  // Update an existing celestial object by its ID.
  update: async (id: number, data: CelestialObjectInput) =>
    (await http.put<CelestialObject>(`/${id}`, data)).data,

  // Delete a celestial object by its ID.
  remove: async (id: number) => {
    await http.delete(`/${id}`);
  },
};

type ApiError = {
  error?: string;
  details?: { field: string; message: string }[];
};

export function getErrorMessage(error: unknown): string {
  // Handle errors returned by Axios separately from unexpected errors.
  if (axios.isAxiosError<ApiError>(error)) {
    // No response usually means the API could not be reached.
    if (!error.response)
      return "Impossible de joindre l'API. Le serveur est-il lancé ?";
    const data = error.response.data;
    // Combine field validation errors into a single readable message.
    if (data?.details?.length) {
      return data.details.map((d) => `${d.field} : ${d.message}`).join(" · ");
    }
    // Return the error message provided by the API, if available.
    if (data?.error) return data.error;
  }
  return "Une erreur inattendue est survenue";
}
