import { NewUserSignUp, UserLoginReqSchema } from "@/schemas/user/user.schemas";
import { User } from "./user.model";
import { z } from "zod";

export type UserLoginReq = z.infer<typeof UserLoginReqSchema>
export type UserSignupReq = z.infer<typeof NewUserSignUp>

export interface UserLoginResp{
  user: User;
  token: string;
}