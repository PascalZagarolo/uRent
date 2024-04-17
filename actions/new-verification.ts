"use server";


import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import db from "@/db/drizzle";
import { userTable, verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";




export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Der angegebene Link funktioniert nicht." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Email abgelaufen" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Account existiert nicht." };
  }

 await db.update(userTable).set({
  emailVerified : new Date(),
  email : existingToken.email,
  confirmedMail : true
 }).where(eq(userTable.id, existingUser.id))

  setTimeout(async () => {
    await db.delete(verificationTokens).where(eq(verificationTokens.email, existingToken.email))
  },1000)

  return { success: "Email erfolgreich verifiziert!" };
};