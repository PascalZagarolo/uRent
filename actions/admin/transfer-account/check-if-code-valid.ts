'use server'

import db from "@/db/drizzle";
import { transferAccountToken, userTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import { lucia } from "@/lib/lucia";
import { cookies } from "next/headers";
import { signOut } from "@/actions/signout";

export const checkIfCodeValid = async (usedCode : string, token : string, newEmail : string, newPassword : string ) : Promise<{success : boolean , error? : string}> => {
    try {

        if(usedCode.trim() == "" || usedCode.length != 6) return { success : false, error : "Code ist ungültig" } 

        if(!token) return { success : false, error: "Account kann nicht übertragen werden"};

        if(!newEmail) return { success : false, error : "Keine gültige Email angegeben"};

        if(!newPassword) return { success : false, error : "Dein neues Passwort ist nicht gültig"};

        const findCode = await db.query.transferAccountToken.findFirst({
            where : and(
                eq(transferAccountToken.id, token),
                eq(transferAccountToken.confirmMailToken, usedCode)
            )
        })

        if(!findCode) {
            return { success : false, error : "Code ist ungültig"}
        }

        const findExistingEmail = await db.query.userTable.findFirst({
            where : (
                eq(userTable.email, newEmail)
            )
        })

        if(findExistingEmail) {
            return { success : false, error : "Diese Email ist bereits verknüpft."};
        }


        //save new data
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateUser = await db.update(userTable).set(
            {
                email : newEmail,
                password : hashedPassword
            }
        ).where(eq(userTable.id, findCode.userId)).returning()

        //delete Token
        await db.delete(transferAccountToken).where(
            eq(transferAccountToken.id, token)
        )
        
        //signout first
        await signOut();

        //login into new account
        const session = await lucia.createSession(updateUser[0].id, {
            expiresIn: 60 * 60 * 24 * 30,
          })
    
          const sessionCookie = lucia.createSessionCookie(session.id);
    
          cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
          )
    


        return { success : true }
    } catch(e : any) {
        console.log(e);
        return { success : false, error : "Etwas ist schiefgelaufen" }
    }
}