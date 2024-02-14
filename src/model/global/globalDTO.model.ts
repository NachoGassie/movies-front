export interface GetAllResp{
  totalCount: number;
  pagesCount: string;
  next: string | null;
  prev: string | null;
}

export interface ErrorResp{
  error: { message: string }
}