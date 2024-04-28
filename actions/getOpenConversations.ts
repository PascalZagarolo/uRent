'use server'

import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export async function getOpenConversations (currentUserId : string) {
    
    //get all conversations of user
    const involvedConversations = await db.query.conversation.findMany({
        where : (
            or(
                eq(conversation.user1Id, currentUserId),
                eq(conversation.user2Id, currentUserId)
            )
        ),
        with : {
            messages : true
        }
    })
    
    let number = 0;

    for (let i = 0; i < involvedConversations.length; i++) {
        let hasUnseenMessage = false;
        for (let j = 0; j < involvedConversations[i].messages.length; j++) {
            if (!involvedConversations[i].messages[j].seen && involvedConversations[i].messages[j].senderId !== currentUserId) {
                hasUnseenMessage = true;
                break; // Once we find one unseen message, we can break out of the inner loop.
            }
        }
        if (hasUnseenMessage) {
            number++;
        }
    };
    
    
    return number;
}