import { UserLoginReqSchema } from "@/schemas/user/user.schemas";
import { User } from "./user.model";
import { z } from "zod";

export type UserLoginReq = z.infer<typeof UserLoginReqSchema>

export interface UserLoginResp{
  user: User;
  token: string;
}