import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import ConversationProfileBar from "./_components/conversation-profile-bar";
import ChatComponent from "./_components/chat-component";
import ChatLogo from "../_components/chat-logo";
import ChatSideBar from "../_components/chat-sidebar";
import { MessageSquareIcon, TrendingUp, UserIcon } from "lucide-react";
import MobileHeaderChat from "./_components/mobile-header";
import ChatInput from "./_components/_chatcomponents/chat-input";

const ConversationPage = async ({
    params
}: { params: { conversationId: string } }) => {

    const currentUser = await getCurrentUser();

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


    return (
        <div className="bg-[#0F0F0F] min-h-screen">
            <div className="flex justify-center h-screen py-8 px-4">
                <div className="w-[1044px] dark:bg-[#1c1c1c] max-h-screen overflow-y-auto no-scrollbar rounded-md bg-white">
                    <div className="rounded-lg h-full no-scrollbar">
                        <div className="relative h-full">
                            <h3 className="dark:text-gray-100 dark:bg-[#0F0F0F] text-2xl flex items-center p-4 border border-gray-600/10 sticky top-0 z-10">
                                <UserIcon className="mr-4" /> {otherUserDetails.name} <p className="ml-4 text-lg"> </p>
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
                                <ChatInput/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ConversationPage;