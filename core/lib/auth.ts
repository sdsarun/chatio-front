import { googleOAuthApi } from "@/core/services/api";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
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
    signIn: "/"
  },
  callbacks: {
    async authorized() {
      // return !!auth?.user;
      return true;
    },
    async signIn({}) {
      return true;
    },
    async jwt({ account, token }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      // return token;
      return refreshGoogleToken(token);
    },
    async session({ session, token }) {
      session.token = {
        idToken: token.idToken,
        expiresAt: token?.expiresAt || 0
      };
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
