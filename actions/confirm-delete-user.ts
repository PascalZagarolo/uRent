'use server'
import db from "@/db/drizzle";
import getCurrentUser from "./getCurrentUser"
import { deleteUserToken, userTable } from '../db/schema';
import { eq } from "drizzle-orm";
import { sendConfirmAccountDeleted } from "@/lib/mail";

export const confirmDeleteUser = async (token: string) => {

    try {

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return { error: "Nutzer existiert nicht." }
        }

        const findToken = await db.query.deleteUserToken.findFirst({
            where: eq(deleteUserToken.token, token)
        })

        if (!findToken) {
            return { error: "Token nicht gefunden." }
        }

        if (findToken.userId !== currentUser.id) {
            return { error: "Nicht eingeloggt." }
            
        }

        const userEmail = currentUser.email;

        
        const deletedUser = await db.delete(userTable).where(eq(userTable.id, currentUser.id))
        
        const sendEmail = await sendConfirmAccountDeleted(userEmail);

        return { success: "Account gelöscht." }
        

    } catch (error: any) {
        console.log(error);
    }



}