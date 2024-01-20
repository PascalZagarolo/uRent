import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req : Request,
    { params } : { params : { messageId : string }}
) { 
    try {

        

        const deletedMessage = await db.messages.delete({
            where :{
                id : params.messageId
            }
        })

        return NextResponse.json(deletedMessage)

    } catch(error) {
        console.log("Fehler beim löschen einer Nachricht" , error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}