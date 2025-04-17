"use server"

// core
import { auth, signOut } from "@/core/lib/auth"
import { executeGraphQL } from "@/core/services/graphql/execute";

// graphql
import { GetUserInfoQuery } from "@/core/services/auth/graphql/queries";

// types
import type { Session } from "next-auth";

export type VerifysessionOptions = {
  redirectTo?: string;
}

export type VerifySessionResult = Session | null;

export async function verifySession(options: VerifysessionOptions = {}): Promise<VerifySessionResult> {
  const { redirectTo } = options;

  const session = await auth();
  if (!session) {
    await signOut({ redirect: !!redirectTo, redirectTo });
    return null;
  }

  const { errors } = await executeGraphQL(GetUserInfoQuery, { username: session.user!.username! }, {
    requestOptions: {
      headers: { Authorization: `Bearer ${session.token?.accessToken}` }
    }
  });

  if (errors) {
    await signOut({ redirect: !!redirectTo, redirectTo });
    return null;
  }

  return session;
}