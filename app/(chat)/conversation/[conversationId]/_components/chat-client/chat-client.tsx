'use client'

import { MessageSquareIcon, User2Icon } from "lucide-react";
import ChatSideBar from "../chat-sidebar";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import RenderedChatClient from "./rendered-chat";
import { useMediaQuery } from 'react-responsive';

interface ChatClientProps {
    startedConversations: any[];
    currentUser: any;
}

const ChatClient = ({ startedConversations, currentUser } : ChatClientProps) => {

    const conversationId = useSearchParams().get("conversationId");

    const [currentConversation, setCurrentConversation] = useState<any | null>(null);
    const isSmOrLarger = useMediaQuery({ query: '(min-width: 640px)' }); 

    useMemo(() => {
        if(conversationId) {
            
            setCurrentConversation(startedConversations?.find((conversation) => conversation?.id === conversationId))
     } else {
      setCurrentConversation(null)
     }
    },[conversationId, startedConversations])

    const filteredConversations = startedConversations.filter((conversation) => (conversation?.id === conversationId || conversation?.messages?.length > 0));

    return (
        <div className="sm:flex sm:flex-row sm:justify-center h-full max-h-[920px]">
    {!(currentConversation && !isSmOrLarger) && (
        <div className="dark:bg-[#0F0F0F] sm:mr-4 sm:rounded-md sm:w-[280px] w-full h-full max-h-full dark:border-[#1a1a1a] sm:border flex flex-col">
            <h3 className="text-md font-semibold flex items-center p-4">
                <MessageSquareIcon className="w-4 h-4 mr-2" />  
                Konversationen {startedConversations.length > 0 && <p className="ml-4 text-base"> {startedConversations.length} </p>}
            </h3>
            {startedConversations.length > 0 ? (
                <div className="flex-grow overflow-y-auto">
                    <ChatSideBar
                        startedConversations={filteredConversations}
                        currentUser={currentUser}
                        isProfileChat={currentConversation?.inseratId ? false : true}
                    />
                </div>
            ) : (
                <div className="mt-4 flex justify-center">
                    <p className="text-sm text-gray-300/60"> Noch keine Konversation begonnen...</p>
                </div>
            )}
        </div>
    )}

    {currentConversation ? (
        <div className="sm:flex sm:justify-center sm:px-4 w-full sm:w-[760px] h-full ">
            <RenderedChatClient 
                otherUserDetails={currentConversation.user1Id === currentUser.id ? currentConversation.user2 : currentConversation.user1}
                thisConversation={currentConversation}
                currentUser={currentUser}
            />
        </div>
    ) : (
        <div className="md:w-[760px] dark:bg-[#1c1c1c] overflow-y-auto no-scrollbar rounded-md bg-white hidden md:block h-full">
            <div className="rounded-lg h-full flex justify-center items-center font-semibold text-lg">
                <div className="mr-2">
                    <User2Icon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                </div>
                Tippe auf eine Konversation um sie zu öffnen...
            </div>
        </div>
    )}
</div>

    );
}

export default ChatClient;