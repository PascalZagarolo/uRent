'use server'

import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { and, eq, isNull, or } from "drizzle-orm";


export const findOrCreateConversation = async (user1: string, user2: string, inseratId? : string) => {
    
    console.log("...")

    let respondedConversation;
    
    respondedConversation = await db.query.conversation.findFirst({
        where : (
            or(
                and(
                    eq(conversation.user1Id, user1),
                    eq(conversation.user2Id, user2),
                    ...(inseratId ? [eq(conversation.inseratId, inseratId)] : [
                        isNull(conversation.inseratId)
                    ])
                ),
                and (
                    eq(conversation.user1Id, user2),
                    eq(conversation.user2Id, user1),
                    ...(inseratId ? [eq(conversation.inseratId, inseratId)] : [isNull(conversation.inseratId)])
                )     
            )
        )
    })

    if(!respondedConversation) {
        const createdConversation =  await db.insert(conversation).values({
            user1Id: user1,
            user2Id: user2,
            inseratId : inseratId ? inseratId : null
            
        }).returning();

        respondedConversation = createdConversation[0];
    }
    
    return respondedConversation.id;
}

