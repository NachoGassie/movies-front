import { AdaptedGenre } from "@/model";

interface Props{
  genres: AdaptedGenre[];
  fn: () => void
}

export default function Select({ genres, fn }: Props){
  return(
    <select name="" id="" onChange={fn}>
      {
        genres.map(genre => (
          <option value={genre.idGenero}>{genre.genero}</option>
        ))
      }
    </select>
  );
}