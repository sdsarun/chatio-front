import { parseYupValidationError } from '@/core/utils/common/yup';
import * as yup from 'yup';

// Environment Configuration Type
export type Env = {
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
  hostChatIOBackend: string;
  googleId: string;
  googleSecret: string;
};

const envSchema = yup.object({
  isProduction: yup.boolean().required(),
  isDevelopment: yup.boolean().required(),
  isTest: yup.boolean().required(),
  hostChatIOBackend: yup.string().required('Host backend URL is required'),
  googleId: yup.string().required('Google Client ID is required').min(1, 'Google Client ID cannot be empty'),
  googleSecret: yup.string().required('Google Client Secret is required').min(1, 'Google Client Secret cannot be empty')
}).required();

function validateEnv(env: Env): Env {
  try {
    envSchema.validateSync(env, { abortEarly: false });
    return Object.freeze(env);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const validationErrors = Object.values(parseYupValidationError(error)).map(
        (err) => `\x1b[31mMissing: ${err}\x1b[0m`
      );

       const errorMessage = [
        '\x1b[31m🚨 Environment Configuration Validation Failed 🚨\x1b[0m',
        '',
        ...validationErrors,
        '',
        '\x1b[33mTroubleshooting:\x1b[0m',
        '\x1b[33m- Ensure all required environment variables are set\x1b[0m',
        '\x1b[33m- Verify the values are correct and not empty\x1b[0m',
        '\x1b[33m- Check your .env file or deployment configuration\x1b[0m',
        '',
      ].join('\n');
      
      console.error(errorMessage);
      
      throw new Error('Invalid environment configuration');
    }
    throw error;
  }
}

// Create Environment Configuration
const env: Env = {
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",
  hostChatIOBackend: process.env.HOST_CHATIO_BACKEND_URL || "http://localhost:3301",
  googleId: process.env.AUTH_GOOGLE_ID || "",
  googleSecret: process.env.AUTH_GOOGLE_SECRET || ""
};

// Export validated and frozen environment configuration
export default validateEnv(env);