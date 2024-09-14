import * as z from "zod";


export const SettingsSchema = z.object({
  name: z.optional(z.string()),
  isTwoFactorEnabled: z.optional(z.boolean()),
  
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "Passwort ist benötigt",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Passwort ist benötigt",
    path: ["password"]
  })

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 Zeichen benötigt",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email ist benötigt",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email ist benötigt",
  }),
  password: z.string().min(6, {
    message: "Passwort ist benötigt",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email ist benötigt",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 Zeichen benötigt",
  }).max(20, {
    message: "Maximum 20 Zeichen",
  }),
  password2: z.string().min(6, {
    message: "Minimum 6 Zeichen benötigt",
  }),
  name: z.string().min(1, {
    message: "Name ist benötigt",
  }),
  receivesEmails: z.boolean(),
  
});