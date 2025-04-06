
import AccountTransferBegin from "@/react-email-starter/emails/urent/admin-stuff/AccountTransferBegin";
import AccountTransferConfirm from "@/react-email-starter/emails/urent/admin-stuff/AccountTransferConfirm";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendAccountTranferBegin = async (
    email : string,
    confirmLink : string,
    nativePasscode : string
  ) => {
    await resend.emails.send({
      from: 'uRent <mail@urent-rental.de>',
      to : email,
      subject : "Account einlösen",
      react : AccountTransferBegin({ confirmLink : confirmLink, nativePasscode : nativePasscode }),
    })
  }

  export const sendAccountTransferConfirm = async (
    email : string,
    confirmationCode : string
  ) => {
    await resend.emails.send({
      from: 'uRent <mail@urent-rental.de>',
      to : email,
      subject : "Account Übertragung bestätigen",
      react : AccountTransferConfirm({ confirmationCode : confirmationCode}),
    })
  }