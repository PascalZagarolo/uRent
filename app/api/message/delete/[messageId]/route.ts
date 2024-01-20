import { pusherServer } from "@/lib/pusher";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { messageId : string }}
) { 
    try {

        const message = await db.messages.findUnique({
            where : {
                id : params.messageId
            }
        })
        
        const conversationId = message.conversationId;

        const deletedMessage = await db.messages.delete({
            where :{
                id : params.messageId
            }
        })

        await pusherServer.trigger(conversationId, 'messages:delete', deletedMessage);

        return NextResponse.json(deletedMessage)

    } catch(error) {
        console.log("Fehler beim löschen einer Nachricht" , error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}