import getCurrentUser from "@/actions/getCurrentUser";

import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import db from "@/db/drizzle";
import { conversation, message, notification } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import axios from "axios";

export async function POST(
    req : Request,
    { params } : { params : { conversationId : string }}
) {
    try {

        const currentUser = await getCurrentUser();

        const {otherUser, otherUserName, ...values} = await req.json();


        const [newMessage] : any = await db.insert(message).values({
            conversationId : params.conversationId,
            senderId : currentUser.id,
            ...values,
            
        }).returning();

        const messageObject = {
            ...newMessage,
            sender : {
                id : currentUser.id,
                name : currentUser.name,
                image : currentUser.image
            }
        }

        
        const updateLastMessage = await db.update(conversation).set({
            message : newMessage,
            lastMessageId : newMessage.id
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

        

        //! Add on the server side if app is available
        //await axios.post("http://192.168.178.45:4000/api/messages/synchronize", newMessage)

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

             await pusherServer.trigger(params.conversationId, 'messages:new', messageObject);
             
            return NextResponse.json({newMessage, createdNotification})
        } else {
            
            await pusherServer.trigger(params.conversationId, 'messages:new', messageObject);
            return NextResponse.json(newMessage)
        }

        

        

    } catch (error) {
        console.log("Fehler beim erstellen einer Nachricht" , error);
        return new NextResponse("Interner Server Error" , { status : 500 })
    }
}