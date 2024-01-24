import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationEmail = async (
    email: string,
    token : string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "support@u-rent-rental.de",
        to: email,
        subject: "Bestätige deine uRent-Anmeldung",
        html:`<p> Klick  <a href="${confirmLink}"> hier </a> um deinen Account zu verifizieren </p>`,
    });
}