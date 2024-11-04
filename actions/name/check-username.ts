'use server'

import db from "@/db/drizzle"
import { userTable } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function checkIsAvailable(username: string) {
    const findUser = await db.query.userTable.findFirst({
        where : (
            eq(userTable?.name, username)
        )
    })

    if(findUser) {
        return false
    }
    return true
}