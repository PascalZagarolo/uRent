import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";


const findConversation = async (user1: string, user2: string) => { 
    const existingConversation = await db.query.conversation.findFirst({
        where : (
            or(
                and(
                    eq(conversation.user1Id, user1),
                    eq(conversation.user2Id, user2)
                ),
                and (
                    eq(conversation.user1Id, user2),
                    eq(conversation.user2Id, user1)
                )     
            )
        )
    })
    console.log(existingConversation.id)
    return existingConversation.id;
}

export default findConversation;