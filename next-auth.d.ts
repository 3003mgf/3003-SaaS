import NextAuth, { DefaultSession } from "next-auth";

// The Default Session only brings EMAIL, NAME & IMAGE
// But we also need the ID, we extend the DefaultSession type so TS don't throw us error
declare module 'next-auth' {
  interface Session {
    firebaseToken?: string;
    user: {
      id: string
    } & DefaultSession["user"]
  }
}