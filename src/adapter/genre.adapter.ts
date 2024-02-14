import { AdaptedGenre, Genre } from "@/model/genre/genre.model";

export const oneGenreAdapter = (genre: Genre): AdaptedGenre => ({
  idGenero: genre.id_genero,
  genero: genre.genero
});

export const genresAdapter = (genres: Genre[]): AdaptedGenre[] => (
  genres.map(genre => oneGenreAdapter(genre))
    .sort((a,b) => a.genero.localeCompare(b.genero))
);

