import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { block, conversation } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { conversationId: string } }
) {
    try {

        const findConversation = await db.query.conversation.findFirst({
            where: (
                eq(conversation.id, params.conversationId)
            )
        })

        if (!findConversation) {
            return new NextResponse("Konversation nicht gefunden", { status: 404 })
        }

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Nutzer nicht gefunden", { status: 404 })
        }

        const createBlock = await db.insert(block).values({
            conversationId: params.conversationId,
            userId: currentUser.id
        }).returning();

        return NextResponse.json(createBlock[0])

    } catch (error: any) {
        console.log("Fehler beim blockieren", error);
        return new NextResponse("Fehler beim blockieren", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { conversationId: string } }
) {
    try {

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return new NextResponse("Nutzer nicht gefunden", { status: 404 })
        }

        const findBlock = await db.query.block.findFirst({
            where: (
                and(
                    eq(block.conversationId, params.conversationId),
                    eq(block.userId, currentUser.id)
                )
            )
        })

        if(!findBlock) {
            return new NextResponse("Blockierung nicht gefunden", { status: 404 })
        }

        const deletedBlock = await db.delete(block).where(eq(block.id, findBlock.id)).returning();

        return NextResponse.json(deletedBlock[0])

    } catch (error: any) {
        console.log("Fehler beim löschen der Blockierung", error);
        return new NextResponse("Fehler beim löschen der Blockierung", { status: 500 })
    }
}