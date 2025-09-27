export type WSError = {
  statusCode: number;
  message: string;
  detail?: any;
};

export interface WSResponse<T = any> {
  data: T | null;
  error: WSError | null;
}
