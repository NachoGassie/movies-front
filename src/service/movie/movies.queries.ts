import { moviesAdapter } from "@/adapter";
import AxiosErrorClone from "@/axiosClone/axiosError";
import axios from "@/axiosClone/axiosQueries";
import { BaseMovieUrl, defaultIdGenero } from "@/constants";
import { AdaptedMovie, GetAllMoviesResp, MovieQueryParams, MutateMovie } from "@/model";
import { handleError } from "@/utils";
import axiosTrue, { AxiosError } from "axios";

interface GetAllParams {
  queries: MovieQueryParams;
  idGenero: number;
  pageParam: unknown;
}

export async function getAllMovies({ pageParam, queries, idGenero }: GetAllParams): Promise<{
  movies: AdaptedMovie[], nextCursor?: number;
}>{
  try {
    const { limit, sort, order } = queries;

    const genreParam = idGenero === defaultIdGenero ? {} : {genre: idGenero};
  
    const res = (await axios.get<GetAllMoviesResp>(
      BaseMovieUrl, 
      {
        queries: { pag: pageParam, limit, sort, order },
        params: genreParam,
      }
    ));
    
    const res2 = await axiosTrue.get<GetAllMoviesResp>(BaseMovieUrl);

    console.log('clone');
    console.log(res);
    console.log('original');
    console.log(res2);
  
    const { movies: moviesFromDb, totalCount, pagesCount } = res.data;
    
    const maxPag = Math.ceil(totalCount / limit);
    const movies = moviesAdapter(moviesFromDb);
    const currentPage = Number(pagesCount.split('/')[0]);
  
    const nextPage = currentPage+1;
    const nextCursor = nextPage > maxPag 
      ? undefined 
      : nextPage;
  
    return { movies, nextCursor }
  } catch (error) {

    if (error instanceof Error) {
      console.log(error.name === 'AbortError');
      throw new Error(handleError(error));
    }

    if (error instanceof AxiosErrorClone) {
      // console.log(error.request);
      console.log(error.toJSON());
    }

    if (error instanceof AxiosError) {
      console.log(error);
    }

    if (error instanceof Error) {
      throw new Error(handleError(error));
    }
    
    throw new Error('Error inesperado');
  }

}

export async function createMovie(movie: MutateMovie, token: string) {
  try {
    const formData = getMovieFormData(movie);
    formData.append("poster", movie.poster[0]);
    
    axios.post(BaseMovieUrl, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
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
    
    axios.put(url, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
    axios.remove(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}