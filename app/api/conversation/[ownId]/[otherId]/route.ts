import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { ownId : string , otherId : string }}
) {
    try {

        const existingConversation  = await db.conversation.findFirst({
            where : {
                userIds : {
                    hasEvery : [params.ownId , params.otherId]
                }
            }
        })

        

        if (!existingConversation) {
            const newConversation = await db.conversation.create({
                data : {
                    userIds : [params.ownId , params.otherId],
                    
                }
            })

            
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

        const foundConversation = await db.conversation.findFirst({
            where : {
                userIds : {
                    hasEvery : [params.ownId , params.otherId]
                }
            }
        })

        return NextResponse.json(foundConversation)

    } catch {
        console.log("Fehler beim abrufen einer Konversation");
        return new NextResponse("Interner Server Error", { status: 500 })
    }
}