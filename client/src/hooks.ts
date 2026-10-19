import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { celestialApi } from "./api";
import type { CelestialObjectInput } from "./types";

const QUERY_KEY = ["celestial-objects"];

export function useCelestialObjects() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: celestialApi.getAll });
}

export function useCreateCelestialObject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: celestialApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateCelestialObject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CelestialObjectInput }) =>
      celestialApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteCelestialObject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: celestialApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
