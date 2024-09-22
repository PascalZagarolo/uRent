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

const RenderedChatClient = ({ otherUserDetails, currentUser, thisConversation } : RenderedChatClientProps) => {

   

    return ( 
        <div className="w-[1044px] dark:bg-[#151515] max-h-screen overflow-y-auto no-scrollbar rounded-md bg-white ">
                    <div className="rounded-lg h-full no-scrollbar ">
                        <div className="relative h-full">
                            <h3 className="dark:text-gray-100 dark:bg-[#0F0F0F] text-md truncate sm:text-2xl 
                            flex items-center p-4 font-semibold  sticky top-0 z-10">
                                <ReturnToChat />
                                <Image
                                    className="rounded-full w-[40px] h-[40px] object-cover mr-4"
                                    src={otherUserDetails.image || "/placeholder-person.jpg"}
                                    width={40}
                                    height={40}
                                    alt="Profile Picture"
                                />
                                <a className="w-2/4 line-clamp-1 hover:underline" href={`/profile/${otherUserDetails?.id}`}>
                                    {otherUserDetails.name}
                                </a>
                                <div className="ml-auto">
                                    <ChatHeader
                                        otherUser={otherUserDetails}
                                        // @ts-ignore
                                        foundBlocks={thisConversation?.blocks}
                                        currentUser={currentUser}
                                    />
                                </div>
                            </h3>
                            <div className="overflow-y-auto h-full flex-grow no-scrollbar" id="chat-render">
                                <ChatComponent
                                    //@ts-ignore
                                    messages={thisConversation?.messages}
                                    currentUser={currentUser}
                                    thisConversation={thisConversation}
                                />
                                {thisConversation?.blocks.length > 0 && (
                                    <div className="w-full flex justify-center items-center py-8">
                                        <p className="text-sm text-gray-300/60">Du kannst keine Nachrichten mehr senden, da einer der Gesprächsteilnehmer die Konversation blockiert hat</p>
                                    </div>

                                )}
                            </div>
                            <div className="sticky bottom-0 w-full  flex items-center ">
                                <ChatInput
                                    otherUser={otherUserDetails.id}
                                    otherUserName={currentUser?.name}
                                    //@ts-ignore
                                    existingBlock={thisConversation?.blocks}
                                />

                            </div>
                        </div>
                    </div>

                </div>
     );
}
 
export default RenderedChatClient;