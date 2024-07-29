import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { message } from "@/db/schema";
import { pusherServer } from "@/lib/pusher";

import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params :{ conversationId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const { image, content } = await req.json();
        
        const [imageMessage] = await db.insert(message).values({
            conversationId : params.conversationId,
            senderId : currentUser.id,
            image : image,
            content : content
        }).returning();

        await pusherServer.trigger(params.conversationId, 'messages:new', imageMessage);

        return NextResponse.json(imageMessage);

    } catch (error) {
        console.log("Fehler beim erstellen einer Nachricht" , error);
        return new NextResponse ("Interner Server Error" , { status : 500 })
    }
}