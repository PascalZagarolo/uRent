import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import  EmailProvider  from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from './db'
import bcrypt from "bcrypt"
import  CredentialsProvider  from "next-auth/providers/credentials";

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
          }), CredentialsProvider({
            name : 'credentials',
            credentials : {
              email : { label: 'email', type: 'text' },
              password : { label: 'password' , type: 'password'}
            },
            async authorize(credentials) {
              if(!credentials?.email || !credentials?.password) {
                throw new Error('Ungültige Zugangsdaten');
              }

              const user = await prisma.user.findUnique({
                where :{
                  email : credentials.email
                }
              });

              if(!user ||!user?.hashedPassword) {
                throw new Error('Ungültige Zugangsdaten');
              }

             const isCorrectPassword = await bcrypt.compare(
              credentials.password,
              user.hashedPassword
             )

             if(!isCorrectPassword){
              throw new Error('Ungültige Zugangsdaten')
             }

             return user;
            }
          })
    ],
    debug: process.env.NODE_ENV === "development",
    session : {
      strategy : "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions


