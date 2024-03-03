import { Genre } from "./genre.model";
import { GetAllResp } from "../global/globalDTO.model";

export interface GetAllGenresResp extends GetAllResp {
  genres: Genre[];
}