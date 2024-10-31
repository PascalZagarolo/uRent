"use server";

import * as z from "zod";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { RegisterSchema } from "@/app/(main)/_components/_schemas";

import bcrypt from "bcrypt";
import db from "@/db/drizzle";
import { userTable } from "@/db/schema";
import { generateId } from "lucia";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { generateCodeVerifier, generateState } from "arctic";

import { google } from "@/lib/lucia/oauth";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ungültige Angaben" };
  }

  const { email, password, name, receivesEmails } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email existiert bereits" };
  }

 

  try {

    const userId = generateId(15)

    await db.insert(userTable)
      .values({
        id: userId,
        name: name,
        email: email,
        password: hashedPassword,
        sharesRealName : false,
        sharesEmail : false,
        sharesPhoneNumber : false,
        newsletter: receivesEmails
      })
      .returning({
        id: userTable.id,
        name: userTable.name,
      })


      /*
    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    })

    const sessionToken = lucia.createSessionCookie(session.id);
    
    cookies().set(sessionToken.name, sessionToken.value, sessionToken.attributes);
*/
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

  } catch (error: any) {
    console.log(error);
    error: "Fehler beim Registrieren"
  }


  return { success: "Bitte bestätige deine Email-Addresse." };
};


export const createAuthorizationURL = async () => {

 try {
  
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  cookies().set("codeVerifier", codeVerifier, {
    httpOnly: true,
  })

  cookies().set("state", state, {
    httpOnly: true,
  })

  const authorizationURL = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["email", "profile"]
  });

  return {
    success : true,
    data : authorizationURL
  }


 } catch(error : any) {
  console.log(error)
  return { error : "Fehler beim Erstellen der Autorisierungs URL" }
 }
}

//const tokens = await google.validateAuthorizationCode(code);