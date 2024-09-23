import getCurrentUser from "@/actions/getCurrentUser";

import { MessageSquareIcon, User2Icon } from "lucide-react";

import StartedChats from "./[conversationId]/_components/started-chats";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";

import { redirect } from "next/navigation";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import db from "@/db/drizzle";
import { eq, or } from "drizzle-orm";
import { conversation, notification } from '../../../db/schema';
import Footer from "@/app/(dashboard)/_components/footer";
import AdsComponent from "@/components/ad-component";
import ChatSideBar from "./[conversationId]/_components/chat-sidebar";
import { findStartedConversationsGlobal } from "@/actions/findStartedConversations";
import getCurrentUserWithFavourites from "@/actions/getCurrentUserWithFavourites";

import getCurrentUserWithNotificationsFolders from "@/actions/getCurrentUserWithNotificationsFolders";
import ChatClient from "./[conversationId]/_components/chat-client/chat-client";




const ConversationPage = async () => {

    const currentUser = await getCurrentUserWithNotificationsFolders();

    if (!currentUser) {
        return redirect("/")
    }

    if (!currentUser) {
        redirect("/login")
    }



    let startedConversations: any = [];





    const receivedConversations = await findStartedConversationsGlobal(currentUser.id);

    startedConversations = receivedConversations.filter((conversation: any) => {

        return conversation.messages.length > 0;
    });



   






    return (
        <div className="dark:bg-[#0F0F0F] bg-[#404040]/10 min-h-screen h-full">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                />
            </div>
            <div className="flex flex-row justify-center h-full py-4 sm:px-4 ">
                <div className='h-screen sm:flex items-center justify-center w-2/12  p-16 hidden'>
                    <div className=' w-full sm:block hidden space-y-4'>
                        <div>
                            <AdsComponent dataAdSlot='3797720061' />
                        </div>

                    </div>
                </div>

                
                <ChatClient
                    currentUser={currentUser}
                    startedConversations={startedConversations}
                />
                

                <div className='h-screen sm:flex items-center justify-center w-2/12  p-16 hidden'>
                    <div className=' w-full sm:block hidden space-y-4'>
                        <div>
                            <AdsComponent dataAdSlot='3797720061' />
                        </div>


                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default ConversationPage;