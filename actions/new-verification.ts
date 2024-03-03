"use server";


import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/utils/db";


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

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
      confirmedMail : true,
    }
  });

  setTimeout( async () => {
    await db.verificationToken.delete({
        where: { id: existingToken.id }
      });
  }, 2000)

  return { success: "Email erfolgreich verifiziert!" };
};