'use server';

import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token : string
) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

    console.log("sendVerificationEmail" + email + token)

    await resend.emails.send({
        from: "mail@u-rent-rental.de",
        to: email,
        subject: "Bestätige deine Anmeldung",
        html:`<p> Klick <a href=${confirmLink}> hier </a> um deinen Account zu verifizieren </p>`
    });
}

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
  ) => {
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/new-password?token=${token}`
  
    await resend.emails.send({
      from: "mail@u-rent-rental.de",
      to: email,
      subject: "Passwort zurücksetzen!",
      html: `<p>Klicke <a href="${resetLink}">hier</a> um dein Passwort zurückzusetzen</p>`
    });
  };
  