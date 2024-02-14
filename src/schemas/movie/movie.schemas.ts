import { anioLanzamientoError, basicError, greaterThanError, stringLenghtError } from "../global/utils.schemas";
import { z } from "zod";

const anioLanzamientoErr = "El año de lanzamiento debe ser igual a o menor que el año actual y mayor que 1900";
const currentYear = new Date().getFullYear();

export const movieSchema = z.object({
  id: z
    .number(basicError("Id", "numero"))
    .positive(greaterThanError("Id", 0)),

  titulo: z
    .string(basicError("El titulo", "texto"))
    .min(2, stringLenghtError("El titulo", 2)),

  sinopsis: z
    .string(basicError("La sinopsis", "texto"))
    .min(10, stringLenghtError("La sinopsis", 10)),

  anioLanzamiento: z
    .coerce
    .number(anioLanzamientoError())
    .gt(1900, anioLanzamientoErr)
    .lte(currentYear, anioLanzamientoErr),
    
  poster: z
    .any(),

    // .string(basicError("El poster", "texto"))
    // .optional(),

  idGenero: z
    .coerce
    .number(basicError("El id genero", "numero"))
    .positive(greaterThanError("El id genero", 0)),

  genero: z
    .string(basicError("El genero", "texto"))
    .min(2, stringLenghtError("El genero", 2))
});

export const newMovieSchema = movieSchema.omit({ 
  id: true,
  genero: true 
});
