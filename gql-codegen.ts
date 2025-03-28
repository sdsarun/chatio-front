import type { CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from "@next/env"

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  schema: `${process.env.HOST_CHATIO_BACKEND_URL}/graphql`,
  documents: ['core/**/*.tsx', 'features/**/*.tsx'],
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