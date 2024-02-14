import { fullUserSchema } from "@/schemas/user/user.schemas";
import { z } from "zod";

export type User = z.infer<typeof fullUserSchema>