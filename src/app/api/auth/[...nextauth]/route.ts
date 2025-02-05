import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
            label: "Username:",
            type: "text",
            placeholder: "your-cool-username"
        },
        password: {
            label: "Password:",
            type: "password",
            placeholder: "your-awesome-password"
        }
      },
      async authorize(credentials) {
          // This is where you need to retrieve user data 
          // to verify with credentials
          // Docs: https://next-auth.js.org/configuration/providers/credentials
          const user = { id: "1", name: "john@email.com", password: "1234" }

          return user;
      }
    }),
  ],
  // session: {
  //   strategy: 'jwt',
  // },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log('user signIn', user);
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     console.log('user redirect', baseUrl);
  //     return baseUrl;
  //   },
  //   session: async ({ session, token, user }) => {
  //     console.log('user session', session);
  //     return session;
  //   },
  //   jwt: async ({ token, user, account, profile, isNewUser }) => {
  //     console.log('user jwt', token);
  //     return token;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
