import SubscriptionCanceled from "@/react-email-starter/emails/urent/subscriptions/subscription-canceled";
import SubscriptionRedeemed from "@/react-email-starter/emails/urent/subscriptions/subscription-redeemed";
import SubscriptionRenewed from "@/react-email-starter/emails/urent/subscriptions/subscription-renewed";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendSubscriptionRedeemed = async (
    email: string,
    
  ) => {
    await resend.emails.send({
      from: 'uRent <mail@urent-rental.de>',
      to: email,
      subject: "Abonnement eingelöst",
      react : SubscriptionRedeemed()
    });
  };


export const sendSubscriptionRenewed = async (
  email : string
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to : email,
    subject : "Abonnement verlängert",
    react : SubscriptionRenewed(),
  })
}

export const sendSubscriptionCanceledMail = async (
  email : string
) => {
  await resend.emails.send({
    from: 'uRent <mail@urent-rental.de>',
    to : email,
    subject : "Abonnement gekündigt",
    react : SubscriptionCanceled(),
  })
}