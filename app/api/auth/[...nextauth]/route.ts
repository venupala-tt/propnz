import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        remember: { label: "Remember Me", type: "boolean" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // default 1 day
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (user) {
        token.user = user;
      }

      // If "remember" flag was passed, extend session
      if (session?.remember) {
        token.remember = true;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.remember = token.remember || false;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return "/dashboard";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
