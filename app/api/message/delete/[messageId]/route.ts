import db from "@/db/drizzle";
import { message } from "@/db/schema";
import { pusherServer } from "@/lib/pusher";
import { eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { messageId : string }}
) { 
    try {

        const foundMessage = await db.query.message.findFirst({
            where : (
               eq( message.id, params.messageId)
            )
        })
        
        const conversationId = foundMessage.conversationId;

        const [deletedMessage] : any = await db.delete(message).where(
            eq(message.id, params.messageId)
        ).returning()

        await pusherServer.trigger(conversationId, 'messages:delete', deletedMessage);

        return NextResponse.json(deletedMessage)

    } catch(error) {
        console.log("Fehler beim löschen einer Nachricht" , error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}