import type { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from "@next/env"

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_HOST_CHATIO_BACKEND_URL}/graphql`,
  documents: ['core/**/*.{ts,tsx}', 'features/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './core/services/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
    './core/services/graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  }
}
 
export default config