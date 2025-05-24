"use server"

// core
import { chatioRestApi } from "@/core/services/server-api";

// types
import type { ApiResponse } from "@/core/types/service";

export type GuestSignInResponse = ApiResponse<{
  accessToken: string;
  accessTokenExpInMS: number;
}>;

export async function guestSignIn(): Promise<GuestSignInResponse> {
  const guestSignInResponse = await chatioRestApi("/v1/auth/guest", {
    method: "POST",
  });
  return guestSignInResponse.json();
}