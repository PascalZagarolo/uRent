import db from "@/db/drizzle";
import { twoFactorConfirmation } from "@/db/schema";
import { eq } from "drizzle-orm";


export const getTwoFactorConfirmationByUserId = async (
  userId: string
) => {
  try {
    const findTwoFactorConfirmation = await db.query.twoFactorConfirmation.findFirst({
      where: eq(twoFactorConfirmation.userId, userId)
    });

    return findTwoFactorConfirmation;
  } catch {
    return null;
  }
};