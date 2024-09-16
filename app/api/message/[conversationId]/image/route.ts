import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/db/drizzle";
import { conversation, message, notification } from "@/db/schema";
import { pusherServer } from "@/lib/pusher";
import axios from "axios";
import { and, eq } from "drizzle-orm";

import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params } : { params : { conversationId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const {otherUser, otherUserName, image, content} = await req.json();
        
        const [imageMessage] : any = await db.insert(message).values({
            conversationId : params.conversationId,
            senderId : currentUser.id,
            image : image,
            content : content
        }).returning();

        const messageObject = {
            ...imageMessage,
            sender : {
                id : currentUser.id,
                name : currentUser.name,
                image : currentUser.image
            }
        }

        const updateLastMessage = await db.update(conversation).set({
            message : imageMessage,
            lastMessageId : imageMessage.id
        }).where(eq(conversation.id, params.conversationId)).returning();

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
        
        await pusherServer.trigger(params.conversationId as string, 'messages:new', messageObject);

        //! Add on prod if App is available
        //await axios.post("http://192.168.178.45:4000/api/messages/synchronize", imageMessage)

        if(!existingNotication) {
            const [createdNotification] = await db.insert(notification).values({
                userId : otherUser,
                conversationId : params.conversationId,
                notificationType : "MESSAGE",
                content : otherUserName
            }).returning()

            
            const existingMessages = await db.query.message.findMany({
                where : eq(message.conversationId, params.conversationId)
            })

            await pusherServer.trigger(otherUser, 'notification:new', {
                notification : createdNotification,
                userId : otherUser,
                imageUrl : currentUser?.image,
                startedConversation : existingMessages ? false : true
             });

            return NextResponse.json({imageMessage, createdNotification})
        } else {
            return NextResponse.json(imageMessage)
        }

    } catch (error) {
        console.log("Fehler beim erstellen einer Nachricht" , error);
        return new NextResponse ("Interner Server Error" , { status : 500 })
    }
}