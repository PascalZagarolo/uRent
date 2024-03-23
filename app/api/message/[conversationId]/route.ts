import getCurrentUser from "@/actions/getCurrentUser";

import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import db from "@/db/drizzle";
import { message } from "@/db/schema";

export async function POST(
    req : Request,
    { params } : { params : { conversationId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const values = await req.json();


        const [newMessage] = await db.insert(message).values({
            conversationId : params.conversationId,
            senderId : currentUser.id,
            ...values
        }).returning();

        await pusherServer.trigger(params.conversationId, 'messages:new', newMessage);

        return NextResponse.json(newMessage)

    } catch (error) {
        console.log("Fehler beim erstellen einer Nachricht" , error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}