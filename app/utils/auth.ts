import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import  EmailProvider  from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from './db'

import type { Adapter } from "next-auth/adapters"



function getPrismaAdapter(): Adapter {
  return PrismaAdapter(prisma) as Adapter
}


export const authOptions = {

  adapter : getPrismaAdapter(),
    
    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET_ID!
          }), EmailProvider({
            server: {
              host: process.env.EMAIL_SERVER_HOST,
              port: process.env.EMAIL_SERVER_PORT,
              auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
              }
            },
            from: process.env.EMAIL_FROM
          }),
    ]
} satisfies NextAuthOptions