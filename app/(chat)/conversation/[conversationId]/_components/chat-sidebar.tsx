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
import { FileIcon } from "lucide-react";
import { FaFolder } from "react-icons/fa";

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


    useMemo(() => {
        if (currentFolder) {
            setRenderedConversations(startedConversations.filter((conversation) => {
                return conversation.folderOnConversation.some((folder) => folder.folderId === currentFolder)
            }))
        } else {
            setRenderedConversations(startedConversations)
        }
    }, [currentFolder])

    return (
        <div className="">
            <div className="p-2">
                <div className="grid w-full grid-cols-2 bg-[#1C1C1C] rounded-md p-1 items-center ">
                    <Button value="all" size="sm"
                        onClick={() => {
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
            <div className="flex flex-row items-center w-full px-2">
                {currentFolder ? (
                    <div className="w-3/4 flex items-center text-lg font-semibold">
                        <div>
                            <FaFolder className="w-4 h-4 mr-2" />
                        </div>
                        <span className="truncate">
                            {currentUser?.conversationFolders.find((folder) => folder.id === currentFolder)?.title}
                        </span>
                    </div>
                ) : (
                    <div className="w-3/4 truncate text-lg font-semibold">
                        Alle Konversationen
                    </div>
                )}
                <div className="ml-auto flex w-1/4 justify-end">
                    <ManageConversations
                        foundConversations={startedConversations}
                        foundFolders={currentUser?.conversationFolders}
                    />
                </div>
            </div>
            {renderedConversations.map((conversation) => (
                <StartedChats
                    key={conversation.id}
                    conversations={conversation}
                    currentUser={currentUser}
                />
            ))}

            {renderedConversations.length === 0 && (
                currentFolder ? (
                    <div className="text-sm mt-4 text-gray-200/60 px-8 flex justify-between">
                        Noch keine Konversationen diesen Ordner hinzugefügt..
                    </div>
                ) : (
                    <div className="text-sm mt-4 text-gray-200/60 px-8 flex justify-between">
                        {currentFilter === "UNREAD" ? "Keine ungelesenen Konversationen.." : "Keine Konversationen gefunden.."}
                    </div>
                )
            )}
        </div>
    );
}

export default ChatSideBar;