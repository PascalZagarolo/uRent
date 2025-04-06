'use server';

import db from "@/db/drizzle";
import { transferAccountToken, userTable } from "@/db/schema";
import { sendAccountTransferConfirm } from "@/lib/mails/admin-stuff";
import { isAfter } from "date-fns";
import { eq } from "drizzle-orm";

export const sendTransferAccountConfirmation = async (token: string): Promise<{ error?: string, success?: string }> => {
    try {

        //get already generated Token from DB
        const transferAccountObject = await db.query.transferAccountToken.findFirst({
            where: eq(transferAccountToken.id, token)
        })

        if (!transferAccountObject) return { error: "Ungültiger Token" };

        const currentDate = new Date()

        if (isAfter(currentDate, transferAccountObject.expirationDate)) return { error: "Token ist abgelaufen" }

        //check lastSentDate is older than 30sec or 1 minute
        //if(older) => send new Mail

        const findUser = await db.query.userTable.findFirst({
            where: eq(userTable.id, transferAccountObject.userId)
        })

        if (findUser) return { error: "Nutzer existiert nicht." };
        
        //append Token to Email
        //send Email
        await sendAccountTransferConfirm(findUser.email, transferAccountObject.confirmMailToken)



        return { success: "Email wurde erfolgreich gesendet." };
    } catch (e: any) {
        console.log(e);
        return { error: "Etwas ist schiefgelaufen.." };
    }
}