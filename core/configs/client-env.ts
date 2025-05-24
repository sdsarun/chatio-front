import * as yup from "yup";
import { validateEnvAndFreeze } from "@/core/utils/common/env";

const clientEnvSchema = yup
  .object({
    hostChatioBackend: yup.string().required("Public Host backend URL is required")
  })
  .required();
  
export type ClientEnv = yup.InferType<typeof clientEnvSchema>;

const ClientEnv: ClientEnv = validateEnvAndFreeze({
  hostChatioBackend: process.env.NEXT_PUBLIC_HOST_CHATIO_BACKEND_URL || "http://localhost:3301"
}, clientEnvSchema);

export default ClientEnv;