'use client'

import { Genre } from "@/model";
import { createGenre, deleteGenre, getAllGenres, updateGenre } from "@/service";
import { useAuthStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

export function useGetAllGenres(){
  const { data, error, isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: getAllGenres,
  });

  const genres = data ?? [];

  return {
    genres, error, isLoading,
  }
}

export function useCreateGenre(){
  const token = useStore(useAuthStore, (state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (genre: string) => createGenre(genre, token),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
}

export function useUpdateGenre(){
  const token = useStore(useAuthStore, (state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (genre: Genre) => updateGenre(genre, token),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
}

export function useDeleteGenre(){
  const token = useStore(useAuthStore, (state) => state.token);
  const queryClient = useQueryClient();

  const { mutateAsync, isError } = useMutation({
    mutationFn: (id: number) => deleteGenre(id, token),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });

  return { mutateAsync, isError };
}