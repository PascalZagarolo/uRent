import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params :{ conversationId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const { image } = await req.json();
        
        const imageMessage = await db.messages.create({
            data : {
                conversationId: params.conversationId,
                senderId : currentUser.id,
                image : image
            }
        })

        return NextResponse.json(imageMessage);

    } catch (error) {
        console.log("Fehler beim erstellen einer Nachricht" , error);
        return new NextResponse ("Interner Server Error" , { status : 500 })
    }
}