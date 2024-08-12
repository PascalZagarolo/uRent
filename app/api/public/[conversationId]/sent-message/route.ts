import { pusherServer } from "@/lib/pusher";
import { create } from "lodash";
import { NextResponse } from "next/server";

export async function POST(
    req  : Request,
    { params } : {
        params : {
            conversationId : string
        }
    }
) {
    try {

        

        //Route for Mobile App, if App user writes message, the Server will response to the given conversation and notifies the other participant
        
        const usedMessage = {
            id : "000eb703-2827-4079-85b2-6c65ff1737bc",
            content : "Pablo Chicochico",
            image : null,
            senderId : "000eb703-2827-4079-85b2-6c65ff1737bc",
            conversationId : params.conversationId,
            seen : false,
            createdAt : new Date().toISOString(),

        }

        await pusherServer.trigger(params.conversationId, 'messages:new', usedMessage);

        return NextResponse.json({ success : usedMessage})


    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}