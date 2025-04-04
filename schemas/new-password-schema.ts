import { z } from "zod";

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }).max(20 ,{
      message : "Maximal 20 Buchstaben"
    }),
    password2: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }).max(20 ,{
      message : "Maximal 20 Buchstaben"
    }),
  });