import getCurrentUser from "@/actions/getCurrentUser";


import ChatComponent from "./_components/chat-component";

import { ArrowLeft, ArrowLeftCircle, MessageSquareIcon, TrendingUp, User2Icon, UserIcon } from "lucide-react";
import MobileHeaderChat from "./_components/mobile-header";
import ChatInput from "./_components/_chatcomponents/chat-input";
import HeaderLogo from "@/app/(dashboard)/_components/header-logo";
import Image from "next/image";


import ChatHeader from "./_components/chat-header";

import { find } from "lodash";
import RenderedChats from "./_components/rendered-chats";
import StartedChats from "./_components/started-chats";
import MobileHeader from "@/app/(dashboard)/_components/mobile-header";
import ReturnToChat from "./_components/return-to-chat";
import db from "@/db/drizzle";
import { and, eq, is, isNotNull, or } from "drizzle-orm";
import { conversation, notification } from "@/db/schema";
import { userTable, message } from '../../../../db/schema';
import Footer from "@/app/(dashboard)/_components/footer";
import AdsComponent from "@/components/ad-component";
import { redirect } from "next/navigation";



const ConversationPage = async ({
    params
}: { params: { conversationId: string } }) => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return redirect("/")
    }

    let startedConversations: typeof conversation.$inferSelect[] = [];;

    if (currentUser) {
        startedConversations = await db.query.conversation.findMany({
            where: (
                or(
                    eq(conversation.user1Id, currentUser.id),
                    eq(conversation.user2Id, currentUser.id)

                )
            ), with: {
                messages: true,
                user1: true,
                user2: true


            }
        })
    } else {
        startedConversations = [];
    }

    const thisConversation = await db.query.conversation.findFirst({
        where: eq(conversation.id, params.conversationId),
        with: {
            user1: true,
            user2: true,
            blocks: true
        }

    })

    const justConversation = await db.query.conversation.findFirst({
        where: eq(conversation.id, params.conversationId)
    })



    const messages = await db.query.message.findMany({
        where: eq(
            message.conversationId, params.conversationId
        ), with: {
            sender: true,
            inserat: {
                with: {
                    images: true
                }
            }
        }
    })

    //if user clicks on chat, mark all chat notifications as seen
    const patchNotifications = await db.update(notification).set({
        seen: true
    }).where(
        and(
            eq(notification.conversationId, params.conversationId),
            eq(notification.userId, currentUser.id)
        )
    )

    const otherUserId = thisConversation?.user1Id === currentUser.id ? thisConversation?.user2Id : thisConversation?.user1Id;



    const otherUserDetails = await db.query.userTable.findFirst({
        where: eq(
            userTable.id, otherUserId
        )
    })



    const attachments = await db.query.message.findMany({
        where: (
            and(
                isNotNull(message.image),
                eq(message.conversationId, params.conversationId)
            )
        ), orderBy: (message, { asc }) => [asc(message.createdAt)]


    })

    let otherUserChat: typeof userTable.$inferSelect;

    const findNotifications = db.query.notification.findMany({
        where: (
            eq(notification.userId, currentUser?.id)
        )

    }).prepare("findNotifications")

    const foundNotifications = await findNotifications.execute();

   

    return (
        <div className="dark:bg-[#0F0F0F] bg-[#404040]/10 overflow-y-hidden">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>
            <div className="flex justify-center min-h-full sm:py-8  sm:px-4">
            <div className='h-full sm:flex items-center justify-center w-2/12  p-16 hidden'>
                        <div className=' w-full sm:block hidden space-y-4'>
                            <div>
                                <AdsComponent dataAdSlot='3797720061' />
                            </div>
                            
                            
                        </div>
                </div>
                <div className="dark:bg-[#0F0F0F] bg-white mr-4 rounded-md w-[280px] 
            h-full hidden md:block dark:border-[#1C1C1C] border">
                    <h3 className="text-md font-semibold flex items-center p-4 ">
                        <MessageSquareIcon className="w-4 h-4 mr-2" />  Konversationen {startedConversations.length > 0 && <p className="ml-4 text-base"> {startedConversations.length} </p>}
                    </h3>
                    <div className="mt-4">
                        {startedConversations.map((conversation) => (
                            <StartedChats
                                key={conversation.id}
                                conversations={conversation}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                </div>

                <div className="w-[1044px] dark:bg-[#151515] max-h-screen overflow-y-auto no-scrollbar rounded-md bg-white ">
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
                                <div className="w-2/4 truncate">
                                    {otherUserDetails.name}
                                </div>
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
                                    messages={messages}
                                    currentUser={currentUser}
                                    thisConversation={justConversation}
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