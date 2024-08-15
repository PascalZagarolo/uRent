'use client'

import { conversation } from "@/db/schema";
import StartedChats from "./started-chats";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatFolder from "./chat-folder";
import ManageConversations from "./_manage-chat-components/manage-conversations";

interface ChatSideBarProps {
    startedConversations: any[],
    currentUser: any
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({
    startedConversations,
    currentUser
}) => {

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentFilter, setCurrentFilter] = useState<"ALL" | "UNREAD" | null>(null);
    const [currentFolder, setCurrentFolder] = useState<string | null>(null);

    const [renderedConversations, setRenderedConversations] = useState(
        startedConversations.sort((a, b) => {
            //@ts-ignore
            return new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt);
        })
    );



    useMemo(() => {
        if (currentTitle === "") {
            setRenderedConversations(startedConversations)
        } else {
            setRenderedConversations(startedConversations.filter((conversation) => {
                return conversation.user1.name.toLowerCase().includes(currentTitle.toLowerCase()) && conversation?.user1Id !== currentUser?.id
                    || conversation.user2.name.toLowerCase().includes(currentTitle.toLowerCase()) && conversation?.user2Id !== currentUser?.id
            }))
        }
    }, [currentTitle])

    useMemo(() => {
        
        if (!currentFilter) {
            setRenderedConversations(startedConversations)
        } else if (currentFilter === "UNREAD") {
            setRenderedConversations(startedConversations.filter((conversation) => {
                return conversation.messages.some((message) => {
                    return message.senderId !== currentUser.id && !message.seen
                })
            }))
        }
    }, [currentFilter])


    useEffect(() => {
        pusherClient.bind("messages:new", (message) => {
            console.log(message.conversationId)
            setRenderedConversations((current) => {
                const conversationIndex = current.findIndex((conversation) => conversation.id === message.conversationId);
                const newConversations = [...current];
                newConversations[conversationIndex].lastMessage = message;
                return newConversations.sort((a, b) => {
                    //@ts-ignore
                    return new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt);
                })
            })
        })
    }, [])


    return (
        <div>
                <div className="p-2">
                <div className="grid w-full grid-cols-2 bg-[#1C1C1C] rounded-md p-1 items-center ">
                    <Button value="all" size="sm"
                    onClick={() => 
                    {
                        setCurrentFilter(null);
                        
                    }}
                    
                    className={currentFilter === null ? "bg-[#0F0F0F] text-gray-200 hover:bg-[#0F0F0F] " : 
                    "text-gray-200/60 bg-[#1C1C1C] hover:bg-[#1C1C1C] dark:text-gray-200/60 "}
                    >Alle</Button>
                    <Button value="unread"
                    
                    onClick={() => setCurrentFilter("UNREAD")}
                    size="sm"
                    className={currentFilter === "UNREAD" ? "bg-[#0F0F0F] text-gray-200 hover:bg-[#0F0F0F]" : 
                    "text-gray-200/60 bg-[#1C1C1C] hover:bg-[#1C1C1C] dark:text-gray-200/60"}
                    >Ungelesen</Button>
                </div>
                </div>
            
            <div className=" flex items-center">
                <Input
                    className="w-full dark:bg-[#1c1c1c] dark:border-none rounded-none"
                    placeholder="Suche nach einem Chat.."
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                />
                <div>
                    <Button className="bg-indigo-800 text-gray-200 font-semibold rounded-l-none hover:bg-indigo-900 hover:text-gray-300">
                        <MagnifyingGlassIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div className="px-2 py-2 w-full">
                    <ChatFolder 
                    foundFolders={currentUser?.conversationFolders}
                    setCurrentFolder={setCurrentFolder}
                    currentFolder={currentFolder}
                    />
            </div>
            <div className="ml-auto justify-end flex">
                    <ManageConversations 
                    foundConversations={startedConversations}
                    foundFolders={currentUser?.conversationFolders}
                    />
            </div>
            {renderedConversations.map((conversation) => (
                <StartedChats
                    key={conversation.id}
                    conversations={conversation}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}

export default ChatSideBar;