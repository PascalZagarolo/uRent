'use server'

import db from "@/db/drizzle";
import { deleteUserToken, userTable } from "@/db/schema";
import { sendUserDeletedTokenMail } from "@/lib/mail";
import { eq } from "drizzle-orm";

import * as uuid from "uuid";
import getCurrentUser from "./getCurrentUser";

export const createDeleteUserToken = async (userId: string) => {
    try {
        const currentUser = await getCurrentUser();

        

        const findUser = await db.query.userTable.findFirst({
            where: eq(userTable.id, userId)
        })

        if(!currentUser || !findUser || currentUser.id !== userId) {
            return { error: true };
        }

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
        
        
        const sendCorrespondingMail = await sendUserDeletedTokenMail(findUser?.email, generateToken as string);
        
        return;

    } catch (error: any) {
        console.log(error);
        return { error: true };
    }
}