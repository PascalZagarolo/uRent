'use server'

import db from "@/db/drizzle";
import { deleteUserToken } from "@/db/schema";
import { sendUserDeletedTokenMail } from "@/lib/mail";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import * as uuid from "uuid";

export const createDeleteUserToken = async (userId: string) => {
    try {
        console.log(userId)
        const findExistingToken = await db.query.deleteUserToken.findFirst({
            where: eq(deleteUserToken.userId, userId)
        })

        if (findExistingToken) {
            await db.delete(deleteUserToken).where(eq(deleteUserToken.userId, userId))
        }
        console.log(userId)
        const currentDate = new Date();
        const generateToken = uuid.v4();
        console.log(userId)
        const expireInOneHour = new Date();
        expireInOneHour.setHours(expireInOneHour.getHours() + 1);
        console.log(userId)
        //@ts-ignore
        const createNewToken = await db.insert(deleteUserToken).values({
            userId: userId,
            token: generateToken as string,
            expires: expireInOneHour,
        })
        
        
        const sendCorrespondingMail = await sendUserDeletedTokenMail(userId, generateToken as string);
        
        return;

    } catch (error: any) {
        console.log(error);
        return { error: true };
    }
}