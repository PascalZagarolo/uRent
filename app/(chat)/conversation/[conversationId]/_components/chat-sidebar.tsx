import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import { MessageCircleDashedIcon } from "lucide-react";
import StartedChats from "./started-chats";

import { Conversation, User } from "@prisma/client";

type ConversationWithUsers = Conversation & { users: User[] };

const ChatSideBar = async () => {

    const currentUser = await getCurrentUser();

    const startedConversations: ConversationWithUsers[]  = await db.conversation.findMany({
        where : {
            userIds : {
                has : currentUser.id
            }
        }, include : {
            users : true,
            
        }
    })

    

    return ( 
        <div className="flex justify-end overflow-y-hidden h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]">
        <div className=" bg-white w-[420px] border-2 border-black">
                <div>
                    <h3 className="flex justify-center p-4 text-lg font-semibold">
                       <MessageCircleDashedIcon className="mr-2"/> Gestartete Konversationen
                    </h3>
                </div>
                <div>
                    {startedConversations.map((conversation: ConversationWithUsers) => (
                        <StartedChats
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