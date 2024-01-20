'use client'

import { db } from "@/utils/db";
import ChatInput from "./_chatcomponents/chat-input";
import ChatMessageRender from "./_chatcomponents/chat-message-render";
import { Messages, User, Conversation } from '@prisma/client';
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useParams } from "next/navigation";
import { find } from "lodash";

interface ChatComponentProps {
    messages : Messages[] 
    currentUser : User
}

const ChatComponent: React.FC<ChatComponentProps> =  ({
    messages,
    currentUser
}) => {

    const params = useParams();
    const conversationId = params.conversationId.toString();
    const bottomRef = useRef<HTMLDivElement>(null);
    const [pMessages, setMessages] = useState(messages);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });

        const messageHandler = (message : Messages) => {
            setMessages((current) => {
                if(find(current, {id : message.id})) {
                    current
                }

                return [...current, message]
            });

            bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
        }

        pusherClient.bind('messages:new', messageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
        }
    }, )
    

    return ( 
        <div className="no-scrollbar  overflow-y-auto h-screen" >
            <div className="">
            <h3 className="flex justify-center text-gray-900/30 p-4 font-semibold">
                Chat gestartet am {messages[0].createdAt.toLocaleDateString()} 
            </h3>
            <div className="no-scrollbar h-full overflow-y-hidden">
            {pMessages.map((message) => (
                <ChatMessageRender
                key={message.id}
                messages={message}
                isOwn={message.senderId === currentUser.id}
                
                />
            
            ))}
            </div>
           
            </div>
            <div className="h-screen text-gray-100 flex justify-center w-full bottom-0   ">
               <ChatInput/>
            </div>
        </div>
     );
}
 
export default ChatComponent;