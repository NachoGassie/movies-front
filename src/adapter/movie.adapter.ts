import { AdaptedMovie, MovieFromDb } from "@/model/movie/movie.model";

export function oneMovieAdapter(movie: MovieFromDb): AdaptedMovie{
  const basePosterUrl = 'http://localhost:3040/api/v1/movies/poster'
  
  return {
    ...movie, // id - titulo - sinopsis
    anioLanzamiento: movie.anio_lanzamiento,
    idGenero: movie.id_genero,
    poster: `${basePosterUrl}/${movie.poster}`
  }
}

export function moviesAdapter(movies: MovieFromDb[]): AdaptedMovie[]{
  return movies.map(movie => oneMovieAdapter(movie));
}