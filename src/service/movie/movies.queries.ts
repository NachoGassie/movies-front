import { moviesAdapter } from "@/adapter";
import { BaseMovieUrl, defaultIdGenero } from "@/constants";
import { AdaptedMovie, GetAllMoviesResp, MovieQueryParams, MutateMovie } from "@/model";
import { handleError, handleErrorByStatus } from "@/utils";
import { createOne, deleteOne, updateOne } from "../defaultQueries";

interface GetAllParams {
  queries: MovieQueryParams;
  idGenero: number;
  pageParam: unknown;
}

export async function getAllMovies({ pageParam, queries, idGenero }: GetAllParams): Promise<{
  movies: AdaptedMovie[], nextCursor?: number;
}>{
  const { limit, sort, order } = queries;
  const generoUrl = idGenero === defaultIdGenero ? '' : `/genre/${idGenero}`;
  const queryUrl = `pag=${pageParam}&limit=${limit}&sort=${sort}&order=${order}`;

  const res = await fetch(`${BaseMovieUrl}${generoUrl}?${queryUrl}`);

  if (!res.ok) {
    throw new Error(handleErrorByStatus(res.status));
  }

  const {movies: moviesFromDb, totalCount, pagesCount }: GetAllMoviesResp = await res.json();

  const maxPag = Math.ceil(totalCount / limit);
  const movies = moviesAdapter(moviesFromDb);
  const currentPage = Number(pagesCount.split('/')[0]);

  const nextPage = currentPage+1;
  const nextCursor = nextPage > maxPag 
    ? undefined 
    : nextPage;

  return { movies, nextCursor }
}

export async function createMovie(movie: MutateMovie, token: string) {
  try {
    const formData = getMovieFormData(movie);
    formData.append("poster", movie.poster[0]);
    createOne(BaseMovieUrl, formData, token);
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

export async function updateMovie(movie: MutateMovie, token: string){
  const { id: movieId } = movie;
  const url = `${BaseMovieUrl}/${movieId}`;

  try {
    const formData = getMovieFormData(movie);
    formData.append("id", movieId.toString());
    if(movie.poster) formData.append("poster", movie.poster[0]);

    updateOne(url, formData, token);
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

function getMovieFormData(movie: MutateMovie){
  const formData = new FormData();

  formData.append("titulo", movie.titulo);
  formData.append("sinopsis", movie.sinopsis);
  formData.append("anioLanzamiento", movie.anioLanzamiento.toString());
  formData.append("idGenero", movie.idGenero.toString());
  
  return formData;
}

export async function deleteMovie(movieId: number, token: string){
  const url = `${BaseMovieUrl}/${movieId}`;
  try {
    deleteOne(url, token);
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}