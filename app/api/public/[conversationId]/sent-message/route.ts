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

        const convertedObject = {
            ...values?.sentMessage,
            sender : values?.sentMessage?.sender
        }

        await pusherServer.trigger(params.conversationId, 'messages:new', convertedObject);

        if(values?.existingNotification) {
            await pusherServer.trigger(values?.existingNotification?.userId, 'notification:new', {
                notification : values?.existingNotification,
                userId : values?.existingNotification?.userId,
                imageUrl : values?.imageUrl,
                startedConversation : values.startedConversation ? false : true
             });
        }

        return NextResponse.json({ success : values?.sentMessage})


    } catch(e : any) {
        console.log(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}