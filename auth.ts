import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { addUserInfo } from "./lib/services/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  session: {
    strategy: "jwt",
    maxAge: 10 * 365 * 24 * 60 * 60, // ~10 years
    updateAge: 24 * 60 * 60, // Optional: update token every 24 hours
  },
  callbacks: {
    async signIn({ user, account }) {
      await addUserInfo({
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? undefined,
        authenticationMethod: account?.provider ?? "",
      });

      return true;
    },
  },
});
