
import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { ownId : string , otherId : string }}
) {
    try {

        const existingConversation = await db.query.conversation.findFirst({
            where : (
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

        

        if (!existingConversation) {
            const [newConversation] = await db.insert(conversation).values({
                user1Id : params.ownId,
                user2Id : params.otherId,
            }).returning();

            
            return NextResponse.json(newConversation)
        } else if (existingConversation) {
            return NextResponse.json(existingConversation)
        }

    } catch(error) {
        console.log("Fehler beim erstellen einer Konversation" , error);
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}

export async function GET(
    req : Request,
    { params } : { params : { ownId : string , otherId : string }}
) {
    try {

        const foundConversation = await db.query.conversation.findFirst({
            where:(
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