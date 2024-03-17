import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "@auth/core/providers/credentials"
import db from "./db/drizzle"
import { eq } from "drizzle-orm"
import { users } from "./db/schema"
import bcrypt from 'bcrypt';

export default {
  providers: [
    GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }), 
    Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  Credentials({
    //@ts-ignore
    async authorize(credentials : { email : string, password : string }) {
        const { email, password } = credentials;

        const user = await db.query.users.findFirst({
            where : eq(users.email, email)
        })

        if(!user || !user.password){
            return null;
        };

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if(passwordsMatch) {
          return user
        };
        

       return null;
    }
  })
],
} satisfies NextAuthConfig