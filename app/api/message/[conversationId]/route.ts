import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";

export async function POST(
    req : Request,
    { params } : { params : { conversationId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const values = await req.json();


        const newMessage = await db.messages.create({
            data : {
                conversationId: params.conversationId,
                ...values,
                senderId : currentUser.id,
                
            }
        });

        await pusherServer.trigger(params.conversationId, 'messages:new', newMessage);

        return NextResponse.json(newMessage)

    } catch (error) {
        console.log("Fehler beim erstellen einer Nachricht" , error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}