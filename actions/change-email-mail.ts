'use server'

import db from "@/db/drizzle";
import { changeEmailToken, userTable } from "@/db/schema";
import { sendChangeEmail } from "@/lib/mail";
import bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";

export const changeEmailSendMail = async (email: string, thisUser : typeof userTable.$inferSelect, usedPassword : string) => {
    try {
        console.log("dijfosmpd")
        const existingEmailUser = await db.query.userTable.findFirst({
            where : (
                eq(userTable.email, email)
            )
        })

        if(existingEmailUser) {
            return { error : "Diese Email-Adresse ist bereits mit einem anderem Account verknüpft."}
        }

        console.log(await bcrypt.hash(usedPassword, 10))
        console.log(thisUser.password)

        const passwordsMatch = await bcrypt.compare(usedPassword, thisUser.password);
        
        if(!passwordsMatch) {
            return { error : "Das Eingegebene Passwort ist falsch."}
        }

        const usedToken = Math.floor(100000 + Math.random() * 900000);

        var currentDate = new Date();
        var expires = new Date(currentDate.getTime() + 1000 * 60 * 60);

        const createTokenEmail = await db.insert(changeEmailToken).values({
            userId : thisUser.id,
            token : usedToken.toString(),
            newEmail : email,
            expires : expires
        })
        

        await sendChangeEmail(email, usedToken.toString());
        return { success: "Email sent successfully." }


    } catch (error: any) {
        return { error: "Email could not be sent." }
    }
}