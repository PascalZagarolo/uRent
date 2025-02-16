'use client'

import { conversation, message, notification, userTable } from "@/db/schema";
import RenderedChats from "./rendered-chats";
import db from "@/db/drizzle";
import { and, eq } from "drizzle-orm";
import { pusherClient } from "@/lib/pusher";
import { useEffect, useState } from "react";
import { find } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { MarkAsSeen } from '../../../../../actions/notifications/mark-as-seen';
import { markAsSeenMessages } from "@/actions/messages/mark-as-seen";



interface StartedChatsProps {
    conversations: typeof conversation.$inferSelect | any,
    currentUser: typeof userTable.$inferSelect
}


const StartedChats: React.FC<StartedChatsProps> = ({
    conversations,
    currentUser
}) => {

    
    
    const [lastMessage, setLastMessage] = useState(conversations.lastMessage);
    
    const userImage = conversations?.user1Id === currentUser.id ? conversations.user2 : conversations.user1;


    const paramsConversationId = useSearchParams().get("conversationId");

    useEffect(() => {
        pusherClient.bind("messages:new", (message) => {
            if (message.conversationId === conversations.id) {
                setLastMessage(message)
            }
        })
    },[])

    const router = useRouter();

    useEffect(() => {
        if(paramsConversationId === conversations.id){ 
            setOpenChats(0);
        }

        const load = async () => {
            await markAsSeenMessages(conversations.id, currentUser.id)
            router.refresh();
        }

        if(paramsConversationId === conversations.id){ 
            load()
        }

    },[paramsConversationId])

    const [openChats, setOpenChats] = useState(conversations.messages.filter((message) => {
        return !message.seen && message.senderId !== currentUser.id
    }))

    const isOwnMessage = lastMessage?.senderId === currentUser.id ? true : false;

    return (
        <div className="">
            <RenderedChats
                user={userImage as any}
                conversationId={conversations.id}
                openMessages={openChats.length}
                lastMessage={
                    lastMessage ? (lastMessage?.content ? lastMessage.content : "Hat ein Bild gesendet") : ""
                }
                lastMessageDate={lastMessage?.createdAt}
                isOwnMessage={isOwnMessage}
                inseratTitle={conversations.inserat?.title}
            />

        </div>
    );
}

export default StartedChats;