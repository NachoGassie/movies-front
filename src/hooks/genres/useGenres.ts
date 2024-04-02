'use client'

import { AdaptedGenre } from "@/model";
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

export function useMutateGenre(isUpdate: boolean){
  const token = useStore(useAuthStore, (state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (genre: AdaptedGenre) => {
      if (isUpdate) return updateGenre(genre, token)
      return createGenre(genre, token)
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['genres'] });
    },

    onError: (error) => { throw new Error(error.message) },
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