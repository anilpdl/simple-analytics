import NextAuth, { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Google from "next-auth/providers/google"

import { prisma } from "@/prisma"

export const authConfig: NextAuthConfig = {
  providers: [Google],
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user, token }) {
      session.user.id = token.sub
      return session
    },
  }
})
