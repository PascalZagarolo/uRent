import getCurrentUser from "@/actions/getCurrentUser";

import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import db from "@/db/drizzle";
import { conversation, message, notification } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(
    req : Request,
    { params } : { params : { conversationId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const {otherUser, otherUserName, ...values} = await req.json();


        const [newMessage] = await db.insert(message).values({
            conversationId : params.conversationId,
            senderId : currentUser.id,
            ...values
        }).returning();


        //send the receiver only one notification that is unseen, if sees it => send new one in case
        const existingNotication = await db.query.notification.findFirst({
            where : (
            and(
                eq(notification.userId, otherUser),
                eq(notification.conversationId, params.conversationId),
                eq(notification.seen, false)
            )
            )
        })

        await pusherServer.trigger(params.conversationId, 'messages:new', newMessage);

        if(!existingNotication) {
            const [createdNotification] = await db.insert(notification).values({
                userId : otherUser,
                conversationId : params.conversationId,
                notificationType : "MESSAGE",
                content : otherUserName
            }).returning()

            await pusherServer.trigger(otherUser, 'notification:new', {
                notification : createdNotification,
                userId : otherUser
             });

            return NextResponse.json({newMessage, createdNotification})
        } else {
            

            return NextResponse.json(newMessage)
        }

        

        

    } catch (error) {
        console.log("Fehler beim erstellen einer Nachricht" , error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}