import { genresAdapter } from "@/adapter";
import axios from "@/axiosClone/axiosQueries";
import { BaseGenreUrl } from "@/constants";
import { Genre } from "@/model";
import { GetAllGenresResp } from "@/model/genre/genreDto.model";
import { handleError } from "@/utils";

export async function getAllGenres(){
  try {
    const genres = await axios.get<GetAllGenresResp>(
      BaseGenreUrl, { transformResponse: (({ genres }) => genresAdapter(genres)) }
    );
    return genres;
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }

}

export async function createGenre(genre: string, token: string){
  try {
    const formData = getGenreFormData(genre);
    axios.post(BaseGenreUrl, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}
export async function updateGenre(genre: Genre, token: string){
  const url = `${BaseGenreUrl}/${genre.id_genero}`;
  try {
    const formData = getGenreFormData(genre.genero);
    axios.put(BaseGenreUrl, formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}

function getGenreFormData(genre: string){
  const formData = new FormData;
  formData.append("genero", genre);
  return formData;
}

export async function deleteGenre(genreId: number, token: string){
  const url = `${BaseGenreUrl}/${genreId}`;
  try {
    axios.remove(BaseGenreUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}