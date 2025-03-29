import { parseYupValidationError } from "@/core/utils/common/yup";
import * as yup from "yup";

const publicEnvSchema = yup
  .object({
    hostChatioBackend: yup.string().required("Public Host backend URL is required")
  })
  .required();

const privateEnvSchema = yup
  .object({
    googleId: yup
      .string()
      .required("Google Client ID is required")
      .min(1, "Google Client ID cannot be empty"),
    googleSecret: yup
      .string()
      .required("Google Client Secret is required")
      .min(1, "Google Client Secret cannot be empty")
  })
  .required();

export type PublicEnv = yup.InferType<typeof publicEnvSchema>;
export type PrivateEnv = yup.InferType<typeof privateEnvSchema>;

function validateEnvAndFreeze<T extends yup.AnyObject>(
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

const publicEnv = validateEnvAndFreeze(
  {
    hostChatioBackend: process.env.NEXT_PUBLIC_HOST_CHATIO_BACKEND_URL || "http://localhost:3301"
  },
  publicEnvSchema
);

let privateEnv: PrivateEnv | undefined;
if (typeof window === "undefined") {
  privateEnv = validateEnvAndFreeze(
    {
      googleId: process.env.AUTH_GOOGLE_ID || "",
      googleSecret: process.env.AUTH_GOOGLE_SECRET || ""
    },
    privateEnvSchema
  );
}

const isProduction: boolean = process.env.NODE_ENV === "production";
const isDevelopment: boolean = process.env.NODE_ENV === "development";
const isTest: boolean = process.env.NODE_ENV === "test";

export { publicEnv };
export { privateEnv };
export { isProduction, isDevelopment, isTest };
