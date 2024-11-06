
import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { ownId: string, otherId: string } }
) {
    try {

        let values : { inseratId? : string } = {};
        const bodyText = await req.text();
        if (bodyText) {
            values = JSON.parse(bodyText);
        }



        const existingConversation = await db.query.conversation.findFirst({
            where: (
                or(
                    and(
                        eq(conversation.user1Id, params.ownId),
                        eq(conversation.user2Id, params.otherId),
                        values?.inseratId ? eq(conversation.inseratId, values?.inseratId) : undefined
                    ),
                    and(
                        eq(conversation.user2Id, params.ownId),
                        eq(conversation.user1Id, params.otherId),
                        values?.inseratId ? eq(conversation.inseratId, values?.inseratId) : undefined
                    )
                )
            )
        })



        if (!existingConversation) {
            const [newConversation]: any = await db.insert(conversation).values({
                user1Id: params.ownId,
                user2Id: params.otherId,
                inseratId: values?.inseratId ? values?.inseratId : null
            }).returning();


            return NextResponse.json(newConversation)
        } else if (existingConversation) {
            return NextResponse.json(existingConversation)
        }

    } catch (error) {
        console.log("Fehler beim erstellen einer Konversation", error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { ownId: string, otherId: string } }
) {
    try {

        const foundConversation = await db.query.conversation.findFirst({
            where: (
                or(
                    and(
                        eq(conversation.user1Id, params.ownId),
                        eq(conversation.user2Id, params.otherId)
                    ), and(
                        eq(conversation.user2Id, params.ownId),
                        eq(conversation.user1Id, params.otherId)
                    )
                )
            )
        })

        return NextResponse.json(foundConversation)

    } catch {
        console.log("Fehler beim abrufen einer Konversation");
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}