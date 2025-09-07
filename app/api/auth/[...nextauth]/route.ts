const handler = NextAuth({
  providers: [
    // ...credentials provider
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Always redirect to dashboard after login
      return "/dashboard";
    },
  },
});
