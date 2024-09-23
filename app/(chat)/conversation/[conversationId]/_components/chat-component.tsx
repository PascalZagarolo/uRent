'use client'


import ChatMessageRender from "./_chatcomponents/chat-message-render";

import { use, useEffect, useMemo, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { useParams, useSearchParams } from "next/navigation";
import { find, set } from "lodash";
import { format } from "date-fns";
import { conversation, message, userTable } from "@/db/schema";
import { Separator } from "@radix-ui/react-select";



interface ChatComponentProps {
  messages: typeof message.$inferSelect[]
  currentUser: typeof userTable.$inferSelect;
  thisConversation: typeof conversation.$inferSelect;
}

const ChatComponent: React.FC<ChatComponentProps> = ({
  messages,
  currentUser,
  thisConversation
}) => {



  const formateDate = (date: Date) => {
    const chatBegin = format(new Date(date), "yyyy-MM-dd");
    return chatBegin;
  }

  const params = useSearchParams().get("conversationId");
  const conversationId = params?.toString();
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  //@ts-ignore
  const [hasMoreMessages, setHasMoreMessages] = useState(false);





  const [renderedMessages, setRenderedMessages] = useState(messages.sort((a: any, b: any) => a.createdAt - b.createdAt));


  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (message: any) => {
      setRenderedMessages((current) => {
        if (find(current, { id: message.id })) {
          current
        }

        return [...current, message]
      });


    }

    const deleteMessage = (message: any) => {
      setRenderedMessages((current) => {

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
  })


  useEffect(() => {
    setHasMoreMessages(messages.length > 15);
  }, [conversationId])


  useMemo(() => {
    setRenderedMessages(messages.sort((a: any, b: any) => a.createdAt - b.createdAt));
  }, [messages])



  // useEffect(() => {
  //     if (pMessages.length > 0) {
  //         const lastMessage = document.getElementById(`message-${pMessages[pMessages.length - 1].id}`);
  //         if (lastMessage) {
  //             lastMessage.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" });
  //         }
  //     }

  //     if (bottomRef.current) {


  //         bottomRef.current.scrollIntoView({  block: "end", inline: "center" });
  //     }
  // }, [pMessages, renderedMessages, messages]);

  let markedDates: any = [];

  const isNewDate = (createdAt: Date) => {
    const date = format(new Date(createdAt), "yyyy-MM-dd");
    if (markedDates.includes(date)) {
      return false;
    } else {
      markedDates.push(date);
      return true;
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversationId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth' // Add smooth scrolling animation
      });
    }
  }, [renderedMessages]);

  return (
    <div className="flex flex-col h-full">
      {/* Header or Chat start info */}


      {/* Message Container: Scrollable section */}
      <div className="flex-1 overflow-y-auto no-scrollbar" ref={chatContainerRef}>
        <div className="p-2 flex-col">
          {renderedMessages.map((message) => (
            <div key={message.id}>
              {isNewDate(message.createdAt) && (
                <span className="w-full flex items-center justify-center space-x-8">
                  <Separator className="w-1/4 bg-gray-900/10 dark:bg-[#272727] h-[0.1px]" />
                  <div className="flex justify-center text-gray-900/30 px-4 py-2 dark:text-gray-100 text-sm">
                    {format(new Date(message.createdAt), "dd.MM.yyyy")}
                  </div>
                  <Separator className="w-1/4 bg-gray-900/10 dark:bg-[#272727] h-[0.1px]" />
                </span>
              )}
              <ChatMessageRender
                messages={message}
                isOwn={message.senderId === currentUser.id}
              />
              <div ref={bottomRef} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default ChatComponent;