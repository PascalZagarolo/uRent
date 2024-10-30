'use server'

import { NextResponse } from "next/server";
import getCurrentUser from "../getCurrentUser";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { sendTwoFactorAbortionConfirmation, sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import db from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { twoFactorToken, userTable, verificationTokens } from "@/db/schema";

export const abort2faSendMail = async () => {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const generatedTwoFactorToken = await generateTwoFactorToken(currentUser.email);

        const sendMail = await sendTwoFactorAbortionConfirmation(currentUser.email, generatedTwoFactorToken.token);

        return { success: "Mail sent" };
    } catch (e: any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const abort2faConfirm = async (token: string) => {
    try {

        if (token.length < 6) {
            return new NextResponse("Invalid Token", { status: 400 });
        }

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const findToken = await db.query.twoFactorToken.findFirst({
            where: and(
                eq(twoFactorToken.token, token),
                eq(twoFactorToken.email, currentUser.email)
            )
        })

        if (!findToken) {
            return new NextResponse("Invalid Token", { status: 400 });
        }

        const deactivateTwoFactor = await db.update(userTable).set({
            usesTwoFactor: false
        }).where(eq(userTable.id, currentUser.id));

        return { success: true }
    } catch (e: any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const activate2Fa = async () => {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const activateTwoFactor = await db.update(userTable).set({
            usesTwoFactor: true
        }).where(eq(userTable.id, currentUser.id));

        return { success: true }
    } catch (e: any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export const resend2Fa = async (userEmail: string) => {
    try {
        const existingToken = await db.query.verificationTokens.findFirst({
            where: eq(verificationTokens.email, userEmail)
        })

        if (existingToken) {
            await db.delete(verificationTokens).where(eq(verificationTokens.email, userEmail));
        }

        const verificationToken = await generateTwoFactorToken(
            userEmail
        );
        await sendTwoFactorTokenEmail(
            userEmail,
            verificationToken.token,
        );

        return { success: true };
    } catch (e: any) {
        console.log(e);
    }
}