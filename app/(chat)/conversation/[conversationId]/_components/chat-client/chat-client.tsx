'use client'

import { MessageSquareIcon, User2Icon } from "lucide-react";
import ChatSideBar from "../chat-sidebar";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import RenderedChatClient from "./rendered-chat";

interface ChatClientProps {
    startedConversations: any[];
    currentUser: any;
}

const ChatClient = ({ startedConversations, currentUser } : ChatClientProps) => {

    const conversationId = useSearchParams().get("conversationId");

    const [currentConversation, setCurrentConversation] = useState<any | null>(null);


    useMemo(() => {
        if(conversationId) {
            setCurrentConversation(startedConversations.find((conversation) => conversation.id === conversationId))
     } else {
      setCurrentConversation(null)
     }
    },[conversationId, startedConversations])

    return (
        <div className="flex flex-row justify-center h-full">
            <div className="dark:bg-[#0F0F0F] sm:mr-4  sm:rounded-md sm:w-[280px] w-full h-full dark:border-[#1a1a1a] border">
                <h3 className="text-md font-semibold flex items-center p-4 ">
                    <MessageSquareIcon className="w-4 h-4 mr-2" />  Konversationen {startedConversations.length > 0 && <p className="ml-4 text-base"> {startedConversations.length} </p>}
                </h3>
                {startedConversations.length > 0 ? (
                    <div className="mt-4">
                        <ChatSideBar
                            startedConversations={startedConversations}
                            currentUser={currentUser}
                        />
                    </div>
                ) : (
                    <div className="mt-4 flex justify-center">
                        <p className="text-sm text-gray-300/60"> Noch keine Konversation begonnen...</p>
                    </div>
                )}
            </div>

            {currentConversation ? (
                <div className="flex justify-center sm:px-4  w-[760px]">
                <RenderedChatClient 
                otherUserDetails={currentConversation.user1Id === currentUser.id ? currentConversation.user2 : currentConversation.user1}
                thisConversation={currentConversation}
                currentUser={currentUser}
                />
                </div>
            ) : (
                <div className="w-[760px] dark:bg-[#1c1c1c]  overflow-y-auto no-scrollbar rounded-md bg-white hidden md:block">
                <div className="rounded-lg h-full no-scrollbar">
                    <div className="relative h-full flex justify-center items-center font-semibold text-lg">



                        <div className="mr-2">
                            <User2Icon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                        </div>
                        Tippe auf eine Konversation um sie zu öffnen...


                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default ChatClient;