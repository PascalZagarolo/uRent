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
import { FileIcon, MessageCircleIcon } from "lucide-react";
import { FaFolder } from "react-icons/fa";

interface ChatSideBarProps {
    startedConversations: any[],
    currentUser: any,
    isProfileChat?: boolean
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({
    startedConversations,
    currentUser,
    isProfileChat
}) => {

    const [currentTitle, setCurrentTitle] = useState("");
    const [currentFilter, setCurrentFilter] = useState<"ALL" | "UNREAD" | null>(null);
    const [currentType, setCurrentType] = useState<"INSERAT" | "PROFILE" | null>(isProfileChat ? "PROFILE" : "INSERAT");
    const [currentFolder, setCurrentFolder] = useState<string | null>(null);

    const [renderedConversations, setRenderedConversations] = useState(
        startedConversations.sort((a, b) => {
            //@ts-ignore
            return new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt);
        })
    );

    const filterType = (filteredConversations) => {
        const returnedFilteredConversations = filteredConversations.filter((conversation) => {
            if (currentType === "INSERAT") {
                return conversation.inseratId !== null
            } else if (currentType === "PROFILE") {
                return conversation.inseratId === null
            }
        })

        return returnedFilteredConversations;
    }

    const filterTitle = (filteredConversations) => {
        let returnedArray;
        if (currentTitle === "") {
            returnedArray = filteredConversations;
        } else {
            returnedArray = filteredConversations.filter((conversation) => {
                return conversation.user1.name.toLowerCase().includes(currentTitle.toLowerCase()) && conversation?.user1Id !== currentUser?.id
                    || conversation.user2.name.toLowerCase().includes(currentTitle.toLowerCase()) && conversation?.user2Id !== currentUser?.id
            })
        }

        return returnedArray
    }

    const filterSeenType = (filteredConversations) => {
        let returnedArray;
        if (!currentFilter) {
            returnedArray = filteredConversations;
        } else if (currentFilter === "UNREAD") {
            returnedArray = filteredConversations.filter((conversation) => {
                return conversation.messages.some((message) => {
                    return message.senderId !== currentUser.id && !message.seen
                })
            })
        }

        return returnedArray;
    }

    const filterFolder = (filteredConversations) => {
        let returnedArray;
        if (!currentFolder) {
            returnedArray = filteredConversations;
        } else {
            returnedArray = filteredConversations.filter((conversation) => {
                return conversation.folderOnConversation.some((folder) => folder.folderId === currentFolder)
            })
        }

        return returnedArray;
    }

    useMemo(() => {
        let filteredConversations = startedConversations;
        if (currentFolder) {
            filteredConversations = startedConversations.filter((conversation) => {
                return conversation.folderOnConversation.some((folder) => folder.folderId === currentFolder)
            })
        }

        if (currentType) {
            filteredConversations = filterType(filteredConversations);
        }

        if (currentTitle) {
            filteredConversations = filterTitle(filteredConversations);
        }

        if (currentFilter) {
            filteredConversations = filterSeenType(filteredConversations);
        }
        if (currentFolder) {
            filteredConversations = filterFolder(filteredConversations);
        }

        setRenderedConversations(filteredConversations);
    }, [currentType, currentFilter, currentTitle, currentFolder])



    useEffect(() => {
        pusherClient.bind("messages:new", (message) => {

            setRenderedConversations((current) => {
                const conversationIndex = current?.findIndex((conversation) => conversation.id === message.conversationId);
                const newConversations = [...current];
                if (newConversations[conversationIndex]?.lastMessage) {
                    newConversations[conversationIndex].lastMessage = message
                }
                return newConversations.sort((a, b) => {
                    //@ts-ignore
                    return new Date(b?.lastMessage?.createdAt) - new Date(a?.lastMessage?.createdAt);
                })
            })
        })
    }, [])




    return (
        <div className="h-full flex flex-col">
    <div className="p-2">
        <div className="grid w-full grid-cols-2 bg-[#1C1C1C] rounded-md p-1 items-center">
            <Button value="all" size="sm"
                onClick={() => setCurrentFilter(null)}
                className={currentFilter === null ? "bg-[#0F0F0F] text-gray-200 hover:bg-[#0F0F0F]" :
                    "text-gray-200/60 bg-[#1C1C1C] hover:bg-[#1C1C1C] dark:text-gray-200/60"}
            >Alle</Button>
            <Button value="unread"
                onClick={() => setCurrentFilter("UNREAD")}
                size="sm"
                className={currentFilter === "UNREAD" ? "bg-[#0F0F0F] text-gray-200 hover:bg-[#0F0F0F]" :
                    "text-gray-200/60 bg-[#1C1C1C] hover:bg-[#1C1C1C] dark:text-gray-200/60"}
            >Ungelesen</Button>
        </div>
    </div>

    <div className="flex items-center">
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

    <div className="sm:px-2 py-2 w-full">
        <ChatFolder
            foundFolders={currentUser?.conversationFolders}
            setCurrentFolder={setCurrentFolder}
            currentFolder={currentFolder}
        />
    </div>

    <div className="flex flex-row items-center w-full px-2">
        {currentFolder ? (
            <div className="w-3/4 flex items-center text-lg font-semibold">
                <FaFolder className="w-4 h-4 mr-2" />
                <span className="truncate">
                    {currentUser?.conversationFolders.find((folder) => folder.id === currentFolder)?.title}
                </span>
            </div>
        ) : (
            <div className="w-3/4 truncate text-lg font-semibold">Alle Konversationen</div>
        )}

        <div className="ml-auto flex w-1/4 justify-end">
            <ManageConversations
                foundConversations={startedConversations}
                foundFolders={currentUser?.conversationFolders}
            />
        </div>
    </div>

    <div className="grid w-full grid-cols-2 bg-[#1C1C1C] rounded-md p-1 items-center mb-4">
        <Button value="all" size="sm"
            onClick={() => setCurrentType("INSERAT")}
            className={currentType === "INSERAT" ? "bg-[#0F0F0F] text-gray-200 hover:bg-[#0F0F0F]" :
                "text-gray-200/60 bg-[#1C1C1C] hover:bg-[#1C1C1C] dark:text-gray-200/60"}
        >Inserat</Button>
        <Button value="unread"
            onClick={() => setCurrentType("PROFILE")}
            size="sm"
            className={currentType === "PROFILE" ? "bg-[#0F0F0F] text-gray-200 hover:bg-[#0F0F0F]" :
                "text-gray-200/60 bg-[#1C1C1C] hover:bg-[#1C1C1C] dark:text-gray-200/60"}
        >Profil</Button>
    </div>

    {/* Make the conversation list scrollable */}
    <div className="flex-grow overflow-y-auto no-scrollbar">
        {renderedConversations.map((conversation) => (
            <StartedChats
                key={conversation.id}
                conversations={conversation}
                currentUser={currentUser}
            />
        ))}
    </div>

    {renderedConversations.length === 0 && (
        currentFolder ? (
            <div className="text-sm mt-4 text-gray-200/60 px-8 flex justify-between">
                Noch keine Konversationen diesen Ordner hinzugefügt..
            </div>
        ) : (
            <div className="text-sm mt-4 text-gray-200/60 px-4 h-full flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                <MessageCircleIcon 
                 className="w-8 h-8"
                />
                </div>
                <div className="mt-4 flex flex-row justify-center px-8 text-center">
                {currentFilter === "UNREAD" ? "Keine ungelesenen Konversationen.." : "Keine Konversationen gefunden.."}
                </div>
            </div>
        )
    )}
</div>

    );
}

export default ChatSideBar;