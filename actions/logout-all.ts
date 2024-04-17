'use server'

import db from "@/db/drizzle";
import { sessionTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import getCurrentUser from "./getCurrentUser";
import { redirect } from "next/navigation";


export async function logoutAllUsers() {

    const currentUser = await getCurrentUser();
    
    if(!currentUser) return;

    await db.delete(sessionTable).where(
        eq (sessionTable.userId, currentUser.id)
    ).returning();

    redirect('/login')

}