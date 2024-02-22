import { MovieOrder, MovieSort } from "@/model";
import { anioLanzamientoError, basicError, greaterThanError, stringLenghtError } from "../global/utils.schemas";
import { z } from "zod";
import { defaultIdGenero, defaultMovieQuery } from "@/constants";

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
export const mutateMovieSchema = movieSchema.omit({ genero: true });

export const movieQueriesSchema = z.object({
  order: z.enum(['id', 'titulo', 'genero', 'anio_lanzamiento']),
  sort: z.enum(['asc', 'desc']),
  idGenero: z
    .coerce
    .number(basicError("El id genero", "numero"))
    .refine((id) => id > 0 || id === defaultIdGenero, {
      message: "El id genero debe ser un numero entero positivo",
    }),
});