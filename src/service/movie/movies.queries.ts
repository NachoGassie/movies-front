import { moviesAdapter } from "@/adapter";
import { BaseMovieUrl, defaultIdGenero } from "@/constants";
import { AdaptedMovie, GetAllMoviesResp, MovieQueryParams, MutateMovie, NewMovie } from "@/model";

interface fetchParam {
  queries: MovieQueryParams;
  idGenero: number;
  pageParam: unknown;
}

interface QueryReturn{
  movies: AdaptedMovie[];
  nextCursor?: number;
}

export async function getAllMovies({ pageParam, queries, idGenero }: fetchParam): Promise<QueryReturn>{

  const { limit, sort, order } = queries;
  const generoUrl = idGenero === defaultIdGenero ? '' : `/genre/${idGenero}`;
  const queryUrl = `pag=${pageParam}&limit=${limit}&sort=${sort}&order=${order}`;

  const res = await fetch(
    `${BaseMovieUrl}${generoUrl}?${queryUrl}`
  );

  const json: GetAllMoviesResp = await res.json();
  const maxPag = Math.ceil(json.totalCount / limit);

  const movies = moviesAdapter(json.movies);

  const currentPage = Number(json.pagesCount.split('/')[0]);
  const nextPage = currentPage+1;
  const nextCursor = nextPage > maxPag 
    ? undefined 
    : nextPage;

  return {
    movies,
    nextCursor,
  }
}

export async function createMovie(movie: MutateMovie, token: string) {
  const formData = getMovieFormData(movie);
  formData.append("poster", movie.poster[0]);

  const res = await fetch(BaseMovieUrl, {
    method: "POST", 
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  const json = await res.json();

  if (!res.ok) {
    console.log(json)
  }
  return json;
}

export async function updateMovie(movie: MutateMovie, token: string){
  const formData = getMovieFormData(movie);

  const { id: movieId } = movie;
  formData.append("id", movieId.toString());
  if(movie.poster) formData.append("poster", movie.poster[0]);

  const res = await fetch(`${BaseMovieUrl}/${movieId}`, {
    method: "PUT", 
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  const json = await res.json();

  if (!res.ok) {
    console.log(json)
  }
  return json;
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

  const res = await fetch(`${BaseMovieUrl}/${movieId}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  return res.json();
}

