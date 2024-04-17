"use server";

import * as z from "zod";
import bcrypt from "bcrypt";


import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import db from "@/db/drizzle";
import { resetPasswordToken, sessionTable, userTable } from '../db/schema';
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";


const NewPasswordSchema = z.object({
    password : z.string().min(3, {
        message : "Passwort ist zu kurz"
    })
  });

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema> ,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Fehlender Token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ungültige Felder!" };
  }

  const { password } = validatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Ungültiger Token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token ist abgelaufen!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email ist nicht existent!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //update Password
  await db.update(userTable).set({
    password : hashedPassword
  }).where(eq(userTable.id, existingUser.id))

  //logout all other sessions
  await db.delete(sessionTable).where(eq(sessionTable.userId, existingUser.id));

  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  })

  await db.delete(resetPasswordToken).where(eq(resetPasswordToken.identifier, existingToken.identifier));

  

  const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )

  return { success: "Password geändert!" };
};