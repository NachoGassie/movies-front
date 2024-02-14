import { GetAllResp } from "../global/globalDTO.model";
import { Movie } from "./movie.model";

export interface GetAllMoviesResp extends GetAllResp {
  movies: Movie[];
}
