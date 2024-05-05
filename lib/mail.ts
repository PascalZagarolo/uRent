
'use server';


import FaActivation from '@/react-email-starter/emails/urent/2fa-activation';
import ChangeMail from '@/react-email-starter/emails/urent/change-email';
import ChangePassword from '@/react-email-starter/emails/urent/change-password';
import ConfirmMail from '@/react-email-starter/emails/urent/confirm-email';
import ConfirmEmailChange from '@/react-email-starter/emails/urent/confirm-email-change';
import ConfirmLogin from '@/react-email-starter/emails/urent/confirm-login';
import SupportConfirm from '@/react-email-starter/emails/urent/confirmSupport';
import SearchIsAvailable from '@/react-email-starter/emails/urent/search-is-available';

import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorActivating = async (
  email: string,
  
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to: email,
    subject: "2FA Aktivierung",
    react : FaActivation()
  });
};

export const confirmEmailChange = async (
  email: string,
  
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
         
    to: email,
    subject: "Email geändert",
    react : ConfirmEmailChange()
  });
};

export const sendTwoFactorTokenEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to: email,
    subject: "2FA Code",
    react : ConfirmLogin({token})
  });
};

export const sendChangeEmail = async (
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to: email,
    subject: "Email ändern",
    react : ChangeMail({token})
  });
};

export const sendSupportConfirm = async (
  email: string,
 
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to: email,
    subject: "Support Anfrage bestätigt",
    react : SupportConfirm(),
  });
};

export const sendFoundResults = async (
  email: string,
  link : string
) => {
  

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}` + link


  await resend.emails.send({
      from: 'uRent <mail@urent-rental.de>',
      to: email,
      subject: "Gute Neuigkeiten!",
      react : SearchIsAvailable({link : baseUrl}) ,
  });
}

export const sendVerificationEmail = async (
    email: string,
    token : string
) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-verification?token=${token}`;

    console.log("sendVerificationEmail" + email + token)

  
    await resend.emails.send({
        from: 'uRent <mail@urent-rental.de>',
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
      from: 'uRent <mail@urent-rental.de>',
      to: email,
      subject: "Zurücksetzen deines Passworts",
      react: ChangePassword({ confirmLink : resetLink }),
    });
  };
  