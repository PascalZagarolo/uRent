import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";

import ChatComponent from "./_components/chat-component";

import { MessageSquareIcon, TrendingUp,  User2Icon, UserIcon } from "lucide-react";
import MobileHeaderChat from "./_components/mobile-header";
import ChatInput from "./_components/_chatcomponents/chat-input";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import Image from "next/image";


import ChatHeader from "./_components/chat-header";
import { Conversation, Messages, User } from "@prisma/client";
import { find } from "lodash";
import RenderedChats from "./_components/rendered-chats";
import StartedChats from "./_components/started-chats";

type ConversationWithUsers = Conversation & { users: User[], messages : Messages[] };

const ConversationPage = async ({
    params
}: { params: { conversationId: string } }) => {

    const currentUser = await getCurrentUser();

    let startedConversations: ConversationWithUsers[] = [];

    if(currentUser) {
        startedConversations  = await db.conversation.findMany({
            where : {
                userIds : {
                    has : currentUser.id
                }
            }, include : {
                users : true,
                messages : {
                    orderBy : {
                        createdAt : "asc"
                    }
                
                }
            }
        })
    } else {
        startedConversations = [];
    }

    const conversation = await db.conversation.findUnique({
        where: {
            id: params.conversationId
        }, select: {
            userIds: true
        }
    })

    const justConversation = await db.conversation.findUnique({
        where: {
            id: params.conversationId
        }
    })

    const notifications = await db.notification.findMany({
        where : {
            userId : currentUser.id
        }
    })

    const messages = await db.messages.findMany({
        where: {
            conversationId: params.conversationId
        }, include: {
            sender: true,
            inserat: {
                include: {
                    images: true
                }
            }
        }
    })

    const otherUser = conversation.userIds.find((id) => id !== currentUser.id);

    

    const otherUserDetails = await db.user.findUnique({
        where: {
            id: otherUser,
        },

    })

    

    const attachments = await db.messages.findMany({
        where: {
            conversationId: params.conversationId,
            image: {
                not: null
            }
        }, orderBy: {
            createdAt: "desc"
        }
    })

    let otherUserChat: User;

    return (
        <div className="bg-[#0F0F0F] min-h-screen">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />
            </div>
            <div className="flex justify-center h-screen py-8 px-4">
                <div className="dark:bg-[#1c1c1c] mr-4 rounded-md  w-[280px]">
                    <h3 className="text-xl font-semibold flex items-center p-4 ">
                      <MessageSquareIcon className="w-4 h-4 mr-2"/>  Konversationen {startedConversations.length > 0 && <p className="ml-4 text-base"> {startedConversations.length} </p>}
                    </h3>
                    <div className="mt-4">
                        {startedConversations.map((conversation: ConversationWithUsers) => (
                           <StartedChats
                           key={conversation.id}
                           conversation={conversation}
                           currentUser = {currentUser}
                           />
                        ))}
                    </div>
                </div>
                
                <div className="w-[1044px] dark:bg-[#1c1c1c] max-h-screen overflow-y-auto no-scrollbar rounded-md bg-white">
                    <div className="rounded-lg h-full no-scrollbar">
                        <div className="relative h-full">
                            <h3 className="dark:text-gray-100 dark:bg-[#0F0F0F] text-2xl flex items-center p-4 font-semibold border border-gray-600/10 sticky top-0 z-10">
                                <Image 
                                 className="rounded-full w-[40px] h-[40px] object-cover mr-4"
                                 src={otherUserDetails.image || "/placeholder-person.jpg"}
                                 width={40}
                                height={40}
                                alt="Profile Picture"
                                />{otherUserDetails.name} <p className="ml-4 text-lg"> </p>
                                <div className="ml-auto">
                                    <ChatHeader 
                                    otherUser={otherUserDetails}
                                    />
                                </div>
                            </h3>
                            <div className="overflow-y-auto h-full no-scrollbar">

                                <ChatComponent
                                    //@ts-ignore
                                    messages={messages}
                                    currentUser={currentUser}
                                    conversation={justConversation}
                                />
                            </div>
                            <div className="sticky bottom-0 w-full flex items-center border-t border-gray-600/10 ">
                                <ChatInput />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ConversationPage;