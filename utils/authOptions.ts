import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/utils/db"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"


export const authOptions: AuthOptions = { 
    adapter: PrismaAdapter(db),
    providers: [
      Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
      }),
      Github({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'email', type: 'text' },
          password: { label: 'password', type: 'password' }
        },
  
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Ungültige Anmeldedaten');
          }
  
          const user = await db.user.findUnique({
            where: {
              email: credentials.email
            }
          });
  
          if (!user || !user?.password) {
            throw new Error('Ungültige Anmeldedaten');
          }
  
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
  
          if (!isCorrectPassword) {
            throw new Error('Ungültige Anmeldedaten');
          }
  
          return user;
        }
      })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
  } satisfies AuthOptions