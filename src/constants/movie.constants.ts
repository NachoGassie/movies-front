import { MovieQueryParams, MovieOrderObj, MovieSort } from "@/model/movie";
import { BaseUrl } from "./global.constants";

export const BaseMovieUrl = `${BaseUrl}/movies`;

export const defaultMovieQuery: MovieQueryParams = {
  pag: 1,
  limit: 6,
  sort: 'asc',
  order: 'id',
}
export const defaultIdGenero = -1;

export const sortByFields: MovieSort[] = ['asc', 'desc'];
export const orderByFields: MovieOrderObj[] = [
  { name: 'Id', value: 'id' },
  { name: 'Titulo', value: 'titulo' },
  { name: 'Genero', value: 'genero' },
  { name: 'Año de Lanzamiento', value: 'anio_lanzamiento' },
]