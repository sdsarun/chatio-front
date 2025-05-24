"use server"

// core
import { chatioRestApi } from "@/core/services/server-api";

// types
import type { ApiResponse } from "@/core/types/service";

export type GoogleSignInDTO = {
  idToken: string;
}

export type GoogleSignInResponse = ApiResponse<{
  accessToken: string;
  accessTokenExpInMS: number;
}>;

export async function googleSignIn(
  dto: GoogleSignInDTO,
): Promise<GoogleSignInResponse> {
  const googleSignInResponse = await chatioRestApi("/v1/auth/google", {
    method: "POST",
    body: JSON.stringify(dto)
  });
  return googleSignInResponse.json();
}
