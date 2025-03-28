import { chatioGraphQLApi } from '@/core/services/api'
import type { TypedDocumentString } from './graphql'
 
export async function executeGraphQL<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await chatioGraphQLApi('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    })
  })
 
  if (!response.ok) {
    throw new Error(`GraphQL query failed with status: ${response.status} - ${response.statusText}`)
  }
 
  return response.json() as TResult
}