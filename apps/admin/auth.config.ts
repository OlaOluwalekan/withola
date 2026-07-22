import type { NextAuthConfig } from "next-auth";

// This config is Edge-compatible (no Prisma, no bcrypt)
// Used only by middleware for session/route protection
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return true;
      }
      return isLoggedIn; // Redirect unauthenticated users to login page
    },
  },
  providers: [], // Providers are added in auth.ts (Node.js only)
};
