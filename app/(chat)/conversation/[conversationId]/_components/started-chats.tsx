'use client'

import { conversation, message, userTable } from "@/db/schema";
import RenderedChats from "./rendered-chats";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";
import { find } from "lodash";



interface StartedChatsProps {
    conversations: any,
    currentUser: typeof userTable.$inferSelect
}


const StartedChats: React.FC<StartedChatsProps> = ({
    conversations,
    currentUser
}) => {

    const otherUserId = conversations.user1Id === currentUser.id ? conversations.user2Id : conversations.user1Id;

    const user1orUser2 = otherUserId === conversations.user1Id ? true : false;

    

    let lMessage = conversations.messages.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    const [lastMessage, setLastMessage] = useState(lMessage);

    useEffect(() => {
        pusherClient.subscribe(conversations.id);


        const messageHandler = (message : any) => {

            
            
            setLastMessage((current) => {
                if (find(current, {id: message.id})) {
                    return current;
                }
                
                if(message?.conversationId === conversations.id) {
                    return [message, ...current];
                }
                
                return lastMessage;
            });
            
        }

        

        pusherClient.bind('messages:new', messageHandler);


        return () => {
            pusherClient.unsubscribe(conversations.id);
            pusherClient.unbind('messages:new', messageHandler);

        }
    },)

    const userImage = conversations?.user1Id === currentUser.id ? conversations.user2 : conversations.user1;

    //@ts-ignore


    let content = lastMessage[0]?.content ? lastMessage[0].content : "Hat ein Bild gesendet"

    //@ts-ignore
    const openChats = conversations.messages.filter((message) => {

        return !message.seen && message.senderId !== currentUser.id
    })

    const isOwnMessage = lastMessage[0]?.senderId === currentUser.id ? true : false;

    return (
        <div className="flex justify-center ">
            <RenderedChats
                user={userImage as any}
                conversationId={conversations.id}
                openMessages={openChats.length}
                lastMessage={content}
                lastMessageDate={lastMessage[0]?.createdAt}
                isOwnMessage={isOwnMessage}
            />
        </div>
    );
}

export default StartedChats;