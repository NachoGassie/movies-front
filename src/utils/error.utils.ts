import { StatusCode } from "@/constants";
import { ZodError, ZodIssue } from "zod";

const zodErrorByPath: { [key: string]: string } = {
  order: "Order invalido, pruebe con 'id' - 'titulo' - 'genero' - 'anio_lanzamiento' ",
  sort: "Sort invalido, pruebe con 'asc' - 'desc' ",
  idGenero: "Idgen debe ser un número entero positivo",
}

export function handleError (error: Error, ): string{
  if (error instanceof ZodError) return zodError(error.issues);

  return error.message;
}

export function handleErrorByStatus(status: number){
  if (status === StatusCode.ServiceUnavailable) {
    return 'Error inesperado. Intente reconectarse más tarde.'
  }
}

function zodError(issues: ZodIssue[]): string{
  const paths = issues.flatMap(issue => issue.path);

  let msg = '';

  for (const path of paths) {
    msg += zodErrorByPath[path];
  }
  
  return msg;
}