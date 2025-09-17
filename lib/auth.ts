// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Example DB lookup
async function getUser(email: string, password: string) {
  if (email === "admin@site.com" && password === "admin123") {
    return { id: "1", name: "Admin User", email, role: "admin" };
  } else if (email === "user@site.com" && password === "user123") {
    return { id: "2", name: "Regular User", email, role: "user" };
  }
  return null;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUser(
          credentials?.email as string,
          credentials?.password as string
        );
        if (user) return user;
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role;
      return session;
    },
  },
};
