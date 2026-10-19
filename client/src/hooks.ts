import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { celestialApi } from "./api";
import type { CelestialObjectInput } from "./types";

// Shared query key used to identify and refresh the celestial objects data.
const QUERY_KEY = ["celestial-objects"];

export function useCelestialObjects() {
  // Fetch and cache the list of celestial objects.
  return useQuery({ queryKey: QUERY_KEY, queryFn: celestialApi.getAll });
}

export function useCreateCelestialObject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: celestialApi.create,
    // Refresh the cached list after a successful creation.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateCelestialObject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CelestialObjectInput }) =>
      celestialApi.update(id, data),
    // Refresh the cached list to display the updated object.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useDeleteCelestialObject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: celestialApi.remove,
    // Refresh the cached list after the object has been deleted.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}
