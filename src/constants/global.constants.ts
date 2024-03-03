export const BaseUrl = 'http://localhost:3040/api/v1';

export const abortError = 'AbortError';

export const ErrorStatusCode = {
  BadRequest: 400,
  Unauthorized: 401,
  NotFound: 404,
  InternalError: 500,
  ServiceUnavailable: 503,
}

export const OKStatusCode = {
  Created: 201,
}

export const StatusCode = {
  ...OKStatusCode,
  ...ErrorStatusCode,
}

export const ErrorStatusCodeArray = Object.values(ErrorStatusCode);
export const OKStatusCodeArray = Object.values(OKStatusCode);
export const StatusCodeArray = Object.values(StatusCode);