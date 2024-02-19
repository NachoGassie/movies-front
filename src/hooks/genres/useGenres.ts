'use client'

import { deleteGenre, getAllGenres } from "@/service";
import { useAuthStore } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

export function useGetAllGenres(){
  const { data, error, isLoading }  = useQuery({
    queryKey: ['genres'],
    queryFn: getAllGenres,
  });

  const genres = data ?? [];

  return {
    genres, error, isLoading,
  }
}

export function useDeleteGenre(){
  const queryClient = useQueryClient();
  const token = useStore(useAuthStore, (state) => state.token);

  return useMutation({
    mutationFn: (id: number) => deleteGenre(id, token),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
    onError: (error) => console.log(error),
  });
}