export type ApiResponseSuccess<Data = any> = {
  success: true;
  statusCode: number;
  message: string;
  data: Data;
};

export type ApiResponseError = {
  success: false;
  statusCode: number;
  message: string;
  error: {
    name: string;
    timestamp: string;
    requestPath: string;
    requestId: string;
  };
};

export type ApiResponse<Data = any> = ApiResponseSuccess<Data> | ApiResponseError;