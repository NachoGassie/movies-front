import { moviesAdapter } from "@/adapter";
import { BaseMovieUrl, defaultIdGenero } from "@/constants";
import { AdaptedMovie, GetAllMoviesResp, MovieQueryParams, MutateMovie } from "@/model";
import { handleErrorByStatus } from "@/utils";

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
  const formData = getMovieFormData(movie);
  formData.append("poster", movie.poster[0]);

  await fetch(BaseMovieUrl, {
    method: "POST", 
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateMovie(movie: MutateMovie, token: string){
  const formData = getMovieFormData(movie);

  const { id: movieId } = movie;
  
  formData.append("id", movieId.toString());
  if(movie.poster) formData.append("poster", movie.poster[0]);

  await fetch(`${BaseMovieUrl}/${movieId}`, {
    method: "PUT", 
    body: formData,
    headers: { Authorization: `Bearer ${token}` },
  });
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
  try {
    await fetch(`${BaseMovieUrl}/${movieId}`, {
      method: "DELETE", 
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}