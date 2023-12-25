import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import  EmailProvider  from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";



export const authOptions = {
    
    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET_ID!
          }), 
    ]
} satisfies NextAuthOptions