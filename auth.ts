import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import { adminAuth, adminDb } from "./firebase-admin";
import { FirestoreAdapter } from "@auth/firebase-adapter";


export const authOptions: NextAuthOptions = {
  secret: "#Blsmgfdk3",
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID!,
      clientSecret: process.env.TWITTER_SECRET!
    }),
  ],
  callbacks: {
    // For this we modified DefaultSession type in next-auth.d.ts
    session: async({session, token}) =>{
      if(session?.user){
        if(token.sub){
          session.user.id = token.sub;
          
          // We use the user id to create a custom token in Firebase
          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          session.firebaseToken = firebaseToken;
        }

      }
      return session;
    },
    // When we login using Next we receive a bunch of data in TOKEN, but not all the data is uploaded to Firebase, only NAME, EMAIL & IMAGE. We append the ID to user.id.
    jwt: async({user, token}) =>{
      if(user){
        token.sub = user.id;
      }
      return token;
    }
  },
  session:{
    strategy: "jwt"
  },
  adapter: FirestoreAdapter(adminDb)
} satisfies NextAuthOptions;