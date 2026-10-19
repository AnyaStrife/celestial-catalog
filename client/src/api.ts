import axios from "axios";
import type { CelestialObject, CelestialObjectInput } from "./types";

const http = axios.create({ baseURL: "/api/celestial-objects" });

export const celestialApi = {
  getAll: async () => (await http.get<CelestialObject[]>("")).data,
  create: async (data: CelestialObjectInput) =>
    (await http.post<CelestialObject>("", data)).data,
  update: async (id: number, data: CelestialObjectInput) =>
    (await http.put<CelestialObject>(`/${id}`, data)).data,
  remove: async (id: number) => {
    await http.delete(`/${id}`);
  },
};

type ApiError = {
  error?: string;
  details?: { field: string; message: string }[];
};

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    if (!error.response)
      return "Impossible de joindre l'API. Le serveur est-il lancé ?";
    const data = error.response.data;
    if (data?.details?.length) {
      return data.details.map((d) => `${d.field} : ${d.message}`).join(" · ");
    }
    if (data?.error) return data.error;
  }
  return "Une erreur inattendue est survenue";
}
