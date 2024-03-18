import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";


import Google from "next-auth/providers/google";
import { getUserByEmail } from "@/data/user";
import GitHub from "next-auth/providers/github";
import { LoginSchema } from "./app/(main)/_components/_schemas";
import Credentials from "next-auth/providers/credentials";
import { users } from "./db/schema";




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
    
    async authorize(credentials) {
      const validatedFields = LoginSchema.safeParse(credentials);
      console.log("test")
      if (validatedFields.success) {
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        console.log(user);
        if (!user || !user.password) return null;
        console.log("vorher")
        const passwordsMatch = await bcrypt.compare(
          password,
          user.password,
        );
        console.log("nachher")
        console.log(passwordsMatch);

        if(passwordsMatch) {
          console.log("Stimmt");
          return user;
        }
        
       
        
      }
      return null;
      
    }
    
  })
],
} satisfies NextAuthConfig