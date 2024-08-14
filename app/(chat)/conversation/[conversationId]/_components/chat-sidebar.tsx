'use client'

import { conversation } from "@/db/schema";
import StartedChats from "./started-chats";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { pusherClient } from "@/lib/pusher";

interface ChatSideBarProps {
    startedConversations: any[],
    currentUser : any
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({
    startedConversations,
    currentUser
}) => {

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentFilter, setCurrentFilter] = useState<"ALL" | "UNREAD" | null>(null);

    const [renderedConversations, setRenderedConversations] = useState(
        startedConversations.sort((a , b) => {
            //@ts-ignore
            return new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt);
        })
    );

    

    useMemo(() => {
        if(currentTitle === "") {
            setRenderedConversations(startedConversations)
        } else {
            setRenderedConversations(startedConversations.filter((conversation) => {
                return conversation.user1.name.toLowerCase().includes(currentTitle.toLowerCase()) && conversation?.user1Id !== currentUser?.id
                 || conversation.user2.name.toLowerCase().includes(currentTitle.toLowerCase()) && conversation?.user2Id !== currentUser?.id
            }))
        }
    },[currentTitle])

    useMemo(() => {
        if(!currentFilter) {
            setRenderedConversations(startedConversations)
        } else if(currentFilter === "UNREAD") {
            setRenderedConversations(startedConversations.filter((conversation) => {
                return conversation.messages.some((message) => {
                    return message.senderId !== currentUser.id && !message.seen
                })
            }))
        }
    },[currentFilter])


    useEffect(() => {
        
        pusherClient.bind("messages:new", (message) => {
            console.log(message.conversationId)
            setRenderedConversations((current) => {
                const conversationIndex = current.findIndex((conversation) => conversation.id === message.conversationId);
                const newConversations = [...current];
                newConversations[conversationIndex].lastMessage = message;
                return newConversations.sort((a , b) => {
                    //@ts-ignore
                    return new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt);
                })
            })
        })
    },[])
    

    return (
        <div>
            <div className=" flex items-center">
                <Input
                className="w-full dark:bg-[#1c1c1c] dark:border-none rounded-none"
                placeholder="Suche nach einem Chat.."
                value={currentTitle}
                onChange={(e) => setCurrentTitle(e.target.value)}
                />
                <div>
                    <Button className="bg-indigo-800 text-gray-200 font-semibold rounded-l-none hover:bg-indigo-900 hover:text-gray-300">
                        <MagnifyingGlassIcon className="w-4 h-4"/>
                    </Button>
                </div>
            </div>
            <div className="pb-4 mt-2 flex justify-evenly">
            <Button size="sm" className="text-xs pt-0 bg-indigo-800 hover:bg-indigo-900 text-gray-200 dark:text-gray-300"
            onClick={() => setCurrentFilter(null)}
            disabled={!currentFilter}
            >
                Alle
            </Button>

            <Button size="sm" className="text-xs pt-0 bg-indigo-800 hover:bg-indigo-900 text-gray-200 dark:text-gray-300"
            disabled={currentFilter === "UNREAD"}
            onClick={() => setCurrentFilter("UNREAD")}
            >
                Ungelesen
            </Button>
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