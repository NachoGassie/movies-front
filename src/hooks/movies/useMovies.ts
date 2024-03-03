import { defaultIdGenero, defaultMovieQuery } from "@/constants";
import { AdaptedMovie, MovieOrder, MovieSort, MutateMovie } from "@/model";
import { movieQueriesSchema } from "@/schemas/movie/movie.schemas";
import { createMovie, deleteMovie, getAllMovies, updateMovie } from "@/service";
import { useAuthStore } from "@/store/auth/auth.store";
import { handleError } from "@/utils";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from "zustand";

function verifyQueries(){
  const searchParams = useSearchParams();
  const order = searchParams.get('order') || defaultMovieQuery.order;
  const sort = searchParams.get('sort') || defaultMovieQuery.sort;
  const idGenero = Number(searchParams.get('idgen')) || defaultIdGenero;

  return movieQueriesSchema.parse({ order, sort, idGenero });
}

export function useGetAllMovies(){
  let order: MovieOrder, sort: MovieSort, idGenero: number;

  try {
    order = verifyQueries().order;
    sort = verifyQueries().sort;
    idGenero = verifyQueries().idGenero;
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }

  const queries = {
    ...defaultMovieQuery,
    sort,
    order,
  }

  const { data, error, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<{
    movies: AdaptedMovie[], nextCursor?: number
  }>({ 
    queryKey: ['movies', queries, idGenero], 
    queryFn: ({ pageParam = queries.pag }) => getAllMovies({queries, pageParam, idGenero}),
    initialPageParam: defaultMovieQuery.pag,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false, 
  });

  if (error) {
    throw new Error(handleError(error as Error)) 
  }; 
  const movies = data?.pages.flatMap(page => page.movies);

  return { movies, isLoading, hasNextPage, fetchNextPage }
}

export function useMutateMovie(isUpdate: boolean){
  const token = useStore(useAuthStore, (state) => state.token);
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (movie: MutateMovie) => {
      if (isUpdate) return updateMovie(movie, token);
      return createMovie(movie, token);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['movies'] });
      router.push('/');
    },

    onError: (error) => { throw new Error(error.message) },
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
    onError: (error) => { 
      // throw new Error(error.message);
      console.log('error') 
    },
  });
}