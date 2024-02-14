export type MovieSort = 'asc' | 'desc';
export type MovieOrder = 'id' | 'titulo' | 'genero' | 'anio_lanzamiento';

export interface MovieQueryParams {
  pag: number;
  limit: number;
  sort: MovieSort;
  order: MovieOrder;
}

export interface MovieOrderObj {
  name: string; 
  value: MovieOrder;
}