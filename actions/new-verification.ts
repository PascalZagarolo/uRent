"use server";


import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import db from "@/db/drizzle";
import { notification, userTable, verificationTokens } from "@/db/schema";
import { sendWelcomeMail } from "@/lib/mail";
import { and, eq } from "drizzle-orm";




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
    emailVerified: new Date(),
    email: existingToken.email,
    confirmedMail: true
  }).where(eq(userTable.id, existingUser.id))

  const usedMessage = `Willkommen bei urent! Wir freuen uns, dich als neuen Nutzer begrüßen zu dürfen. Bei Fragen oder Problemen kannst du dich jederzeit an uns wenden.`

  const existingWelcomeMessage = await db.query.notification.findFirst({
    where: and(
      eq(notification.userId, existingUser.id),
      eq(notification.notificationType, "WELCOME")
    )
  })

  //@ts-ignore
  if(!existingWelcomeMessage) {
    await db.insert(notification).values({
      userId: existingUser?.id as string,
      content: usedMessage,
      notificationType: "WELCOME"
    })

    await sendWelcomeMail(existingToken.email);
  }

  

  setTimeout(async () => {
    await db.delete(verificationTokens).where(eq(verificationTokens.email, existingToken.email))
  }, 1000)

  return { success: "Email erfolgreich verifiziert!" };
};