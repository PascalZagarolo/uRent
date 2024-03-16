import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { MessageSquareIcon, User2Icon } from "lucide-react";

import StartedChats from "./[conversationId]/_components/started-chats";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import { Messages, User, Conversation } from "@prisma/client";
import { redirect } from "next/navigation";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";



type ConversationWithUsers = Conversation & { users: User[], messages : Messages[] };

const ConversationPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        redirect("/login")
    }

    let startedConversations: ConversationWithUsers[] = [];

    if(currentUser) {
        startedConversations  = await db.conversation.findMany({
            where : {
                userIds : {
                    has : currentUser?.id
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

    const notifications = await db.notification.findMany({
        where : {
            userId : currentUser?.id
        }
    })

    return ( 
        <div className="dark:bg-[#0F0F0F] bg-[#404040]/10 min-h-screen">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                notifications={notifications}
                />
             </div>
            <div className="flex justify-center h-screen py-8 px-4 ">
            <div className="dark:bg-[#0F0F0F] mr-4 rounded-md w-[280px] h-full dark:border-[#1C1C1C] border">  
                    <h3 className="text-md font-semibold flex items-center p-4 ">
                    <MessageSquareIcon className="w-4 h-4 mr-2"/>  Konversationen {startedConversations.length > 0 && <p className="ml-4 text-base"> {startedConversations.length} </p>}
                    </h3>
                    {startedConversations.length > 0 ? (
                        <div className="mt-4">
                        {startedConversations.map((conversation: ConversationWithUsers) => (
                           <StartedChats
                           key={conversation.id}
                           conversation={conversation}
                           currentUser = {currentUser}
                           />
                        ))}
                    </div>
                    ) : (
                        <div className="mt-4 flex justify-center">
                            <p className="text-sm text-gray-300/60"> Noch keine Konversation begonnen...</p>
                        </div>
                    )}
                </div>
                
                <div className="w-[1044px] dark:bg-[#1c1c1c] max-h-screen overflow-y-auto no-scrollbar rounded-md bg-white hidden md:block">
                    <div className="rounded-lg h-full no-scrollbar">
                        <div className="relative h-full flex justify-center items-center font-semibold text-lg">
                            
                            
                            
                            <div className="mr-2">
                                <User2Icon className="w-12 h-12 text-gray-500 dark:text-gray-400" />
                            </div>
                                Tippe auf eine Konversation um sie zu öffnen...
                           
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ConversationPage;