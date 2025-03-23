import { ValidationErrors } from "@/core/utils/common/yup";

export type ServerActionResponseSuccess<
  SuccessResult extends Record<string, any> = Record<string, any>
> = {
  status: "request/success";
  result?: SuccessResult;
};

export type ServerActionResponseFailed<
  FailedResult extends Record<string, any> & { message?: string } = Record<string, any> & {
    message?: string;
  }
> = {
  status: "request/failed";
  reason?: FailedResult;
};

export type ServerActionValidationError<Error extends Record<string, any> = Record<string, any>> = {
  status: "error/validation";
  error?: ValidationErrors<Error>;
};

export type ServerActionUnExptectedError<Error = unknown> = {
  status: "error/unexpected";
  error: Error;
};

export type ServerActionState<
  SuccessResult extends Record<string, any> = Record<string, any>,
  FailedResult extends Record<string, any> & { message?: string } = Record<string, any> & {
    message?: string;
  },
  ValidationError extends Record<string, any> = Record<string, any>,
  UnExpectedError = unknown
> =
  | ServerActionResponseSuccess<SuccessResult>
  | ServerActionResponseFailed<FailedResult>
  | ServerActionValidationError<ValidationError>
  | ServerActionUnExptectedError<UnExpectedError>;