

import getCurrentUser from "@/actions/getCurrentUser";


import ChatComponent from "./_components/chat-component";

import { MessageSquareIcon } from "lucide-react";

import ChatInput from "./_components/_chatcomponents/chat-input";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import Image from "next/image";


import ChatHeader from "./_components/chat-header";


import StartedChats from "./_components/started-chats";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import ReturnToChat from "./_components/return-to-chat";
import db from "@/db/drizzle";
import { and, eq, isNotNull, or } from "drizzle-orm";
import { conversation, notification } from "@/db/schema";
import { userTable, message, images } from '../../../../db/schema';
import Footer from "@/app/(dashboard)/_components/footer";
import AdsComponent from "@/components/ad-component";
import { redirect } from "next/navigation";
import ChatSideBar from "./_components/chat-sidebar";
import { cache } from "react";
import { findStartedConversationsGlobal } from "@/actions/findStartedConversations";

import getCurrentUserWithNotificationsFolders from "@/actions/getCurrentUserWithNotificationsFolders";




const ConversationPage = async ({
    params
}: { params: { conversationId: string } }) => {


    //get as only call
    const currentUser = await getCurrentUserWithNotificationsFolders();

    if (!currentUser) {
        return redirect("/")
    }

    let startedConversations: typeof conversation.$inferSelect[] | any = [];;




    const receivedConversations = await findStartedConversationsGlobal(currentUser.id);

    startedConversations = receivedConversations.filter((conversation: any) => {

        return conversation.messages.length > 0 || conversation?.id === params.conversationId;
    });



    const thisConversation: any = startedConversations.find((conversation: any) => conversation.id === params.conversationId);





    //if user clicks on chat, mark all chat notifications as seen








    const otherUserDetails: any = thisConversation?.user1Id === currentUser.id ? thisConversation?.user2 : thisConversation?.user1;









    return (
        <div className="dark:bg-[#0F0F0F] bg-[#404040]/10 overflow-y-hidden">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={currentUser.notifications}
                />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={currentUser.notifications}
                />
            </div>
            <div className="flex justify-center min-h-full sm:py-8 sm:px-4">
                <div className='h-full sm:flex items-center justify-center w-2/12  p-16 hidden'>
                    <div className=' w-full sm:block hidden space-y-4'>
                        <div>
                            <AdsComponent dataAdSlot='3797720061' />
                        </div>


                    </div>
                </div>
                <div className="dark:bg-[#0F0F0F] bg-white mr-4 rounded-md w-[280px] 
            min-h-full hidden md:block dark:border-[#1C1C1C] border">
                    <h3 className="text-md font-semibold flex items-center p-4 ">
                        <MessageSquareIcon className="w-4 h-4 mr-2" />  Konversationen {startedConversations.length > 0 &&
                            <p className="ml-4 text-base"> {startedConversations.length} </p>}
                    </h3>
                    <div className="mt-4">
                        <ChatSideBar
                            startedConversations={startedConversations}
                            currentUser={currentUser}
                        />
                    </div>
                </div>

                <div className="sm:w-[1044px] dark:bg-[#151515] max-h-screen overflow-y-auto no-scrollbar rounded-md bg-white ">
                    <div className="rounded-lg h-full no-scrollbar ">
                        <div className="relative">
                            <h3 className="dark:text-gray-100 dark:bg-[#0F0F0F] text-md truncate sm:text-2xl flex items-center p-4 font-semibold  sticky top-0 z-10">
                                <ReturnToChat />
                                <Image
                                    className="rounded-full w-[40px] h-[40px] object-cover mr-4"
                                    src={otherUserDetails.image || "/placeholder-person.jpg"}
                                    width={40}
                                    height={40}
                                    alt="Profile Picture"
                                />
                                <a className="w-2/4 truncate hover:underline" href={`/profile/${otherUserDetails?.id}`}>
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
                            <div className="overflow-y-auto h-[800px] no-scrollbar" id="chat-render">
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
                            <div className="sticky bottom-0 w-full flex items-center border-t border-gray-600/10 ">
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
                <div className='h-full sm:flex items-center justify-center w-2/12  p-16 hidden'>
                    <div className=' w-full sm:block hidden space-y-4'>
                        <div>
                            <AdsComponent dataAdSlot='3797720061' />
                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default ConversationPage;