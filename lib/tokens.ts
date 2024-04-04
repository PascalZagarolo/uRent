import crypto from "crypto";

import { getTwoFactorTokenByEmail } from "@/actions/two-factor-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import db from "@/db/drizzle";
import { resetPasswordToken,  twoFactorToken,  verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

import { v4 as uuidv4 } from "uuid";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if(existingToken) {
    await db.delete(twoFactorToken).where(eq(twoFactorToken.id, existingToken.id))
  }

  const createdTwoFactorToken = await db.insert(twoFactorToken).values({
    email : email,
    token : token,
    expires : expires,
  })

  return createdTwoFactorToken;
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getPasswordResetTokenByEmail(email);
  
    if (existingToken) {
      const deletedToken = await db.delete(resetPasswordToken)
      .where(eq(resetPasswordToken.identifier, existingToken.identifier))
    }
  
    const passwordResetToken = await db.insert(resetPasswordToken).values({
      email,
      token,
      expires,
      identifier: uuidv4(),
    }).returning();
  
    return passwordResetToken[0];
  }

export const generateVerificationToken = async (email : string) => {
    

  const token = uuidv4();
  //expires tokens in 1h
  const expires = new Date(new Date().getTime() + 3600 * 1000 );

  const existingToken = await getVerificationTokenByEmail(email);

  if(existingToken) {
     await db.delete(verificationTokens)
      .where(eq(verificationTokens.identifier, existingToken.identifier))
  }

  const verificationToken = await db.insert(verificationTokens).values({
    email,
    token,
    expires,
    identifier: uuidv4(),
  }).returning()

  return verificationToken[0];
}