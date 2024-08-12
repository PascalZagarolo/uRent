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
        
        const values = await req.json();

        await pusherServer.trigger(params.conversationId, 'messages:new', values.currentMessage);

        return NextResponse.json({ success : values.currentMessage})


    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}