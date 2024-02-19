import { defaultIdGenero, defaultMovieQuery } from "@/constants";
import { AdaptedMovie, MovieOrder, MovieSort, MutateMovie } from "@/model";
import { createMovie, deleteMovie, getAllMovies, updateMovie } from "@/service";
import { useAuthStore } from "@/store/auth/auth.store";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from "zustand";

interface QueryReturn{
  movies: AdaptedMovie[];
  nextCursor?: number;
}

export function useGetAllMovies(){
  const searchParams = useSearchParams();
  const order = searchParams.get('order') as MovieOrder || defaultMovieQuery.order;
  const sort = searchParams.get('sort') as MovieSort || defaultMovieQuery.sort;
  const idGenero = Number(searchParams.get('idgen')) || defaultIdGenero;

  const queries = {
    ...defaultMovieQuery,
    sort,
    order,
  }

  const { data, error, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<QueryReturn>({ 
    queryKey: ['movies', queries, idGenero], 
    queryFn: ({ pageParam = queries.pag }) => getAllMovies({queries, pageParam, idGenero}),
    initialPageParam: defaultMovieQuery.pag,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false, 
  });

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