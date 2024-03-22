'use server'

import * as z from "zod";


import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";


const ResetSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
  });

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email nicht gefunden!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  
  await sendPasswordResetEmail(
    passwordResetToken[0].email,
    passwordResetToken[0].token,
  );
  

  return { success: "Reset email sent!" };
}