import { genresAdapter } from "@/adapter";
import { BaseGenreUrl } from "@/constants";
import { handleError } from "@/utils";

export async function getAllGenres(){
  const res = await fetch(BaseGenreUrl);
  const json = await res.json();
  const genres = genresAdapter(json.genres);

  return genres;
}

export async function deleteGenre(genreId: number, token: string){

  const res = await fetch(`${BaseGenreUrl}/${genreId}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });

  // if (!res.ok) {
  //   const err = handleError(await res.json());
  //   throw new Error(err);
  // }
}