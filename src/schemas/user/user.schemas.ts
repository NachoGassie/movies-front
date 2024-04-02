import { basicError, greaterThanError, stringLenghtError } from "../global/utils.schemas";
import { z } from "zod";

export const fullUserSchema = z.object({
  idUser: z
    .number(basicError("El id", "number"))
    .positive(greaterThanError("El id", 0)),
  email: z
    .string(basicError("El email", "string"))
    .email("El formato del email no es valido"),
  password: z
    .string(basicError("La contraseña", "string"))
    .min(5, stringLenghtError("La contraseña", 5)),
});

export const UserLoginReqSchema = fullUserSchema.omit({ idUser: true });

export const NewUserSignUp = fullUserSchema.extend({
  repeatPassword: z
    .string(basicError("La contraseña", "string"))
    .min(5, stringLenghtError("La contraseña", 5)),
}).refine((data) => data.password === data.repeatPassword, {
  message: "Las contraseñas deben ser iguales",
  path: ["repeatPassword"],
});

export const userResponseSchema = fullUserSchema.omit({ password: true });

export const updateUserSchema = UserLoginReqSchema.partial().refine(
    ({ email, password }) => email || password, "Se espera al menos un campo"
);