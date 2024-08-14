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

    

    

    const [lastMessage, setLastMessage] = useState(conversations.lastMessage);

    

    

    const userImage = conversations?.user1Id === currentUser.id ? conversations.user2 : conversations.user1;

    //@ts-ignore


    useEffect(() => {
        pusherClient.bind("messages:new", (message) => {
            if (message.conversationId === conversations.id) {
                setLastMessage(message)
            }
        }) 
    },[])

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
                lastMessage={lastMessage?.content ? lastMessage.content : "Hat ein Bild gesendet"}
                lastMessageDate={lastMessage?.createdAt}
                isOwnMessage={isOwnMessage}
            />
        </div>
    );
}

export default StartedChats;