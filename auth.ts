import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { addUserInfo } from "./lib/services/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { authenticationMethod } from "./types/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const isExistingUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
              authenticationMethod: "credentials",
            },
          });
          if (!isExistingUser || !isExistingUser.hashedPassword) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password as string,
            isExistingUser.hashedPassword
          );

          if (!passwordMatch) {
            return null;
          }

          return {
            email: isExistingUser.email,
            name: isExistingUser.name,
            id: isExistingUser.id,
            image: isExistingUser.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
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
        authenticationMethod:
          (account?.provider as authenticationMethod) ??
          ("" as authenticationMethod),
      });

      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider !== "credentials") {
          const dbUser = await prisma.user.findFirst({
            where: {
              email: user.email!,
              authenticationMethod: account.provider,
            },
          });

          if (dbUser) {
            token.dbId = dbUser.id;
            token.userImage = dbUser.image ?? user.image ?? "";
          }
        } else {
          token.dbId = user.id;
          token.userImage = user.image ?? "";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.dbId) {
        session.user.id = token.dbId as string;
        session.user.image = token.userImage as string;
      }
      return session;
    },
  },
});
