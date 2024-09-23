'use server'

import db from "@/db/drizzle";
import { message } from "@/db/schema";
import { and, eq, ne } from "drizzle-orm";

export const markAsSeenMessages = async (conversationId : string, userId : string) => {
    try {

        const patchMessages = await db.update(message).set({
            seen : true
        }).where(
            and(
                eq(message.conversationId, conversationId),
                ne(message.senderId, userId),
                eq(message.seen, false)
            )
        )
        
        return null;
    } catch(e : any) {
        console.log(e);
        return null;
    }
}