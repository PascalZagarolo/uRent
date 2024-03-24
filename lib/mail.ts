
'use server';


import ChangePassword from '@/react-email-starter/emails/urent/change-password';
import ConfirmMail from '@/react-email-starter/emails/urent/confirm-email';
import { render } from '@react-email/components';
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token : string
) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

    console.log("sendVerificationEmail" + email + token)

   

    await resend.emails.send({
        from: "uRent@u-rent-rental.de",
        to: email,
        subject: "Bestätige deine Anmeldung",
        react : ConfirmMail({confirmLink}) ,
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
      subject: "Zurücksetzen deines Passworts",
      react: ChangePassword({ confirmLink : resetLink }),
    });
  };
  