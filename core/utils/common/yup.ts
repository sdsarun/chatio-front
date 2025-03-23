import type { ValidationError } from "yup";

export type ValidationErrors<ObjectSchema extends Record<string, any> = Record<string, any>> = Partial<Record<keyof ObjectSchema, string>>;

export function parseYupValidationError<ObjectSchema extends Record<string, any>>(
  error: ValidationError,
): ValidationErrors<ObjectSchema> {
  const errors: ValidationErrors<ObjectSchema> = {};

  for (const err of error.inner) {
    if (err.path) {
      errors[err.path as keyof ObjectSchema] = err.message;
    }
  }

  return errors;
}