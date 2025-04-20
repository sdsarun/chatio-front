import { ExecutionResult, GraphQLError } from "graphql";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { executeGraphQL } from "@/core/services/graphql/execute";
import type { TypedDocumentString } from "@/core/services/graphql/graphql";

export function useGraphQL<TResult, TVariables>(
  gqlPayload: TVariables extends Record<string, never>
    ? { document: TypedDocumentString<TResult, TVariables> }
    : { document: TypedDocumentString<TResult, TVariables>; variables: TVariables },
  options?: Omit<
    UseQueryOptions<ExecutionResult<TResult>, ReadonlyArray<GraphQLError>, TResult, readonly unknown[]>,
    "queryKey" | "queryFn"
  >
) {
  const { document } = gqlPayload;
  const variables = "variables" in gqlPayload ? gqlPayload.variables : undefined;

  if (document.toString().includes("$") && !variables) {
    throw new Error("Variables are required for this query.");
  }

  return useQuery({
    queryKey: [document, variables],
    queryFn: async ({ queryKey }) => {
      const [doc, vars] = queryKey as [any, any];
      const resultData = (await executeGraphQL(doc, vars)) as ExecutionResult<TResult>;

      if (resultData?.errors && resultData.errors.length > 0) {
        throw resultData.errors;
      }

      return resultData;
    },
    select: ({ data }) => data,
    ...options
  });
}