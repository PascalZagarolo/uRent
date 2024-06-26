'use client'


import ChatMessageRender from "./_chatcomponents/chat-message-render";

import { use, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useParams } from "next/navigation";
import { find, set } from "lodash";
import { format } from "date-fns";
import { conversation, message, userTable } from "@/db/schema";
import { Separator } from "@radix-ui/react-select";



interface ChatComponentProps {
    messages : typeof message.$inferSelect[]
    currentUser : typeof userTable.$inferSelect;
    thisConversation : typeof conversation.$inferSelect;
}

const ChatComponent: React.FC<ChatComponentProps> =  ({
    messages,
    currentUser,
    thisConversation
}) => {

    

    const formateDate = (date : Date) => {
        const chatBegin = format(new Date(date), "yyyy-MM-dd");
        return chatBegin;
    }

    const params = useParams();
    const conversationId = params!.conversationId.toString();
    const bottomRef = useRef<HTMLDivElement>(null);
    //@ts-ignore
    const [pMessages, setMessages] = useState(messages.sort((a, b) => a.createdAt - b.createdAt));

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        

        const messageHandler = (message : any) => {
            setMessages((current) => {
                if(find(current, {id : message.id})) {
                    current
                }

                return [...current, message]
            });

            
        }

        const deleteMessage = (message : any) => {
            setMessages((current) => {
                
                const index = current.findIndex((m) => m.id === message.id);
            
                if (index !== -1) {
                  
                  const updatedMessages = [...current.slice(0, index), ...current.slice(index + 1)];
                  return updatedMessages;
                }
        
                
                return current;
              });

            
        }

        pusherClient.bind('messages:new', messageHandler);
        pusherClient.bind('messages:delete', deleteMessage);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind('messages:new', messageHandler);
            pusherClient.unbind('messages:delete', deleteMessage);
        }
    }, )
    
    const startIndex = pMessages.length - 15 < 0 ? 0 : pMessages.length - 15;
    

    const [renderedMessages, setRenderedMessages] = useState(pMessages.slice(startIndex, pMessages.length));

    console.log(renderedMessages.length)
    
    useEffect(() => {
        const startIndex = pMessages.length - 15 < 0 ? 0 : pMessages.length - 15;
        setRenderedMessages(pMessages.slice(startIndex, pMessages.length));
    }, [pMessages]);

    useEffect(() => {
        if (pMessages.length > 0) {
            const lastMessage = document.getElementById(`message-${pMessages[pMessages.length - 1].id}`);
            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
            }
        }
    
        if (bottomRef.current) {
            
            
            bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "center"});
        }
    }, [pMessages, renderedMessages]);

    let markedDates : any = [];

    const isNewDate = (createdAt : Date) => {
        const date = format(new Date(createdAt), "yyyy-MM-dd");
        if (markedDates.includes(date)) {
            return false;
        } else {
            markedDates.push(date);
            return true;
        }
    }

    return ( 
        <div> 
            <div className="no-scrollbar  overflow-y-auto h-full w-full" ref={bottomRef}>
            <div className="h-full">
            <h3 className="flex justify-center  text-gray-900/30 px-4  py-4 dark:text-gray-100 text-sm ">
            Chat gestartet am {formateDate(thisConversation.createdAt)}
            </h3>
            <div className="no-scrollbar p-0.5">
            {renderedMessages.map((message) => (
               <>
               {isNewDate(message.createdAt) && (
                <span className="w-full flex items-center justify-center space-x-8">
                    <Separator 
                     className="w-1/4 bg-gray-900/10 dark:bg-[#272727] h-[0.1px] "
                    />
                <div className="flex justify-center text-gray-900/30 px-4 py-2 dark:text-gray-100 text-sm">
                {format(new Date(message.createdAt), "dd.MM.yyyy")}
                </div>
                <Separator 
                     className="w-1/4 bg-gray-900/10 dark:bg-[#272727] h-[0.1px] "
                    />
                </span>
               )}
               <ChatMessageRender
                key={message.id}
                messages={message}
                isOwn={message.senderId === currentUser.id}
                />
               </>
            ))}
            </div>
            </div>
        </div>
        </div>
     );
}
 
export default ChatComponent;