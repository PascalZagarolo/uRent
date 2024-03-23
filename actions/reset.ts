'use server'

import * as z from "zod";


import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";


const ResetSchema = z.object({
    email: z.string().email({
      message: "Email ist benötigt",
    }),
  });

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Ungültige Email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email nicht gefunden!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  
  await sendPasswordResetEmail(
    passwordResetToken?.email,
    passwordResetToken?.token,
  );
  

  return { success: "Email gesendet!" };
}