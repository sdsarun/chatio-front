import "server-only"

import * as yup from "yup";
import { validateEnvAndFreeze } from "@/core/utils/common/env";

const serverEnvSchema = yup
  .object({
    googleId: yup
      .string()
      .required("Google Client ID is required")
      .min(1, "Google Client ID cannot be empty"),
    googleSecret: yup
      .string()
      .required("Google Client Secret is required")
      .min(1, "Google Client Secret cannot be empty"),
    publicApiKey: yup.string().required("Public api key is required")
  })
  .required();
  
export type ServerEnv = yup.InferType<typeof serverEnvSchema>;

const ServerEnv: ServerEnv = validateEnvAndFreeze({
  googleId: process.env.AUTH_GOOGLE_ID || "",
  googleSecret: process.env.AUTH_GOOGLE_SECRET || "",
  publicApiKey: process.env.PUBLIC_API_KEY || "",
}, serverEnvSchema);

export default ServerEnv;