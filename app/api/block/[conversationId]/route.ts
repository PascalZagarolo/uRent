import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { block, conversation } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req : Request,
    { params } : { params : { conversationId : string}}
) {
    try {

        const findConversation = await db.query.conversation.findFirst({
            where : (
                eq(conversation.id, params.conversationId)
            )
        })

        if(!findConversation) {
            return new NextResponse("Konversation nicht gefunden", { status : 404})
        }

        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return new NextResponse("Nutzer nicht gefunden", { status : 404})
        }

        const createBlock = await db.insert(block).values({
            conversationId : params.conversationId,
            userId : currentUser.id
        }).returning();

        return NextResponse.json(createBlock[0])

    } catch(error : any) {
        console.log("Fehler beim blockieren", error);
        return new NextResponse("Fehler beim blockieren", { status : 500})
    }
}