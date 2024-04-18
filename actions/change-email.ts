'use server'

import db from "@/db/drizzle"
import { changeEmailToken, sessionTable, userTable } from "@/db/schema"
import { and, eq } from "drizzle-orm"
import { emit } from "process"

export const checkOTPMail = async (pin : string, thisUser : typeof userTable.$inferSelect) => {

    console.log(pin)
    console.log(thisUser.id)
    const findCode = await db.query.changeEmailToken.findFirst({
        where : (
            and(
                eq(changeEmailToken.token, pin),
                eq(changeEmailToken.userId, thisUser.id)
            )
        )
    })

    if(!findCode) {
        return { error : "Ungültiger Code"}
    }

    const findExistingUser = await db.query.userTable.findFirst({
        where : (
            eq(userTable.email, findCode.newEmail)
        )
    })

    //check if email is already taken
    if(findExistingUser) {
        return { error : "E-Mail-Adresse bereits vergeben"}
    }

    //change email of user
    const updatedUser = await db.update(userTable).set({
        email : findCode.newEmail
    }).where(
        eq(userTable.id, findCode.userId)
    )

    //logout

    await db.delete(sessionTable).where(
        eq(sessionTable.userId, findCode.userId)
    )

    return { success : "E-Mail-Adresse erfolgreich geändert"}

}