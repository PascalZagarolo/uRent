import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { MessageCircleDashedIcon } from "lucide-react";
import StartedChats from "../[conversationId]/_components/started-chats";

import { Conversation, User, Messages } from "@prisma/client";

type ConversationWithUsers = Conversation & { users: User[], messages : Messages[] };

const ChatSideBar = async () => {

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

    

    return ( 
        <div className="sm:flex  overflow-y-hidden h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] hidden w-[380px]">
        <div className=" bg-white   dark:bg-[#0F0F0F] w-full">
                <div>
                    <h3 className="flex justify-center p-4 text-lg font-semibold">
                       <MessageCircleDashedIcon className="mr-2"/> Gestartete Konversationen 
                    </h3>
                </div>
                <div>
                {startedConversations.map((conversation: ConversationWithUsers) => (
                        <StartedChats
                        key={conversation.id}
                        conversation={conversation}
                        currentUser = {currentUser}
                        />
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default ChatSideBar;