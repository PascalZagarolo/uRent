
'use server';


import FaActivation from '@/react-email-starter/emails/urent/2fa-activation';
import ChangeMail from '@/react-email-starter/emails/urent/change-email';
import ChangePassword from '@/react-email-starter/emails/urent/change-password';
import ConfirmDeletedAccount from '@/react-email-starter/emails/urent/confirm-deleted-account';
import ConfirmMail from '@/react-email-starter/emails/urent/confirm-email';
import ConfirmEmailChange from '@/react-email-starter/emails/urent/confirm-email-change';
import ConfirmLogin from '@/react-email-starter/emails/urent/confirm-login';
import ConfirmUserDeletion from '@/react-email-starter/emails/urent/confirm-user-deletion';
import SupportConfirm from '@/react-email-starter/emails/urent/confirmSupport';
import SearchIsAvailable from '@/react-email-starter/emails/urent/search-is-available';
import SubscriptionAlmostExpired from '@/react-email-starter/emails/urent/subscription-almost-expired';
import WelcomeMail from '@/react-email-starter/emails/urent/welcome-mail';

import { Resend } from "resend";
import { category } from '../drizzle/schema';
import SupportMessageToUrent from '@/react-email-starter/emails/urent/supportMessageToUrent';


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

export const sendSubscriptionAlmostExpired = async (
  email: string,
  
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to: email,
    subject: "Dein Abo läuft bald ab",
    react : SubscriptionAlmostExpired()
  });
};

export const sendWelcomeMail = async (
  email: string,
  
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to: email,
    subject: "Willkommen auf uRent",
    react : WelcomeMail()
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

export const sendSupportConfirmToUrent = async (
  values : any
) => {
  console.log(values)
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to: "support@urent-rental.com",
    subject: "["+ values.category + "] " + values.title,
    react : SupportMessageToUrent({
      category : values.category,
      title : values.title,
      name : values.name,
      email : values.email,
      content : values.content
    }),
  });
};

export const sendConfirmAccountDeleted = async (
  email: string,
 
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to: email,
    subject: "Account gelöscht",
    react : ConfirmDeletedAccount(),
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

export const sendUserDeletedTokenMail = async (
  email: string,
  token : string
) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/delete-user?token=${token}`;

  


  await resend.emails.send({
      from: 'uRent <mail@urent-rental.de>',
      to: email,
      subject: "Bestätige die Löschung deines Accounts",
      react : ConfirmUserDeletion({confirmLink}) ,
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
  