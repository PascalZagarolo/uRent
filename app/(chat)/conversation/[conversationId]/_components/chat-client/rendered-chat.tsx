'use client'

import Image from "next/image";
import ChatInput from "../_chatcomponents/chat-input";
import ReturnToChat from "../return-to-chat";
import { conversation, userTable } from "@/db/schema";
import ChatHeader from "../chat-header";
import ChatComponent from "../chat-component";
import { useEffect } from "react";


interface RenderedChatClientProps {
    otherUserDetails: typeof userTable.$inferSelect,
    thisConversation: typeof conversation.$inferSelect | any,
    currentUser: typeof userTable.$inferSelect
}

const RenderedChatClient = ({ otherUserDetails, currentUser, thisConversation }: RenderedChatClientProps) => {



    return (
        <div className="w-full dark:bg-[#191919] h-full bg-white max-h-screen overflow-y-scroll sm:overflow-hidden rounded-md shadow-lg">
            <div className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center p-4 dark:bg-[#131313] bg-gray-50  dark:border-gray-700 sticky top-0 z-10">
                    <ReturnToChat />
                    <Image
                        className="rounded-full w-[40px] h-[40px] object-cover mr-4"
                        src={otherUserDetails.image || "/placeholder-person.jpg"}
                        width={40}
                        height={40}
                        alt="Profile Picture"
                    />
                    <a className="text-lg font-semibold dark:text-white text-gray-800 hover:underline truncate w-1/2" href={`/profile/${otherUserDetails?.id}`}>
                        {otherUserDetails.name}
                    </a>
                    <div className="ml-auto">
                        <ChatHeader
                            otherUser={otherUserDetails}
                            //@ts-ignore
                            foundBlocks={thisConversation?.blocks}
                            currentUser={currentUser}
                        />
                    </div>

                </div>
                {thisConversation?.blocks.length > 0 && (
                    <section className="flex justify-center items-center py-10 px-4 bg-[#191919] rounded-lg shadow-lg border border-gray-800">
                        <div className="flex flex-col items-center text-center">
                            {/* Icon (Optional) */}
                            <svg
                                className="w-6 h-6 mb-2 text-gray-400 animate-pulse"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11v2m0 4h.01m-.01-6h-.01m-.01 6h.01m9 3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            {/* Message */}
                            <span className="text-sm font-medium text-gray-300 dark:text-gray-500/80">
                                Du kannst keine Nachrichten mehr senden, da einer der Gesprächsteilnehmer die Konversation blockiert hat
                            </span>
                        </div>
                    </section>
                )}


                {/* Chat Messages */}
                <div className="flex-grow overflow-y-auto min-h-screen no-scrollbar p-4 dark:bg-[#151515] bg-white" id="chat-render">
                    <ChatComponent
                        //@ts-ignore
                        messages={thisConversation?.messages}
                        currentUser={currentUser}
                        thisConversation={thisConversation}
                    />


                </div>

                {/* Chat Input */}
                <div className="sticky bottom-0 w-full bg-white dark:bg-[#0F0F0F]  dark:border-gray-700 shadow-md">
                    <ChatInput
                        otherUser={otherUserDetails.id}
                        otherUserName={currentUser?.name}
                        //@ts-ignore
                        existingBlock={thisConversation?.blocks}
                    />
                </div>
            </div>
        </div>

    );
}

export default RenderedChatClient;