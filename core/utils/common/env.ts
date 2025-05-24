import * as yup from "yup";
import { parseYupValidationError } from "@/core/utils/common/yup";

export function validateEnvAndFreeze<T extends yup.AnyObject>(
  env: T,
  schema: yup.ObjectSchema<T>
): Readonly<T> {
  try {
    schema.validateSync(env, { abortEarly: false });
    return Object.freeze(env);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const validationErrors = Object.values(parseYupValidationError(error)).map(
        (err) => `\x1b[31mMissing: ${err}\x1b[0m`
      );

      const errorMessage = [
        "\x1b[31m🚨 Environment Configuration Validation Failed 🚨\x1b[0m",
        "",
        ...validationErrors,
        "",
        "\x1b[33mTroubleshooting:\x1b[0m",
        "\x1b[33m- Ensure all required environment variables are set\x1b[0m",
        "\x1b[33m- Verify the values are correct and not empty\x1b[0m",
        "\x1b[33m- Check your .env file or deployment configuration\x1b[0m",
        ""
      ].join("\n");

      console.error(errorMessage);

      throw new Error("Invalid environment configuration");
    }
    throw error;
  }
}