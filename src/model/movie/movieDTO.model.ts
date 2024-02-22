import { GetAllResp } from "../global/globalDTO.model";
import { MovieFromDb } from "./movie.model";

export interface GetAllMoviesResp extends GetAllResp {
  movies: MovieFromDb[];
}