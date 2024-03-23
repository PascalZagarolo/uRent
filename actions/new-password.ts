"use server";

import * as z from "zod";
import bcrypt from "bcrypt";


import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import db from "@/db/drizzle";
import { resetPasswordToken, users } from '../db/schema';
import { eq } from "drizzle-orm";


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

  await db.update(users).set({
    password : hashedPassword
  }).where(eq(users.id, existingUser.id))

  await db.delete(resetPasswordToken).where(eq(resetPasswordToken.identifier, existingToken.identifier))

  return { success: "Password geändert!" };
};