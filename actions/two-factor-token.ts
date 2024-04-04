import db from "@/db/drizzle";
import { twoFactorToken } from "@/db/schema";
;
import { eq } from "drizzle-orm";


export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const foundTwoFactorToken = await db.query.twoFactorToken.findFirst({
      where: (
        eq(twoFactorToken.token, token)
      )
    });

    return foundTwoFactorToken;
  } catch {
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const findTwoFactorToken = await db.query.twoFactorToken.findFirst({
        where : (
            eq(twoFactorToken.email, email)
        )
    })

    return twoFactorToken;
  } catch {
    return null;
  }
};