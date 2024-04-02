import { genresAdapter } from "@/adapter";
import { BaseGenreUrl } from "@/constants";
import { AdaptedGenre } from "@/model";
import { GetAllGenresResp } from "@/model/genre/genreDto.model";
import { handleError } from "@/utils";
import AxiosClone from 'axios-clone';

export async function getAllGenres(){
  try {
    const genres = await AxiosClone.get<GetAllGenresResp>(
      BaseGenreUrl, 
      { transformResponse: (({ genres }) => genresAdapter(genres)) }
    );

    return genres.data as unknown as ReturnType<typeof genresAdapter>;
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

export async function createGenre(genre: AdaptedGenre, token: string){
  try {
    const stringBody = JSON.stringify(genre);
    AxiosClone.post(BaseGenreUrl, genre, {
      headers: { Authorization: `Bearer ${token}` }
    }); 
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

export async function updateGenre(genre: AdaptedGenre, token: string){
  const url = `${BaseGenreUrl}/${genre.idGenero}`;
  try {
    const stringBody = JSON.stringify(genre);
    await AxiosClone.put(url, stringBody, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

export async function deleteGenre(genreId: number, token: string){
  const url = `${BaseGenreUrl}/${genreId}`;
  try {
    await AxiosClone.remove(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}