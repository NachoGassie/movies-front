import { genresAdapter } from "@/adapter";
import { BaseGenreUrl } from "@/constants";
import { Genre } from "@/model";
import { handleError } from "@/utils";
import { createOne, deleteOne, updateOne } from "../defaultQueries";

export async function getAllGenres(){
  const res = await fetch(BaseGenreUrl);
  const json = await res.json();
  const genres = genresAdapter(json.genres);

  return genres;
}

export async function createGenre(genre: string, token: string){
  try {
    const formData = getGenreFormData(genre);
    createOne(BaseGenreUrl, formData, token);
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}
export async function updateGenre(genre: Genre, token: string){
  const url = `${BaseGenreUrl}/${genre.id_genero}`;
  try {
    const formData = getGenreFormData(genre.genero);
    const res = await updateOne(url, formData, token);
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
    await deleteOne(url, token);
  } catch (error) {
    throw new Error(handleError(error as Error)); 
  }
}