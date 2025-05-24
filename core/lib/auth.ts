// core
import { type JWT } from "next-auth/jwt";
import NextAuth, { CredentialsSignin } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode"

// api
import { googleOAuthApi } from "@/core/services/client-api";
import { googleSignIn } from "@/core/services/auth/actions/google-signin";
import { guestSignIn } from "@/core/services/auth/actions/guest-signin";

// types
import type { UserInfoQuery } from "@/core/services/graphql/graphql";

const EXCLUDED_PATHS_REGEX: RegExp = /^\/(api|_next\/static|_next\/image|favicon\.ico|sitemap\.xml|robots\.txt)/;

class GuestSignInError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
    this.stack = undefined;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      type: "credentials",
      id: "guest-credential",
      name: "Guest Credential",
      async authorize() {
        try {
          const response = await guestSignIn();
          if (response.success) {
            const { accessToken, accessTokenExpInMS } = response.data;
            const { userInfo } = jwtDecode<{ userInfo: UserInfoQuery["user"] }>(accessToken);
            return {
              userInfo,
              token: {
                accessToken,
                accessTokenExpInMS
              }
            } as any;
          }

          return null;
        } catch {
          throw new GuestSignInError("Guest sign-in failed. Please try again later.");
        }
      }
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/new-user",
    error: "/auth/error"
  },
  callbacks: {
    async authorized({ request, auth }) {
      const { pathname, origin } = request.nextUrl;

      // skip nextjs
      if (EXCLUDED_PATHS_REGEX.test(pathname)) {
        return true;
      }

      const isAuthenticated = !!auth?.user;

      if (isAuthenticated) {
        const userAuth = auth.user!;
        const { accessTokenExpInMS } = auth.token!;

        const isAccessTokenExpired = Date.now() > accessTokenExpInMS;
        if (isAccessTokenExpired) {
          return false;
        }

        // user can't access /signin
        const bypassAuthenticatedPaths: string[] = ["/", "/auth", "/auth/signin"];
        const isProtectedRoutes = pathname.startsWith("/c");

        // user complete profile yet?
        const isUserProfileCompleted: boolean = !!userAuth?.userGender;
        if (!isUserProfileCompleted && (bypassAuthenticatedPaths.includes(pathname) || isProtectedRoutes)) {
          if (pathname !== "/auth/onboarding") {
            return NextResponse.redirect(new URL("/auth/onboarding", origin));
          }
        }

        if (isUserProfileCompleted && pathname === "/auth/onboarding") {
          return NextResponse.redirect(new URL("/c/new", origin));
        }

        if (isUserProfileCompleted && bypassAuthenticatedPaths.includes(pathname)) {
          return NextResponse.redirect(new URL("/c/new", origin));
        }
      } else {
        if (
          pathname.includes("/auth/onboarding") ||
          pathname.startsWith("/c") ||
          pathname === "/"
        ) {
          return false;
        }
      }

      return true;
    },
    async signIn({ account, profile }) {
      if (account) {
        const { provider } = account;

        switch (provider) {
          case "google": {
            try {
              const response = await googleSignIn({ idToken: account.id_token! });
              if (response.success) {
                const { accessToken, accessTokenExpInMS } = response.data;
                const { userInfo } = jwtDecode<{ userInfo: UserInfoQuery["user"] }>(accessToken);

                if (profile) {
                  profile.internal = {
                    userInfo,
                    token: {
                      accessToken,
                      accessTokenExpInMS
                    }
                  }
                }
              } else {
                return `/auth/signin?code=${encodeURIComponent(response.message)}`;
              }
            } catch {
              return `/auth/signin?code=${encodeURIComponent("Google sign-in failed. Please try again later.")}`;
            }

            break;
          }
          case "guest-credential": {
            break;
          }
        }
      }

      return true;
    },
    async jwt({ account, token, profile, trigger, session, user }) {
      switch (trigger) {
        case "update": {
          (token as any).internal = {
            ...token?.internal,
            userInfo: {
              ...token?.internal?.userInfo,
              ...session
            }
          }
          break;
        }
      }

      if (account) {
        const { provider } = account;
        switch (provider) {
          case "google": {
            token.idToken = account.id_token;
            token.accessToken = account.access_token;
            token.refreshToken = account.refresh_token;
            token.expiresAt = account.expires_at;
            token.internal = profile?.internal
            break;
          }
          case "guest-credential": {
            (token as any).internal = user;
            break;
          }
        }
      }

      if (account?.type === "oauth" && account.provider === "google") {
        return await refreshGoogleToken(token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token.internal) {
        (session as any).user = token.internal.userInfo;
        session.token = token.internal.token;
      }

      return session;
    }
  }
});

async function refreshGoogleToken(token: JWT): Promise<JWT> {
  try {
    const params: Record<string, any> = {
      client_id: process.env.AUTH_GOOGLE_ID as string,
      client_secret: process.env.AUTH_GOOGLE_SECRET as string,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken
    };

    const response = await googleOAuthApi("/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(params).toString()
    });

    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
    };
  } catch (error) {
    console.error("RefreshAccessTokenError", error);
    return {
      ...token,
      error: "RefreshAccessTokenError"
    };
  }
}

// name: 'Jason asdfasdf Dev',
// email: 'jasonq.dev@gmail.com',
// picture: 'https://lh3.googleusercontent.com/a/ACg8ocJUm25sBHmmwcLQYTpDSr9pKPlh9q0R7_nBdsPQu6DEU6EwcQ=s96-c',
// sub: '1969b984-32c6-4c57-b818-1bc7b0d6b0f4',
// accessToken: 'ya29.a0AeXRPp7XCa5m0ugdopdEDDMhK3lrw611zQVZRSljhhSglihEbimaBaAjNH5hwJMOlMZ_DSF6u14xuon_AHNNOWG-91iVkiKzi8fX2qoN7qLlXJCDZanJZFOhd4A4bq-djXI3dRTPw4fHKDJUfcfg6LaOTRkAFgUG-qRz6_NsaCgYKAUkSARASFQHGX2Mi1fHEM4WZ1XNdje_JT7z6xw0175',
// refreshToken: '1//0gouSGZQMCnx5CgYIARAAGBASNwF-L9IrgdoCd8undhL5woWotbgd8cOoA-Xoec4ytYAw6GQY2RdXUUgRB4Ldd5Kcqz5mTdVw4d0',
// expiresAt: 1742739975, from google access token
// iat: 1742736425,
// exp: 1745328425, from next-auth token
// jti: '76ad6c42-84be-42bb-98a2-557fd8d863df'
