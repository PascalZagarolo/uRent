import db from "@/db/drizzle";
import { resetPasswordToken } from "@/db/schema";
import { eq } from "drizzle-orm";



export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const foundToken = await db.query.resetPasswordToken.findFirst({
      where : (
        eq(resetPasswordToken.token, token)
      )
    })

    return foundToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const foundToken = await db.query.resetPasswordToken.findFirst({
      where : (
        eq(resetPasswordToken.email, email)
      )
    })

    return foundToken;
  } catch {
    return null;
  }
};