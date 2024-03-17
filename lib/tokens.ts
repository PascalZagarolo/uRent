import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import db from "@/db/drizzle";
import { resetPasswordToken,  verificationTokens } from "@/db/schema";
import { eq } from "drizzle-orm";

import { v4 as uuidv4 } from "uuid";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getPasswordResetTokenByEmail(email);
  
    if (existingToken) {
      const deletedToken = await db.delete(resetPasswordToken)
      .where(eq(resetPasswordToken.identifier, existingToken.id))
    }
  
    const passwordResetToken = await db.insert(resetPasswordToken).values({
      email,
      token,
      expires,
      identifier: uuidv4(),
    });
  
    return passwordResetToken;
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