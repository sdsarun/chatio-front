export type ServerActionError = {
  message: string;
  code?: string;
};

export type ServerActionSuccess<Data = any> = {
  success: true;
  data: Data;
}

export type ServerActionFailed<Error extends ServerActionError = ServerActionError> = {
  success: false;
  error: Error[];
};

export type ServerActionResult<
  Data = any,
  Error extends ServerActionError = ServerActionError
> = ServerActionSuccess<Data> | ServerActionFailed<Error>;
