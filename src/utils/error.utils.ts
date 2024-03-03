import AxiosErrorClone from "@/axiosClone/axiosError";
import { ErrorStatusCode, abortError } from "@/constants";
import { zodErrorByPath } from "@/schemas";
import { ZodError, ZodIssue } from "zod";

export function handleError (error: Error): string{
  if (error.name === abortError) return 'Tiempo de espera excedido';
  if (error instanceof ZodError) return zodError(error.issues);
  if (error instanceof AxiosErrorClone) return error.response.data.error.message

  let status = getStatus(error);

  if (status) {
    const statusError = handleErrorByStatus(status);
    if (statusError) return statusError
  }
  
  return error.message;
}

function handleErrorByStatus(status: number){
  if (status === ErrorStatusCode.ServiceUnavailable) 
    return 'No es posible mostrar las peliculas. Intente reconectarse más tarde.';

  if (status === ErrorStatusCode.BadRequest) 
    return 'Solicitud Erronea';
  
}

function zodError(issues: ZodIssue[]): string{
  const paths = issues.flatMap(issue => issue.path);

  let msg = '';
  for (const path of paths) msg += zodErrorByPath[path];
  
  return msg;
}

function getStatus(error: Error): number | null{
  if (error instanceof AxiosErrorClone) return error.response.status;
  if ('status' in error) return error.status as number;
  return null;
}