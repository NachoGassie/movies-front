import { defaultMovieQuery } from "@/constants";
import { AdaptedMovie, MutateMovie, NewMovie } from "@/model";
import { createMovie, deleteMovie, getAllMovies, updateMovie } from "@/service";
import { useAuthStore } from "@/store/auth/auth.store";
import { useMoviesStore } from "@/store/movies";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { useStore } from "zustand";

interface QueryReturn{
  movies: AdaptedMovie[];
  nextCursor?: number;
}

export function useGetAllMovies(){
  const queries = useMoviesStore(state => state.query);
  const idGenero = useMoviesStore(state => state.idGenero);

  const result = useInfiniteQuery<QueryReturn>({ 
    queryKey: ['movies', queries, idGenero], 
    queryFn: ({pageParam = 1}) => getAllMovies({queries, pageParam, idGenero}),
    initialPageParam: defaultMovieQuery.pag,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false, 
  });

  const { data, error, isLoading, hasNextPage, fetchNextPage } = result;
  
  const movies = data 
    ? data.pages.flatMap(page => page.movies) 
    : [];

  return {
    movies, error, isLoading, hasNextPage, fetchNextPage, 
  };
}

export function useMutateMovie(isUpdate: boolean){
  const token = useStore(useAuthStore, (state) => state.token);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (movie: MutateMovie) => {
      if (isUpdate) {
        return updateMovie(movie, token);
      }
      return createMovie(movie, token);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies'] });
      router.push('/');
    },

    onError: (error) => console.log(error),
  });

}

export function useDeleteMovie(){
  const queryClient = useQueryClient();
  const token = useStore(useAuthStore, (state) => state.token);

  return useMutation({
    mutationFn: (id: number) => deleteMovie(id, token),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
    onError: (error) => console.log(error),
  })

}