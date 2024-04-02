import { moviesAdapter } from "@/adapter";
import { BaseMovieUrl, defaultIdGenero } from "@/constants";
import { AdaptedMovie, GetAllMoviesResp, MovieQueryParams, MutateMovie } from "@/model";
import { handleError } from "@/utils";
import AxiosClone from 'axios-clone';

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
  
    const res = await AxiosClone.get<GetAllMoviesResp>(
      BaseMovieUrl, 
      {
        queries: { pag: pageParam, limit, sort, order },
        params: genreParam,
      }
    );

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
      throw new Error(handleError(error));
    }
    
    throw new Error('Error inesperado');
  }

}

export async function createMovie(movie: MutateMovie, token: string) {
  try {
    const formData = getMovieFormData(movie);
    formData.append("poster", movie.poster[0]);

    await AxiosClone.post(BaseMovieUrl, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

export async function updateMovie(movie: MutateMovie, token: string){
  const { id: movieId } = movie;

  try {
    const formData = getMovieFormData(movie);
    formData.append("id", movieId.toString());
    if(movie.poster) formData.append("poster", movie.poster[0]);
    
    const instance = AxiosClone.create({
      baseURL: BaseMovieUrl,
    });
    await instance.put(`/${movieId}`, formData, {
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

    await AxiosClone.remove(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}