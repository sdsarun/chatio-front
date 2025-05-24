// core
import { chatioGraphQLApi } from '@/core/services/client-api';

// types
import type { TypedDocumentString } from './graphql'
import type { ExecutionResult } from 'graphql'

interface ExecuteGraphQLOptions {
  requestOptions?: RequestInit;
}

export async function executeGraphQL<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...args: TVariables extends Record<string, never>
    ? [options?: ExecuteGraphQLOptions]
    : [variables: TVariables, options?: ExecuteGraphQLOptions]
): Promise<ExecutionResult<TResult>> {
  const [maybeVariables, maybeOptions] = args;
  const variables = (args.length > 1 ? maybeVariables : undefined) as TVariables | undefined;
  const options = (args.length > 1 ? maybeOptions : maybeVariables) as ExecuteGraphQLOptions | undefined;

  const response = await chatioGraphQLApi('/graphql', {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    ...options?.requestOptions,
  });

  if (!response.ok) {
    throw new Error(`GraphQL query failed with status: ${response.status} - ${response.statusText}`);
  }

  return response.json() as ExecutionResult<TResult>;
}
