import { ErrorStatusCode, abortError } from "@/constants";
import { zodErrorByPath } from "@/schemas";
import { AxiosError } from "axios-clone";
import { ZodError, ZodIssue } from "zod";

export function handleError (error: Error): string{
  if (error.name === abortError) return 'Tiempo de espera excedido';
  if (error instanceof ZodError) return zodError(error.issues);
  if (error instanceof AxiosError) {
    const axiosError = error.response.data.error.message;
    if (typeof axiosError === 'string') return axiosError;
    if (Array.isArray(axiosError)) return axiosError[0].message;
  }

  let status = getStatus(error);

  if (status) {
    const statusError = handleErrorByStatus(status);
    if (statusError) return statusError
  }
  
  return error.message;
}

function handleErrorByStatus(status: number): string | undefined{
  if (status === ErrorStatusCode.ServiceUnavailable) 
    return 'No es posible mostrar las peliculas. Intente reconectarse más tarde.';

  if (status === ErrorStatusCode.BadRequest) 
    return 'Solicitud Erronea';

  if(status === ErrorStatusCode.Unauthorized){
    return 'Usuario invalido'
  }
}

function zodError(issues: ZodIssue[]): string{
  const paths = issues.flatMap(issue => issue.path);

  let msg = '';
  for (const path of paths) msg += zodErrorByPath[path];
  
  return msg;
}

function getStatus(error: Error): number | undefined{
  if (error instanceof AxiosError) return error.response.status;
  if ('status' in error) return error.status as number;
}