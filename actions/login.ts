"use server";






import { getUserByEmail } from "@/data/user";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/app/(main)/_components/_schemas";
import { z } from "zod";
import { getTwoFactorTokenByEmail } from "./two-factor-token";
import { twoFactorToken } from "@/db/schema";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { getTwoFactorConfirmationByUserId } from "./two-factor-confirmation";
import { twoFactorConfirmation } from '../db/schema';
import { setLocalStorage } from "./setLocalStorage";
import bcrypt from 'bcrypt';
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";








export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  
  

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, code } = validatedFields.data;
  

  const existingUser = await getUserByEmail(email);

  

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email existiert nicht" }
  }



  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Bitte bestätige deine Email-Addresse" };
  }
 
  if (existingUser.usesTwoFactor && existingUser.email) {

    const passwordsMatch = await bcrypt.compare(password, existingUser.password);

    if(!passwordsMatch){
      return { error : "Ungültige Anmeldedaten"}
    }

    if (code) {
      const receivedTwoFactorToken = await getTwoFactorTokenByEmail(
        existingUser.email
      );

      

      if (!receivedTwoFactorToken) {
        return { error: "Ungültiger Code!" };
      }

      if (receivedTwoFactorToken.token !== code) {
        return { error: "Ungültiger Code" };
      }

      const hasExpired = new Date(receivedTwoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code abgelaufen" };
      }

      await db.delete(twoFactorToken).where(eq(twoFactorToken.email, existingUser.email));

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.delete(twoFactorToken).where(eq(twoFactorToken.id, existingConfirmation.id));
      }

      await db.insert(twoFactorConfirmation).values({
        userId: existingUser.id,
      })
    } else {
      const generatedTwoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        generatedTwoFactorToken.email,
        generatedTwoFactorToken.token,
      );

      return { twoFactor: true };
    }
  }

  try {
    

      const passwordsMatch = await bcrypt.compare(password, existingUser.password);

      

      if(passwordsMatch) {
        const session = await lucia.createSession(existingUser.id, {
          expiresIn: 60 * 60 * 24 * 30,
        })

        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )

        return {
          success : "Erfolgreich eingeloggt",
        };

      }

      

  
    
    
  } catch (error : any) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Ungültige Anmeldedaten" }
        default:
          return { error: "Etwas ist schief gelaufen" }
      }
    }

    return { error: "Etwas ist schief gelaufen" }

    throw error;
  }
};