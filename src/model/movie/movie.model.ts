import { movieSchema, newMovieSchema } from "@/schemas/movie/movie.schemas"
import { z } from "zod"

export interface MovieFromDb {
  id: number
  titulo: string
  anio_lanzamiento: number
  sinopsis: string
  poster: string
  id_genero: number
  genero: string
}

export type AdaptedMovie = z.infer<typeof movieSchema>

export type NewMovie = z.infer<typeof newMovieSchema>
