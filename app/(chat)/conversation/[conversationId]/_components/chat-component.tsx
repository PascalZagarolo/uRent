'use client'

import { db } from "@/utils/db";
import ChatInput from "./_chatcomponents/chat-input";
import ChatMessageRender from "./_chatcomponents/chat-message-render";
import { Messages, User, Conversation, Inserat, Images } from '@prisma/client';
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useParams } from "next/navigation";
import { find, set } from "lodash";
import { format } from "date-fns";

type MessageWithInserat = Messages & { inserat : Inserat & { images : Images } }

interface ChatComponentProps {
    messages : MessageWithInserat[]
    currentUser : User;
    conversation : Conversation;
}

const ChatComponent: React.FC<ChatComponentProps> =  ({
    messages,
    currentUser,
    conversation
}) => {

    const formateDate = (date : Date) => {
        const chatBegin = format(new Date(date), "yyyy-MM-dd");
        return chatBegin;
    }

    const params = useParams();
    const conversationId = params!.conversationId.toString();
    const bottomRef = useRef<HTMLDivElement>(null);
    const [pMessages, setMessages] = useState(messages);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });

        const messageHandler = (message) => {
            setMessages((current) => {
                if(find(current, {id : message.id})) {
                    current
                }

                return [...current, message]
            });

            bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
        }

        const deleteMessage = (message : Messages) => {
            setMessages((current) => {
                
                const index = current.findIndex((m) => m.id === message.id);
            
                if (index !== -1) {
                  
                  const updatedMessages = [...current.slice(0, index), ...current.slice(index + 1)];
                  return updatedMessages;
                }
        
                
                return current;
              });

            bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
        }

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('messages:delete', deleteMessage);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('messages:delete', deleteMessage);
        }
    }, )
    

    return ( 
        <div className="no-scrollbar  overflow-y-auto h-screen w-full " >
            <div className="dark:bg-[#1C1C1C]">
            <h3 className="flex justify-center  text-gray-900/30 p-4  dark:text-gray-100">
            Chat gestartet am {formateDate(conversation.createdAt)}
            </h3>
            <div className="no-scrollbar h-full overflow-y-hidden">
            {pMessages.map((message : MessageWithInserat) => (
                <ChatMessageRender
                key={message.id}
                messages={message}
                isOwn={message.senderId === currentUser.id}
                
                />
                
            ))}
            </div>
           
            </div>
            <div className="h-screen text-gray-100 flex justify-center w-full bottom-0   ">
               
            </div>
        </div>
     );
}
 
export default ChatComponent;