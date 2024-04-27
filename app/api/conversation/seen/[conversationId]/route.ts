import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { conversation, message } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { conversationId : string } }
) {
    try {

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nicht eingeloggt", { status: 401 })
        }

        const foundConversation = await db.query.conversation.findFirst({
            where : (
                eq(conversation.id, params.conversationId)
            )
        })

        const otherUser = foundConversation.user1Id === currentUser.id ? foundConversation.user2Id : foundConversation.user1Id;

        const patchedMessages = await db.update(message).set({
            seen : true
        }).where(
            and(
                eq(message.conversationId, params.conversationId),
                eq(message.senderId, otherUser)
            )
        )

        return NextResponse.json(patchedMessages);

    } catch(error : any){
        console.log(error);
        return new NextResponse("Fehler beim Patchen der Nachrichten", { status: 500 })
    }
}