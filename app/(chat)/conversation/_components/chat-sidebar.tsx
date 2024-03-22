import getCurrentUser from "@/actions/getCurrentUser";

import { MessageCircleDashedIcon } from "lucide-react";
import StartedChats from "../[conversationId]/_components/started-chats";





const ChatSideBar = async () => {

    const currentUser = await getCurrentUser();

    let startedConversations;

    /* 
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
    }*/

    

    return ( 
        <div className="sm:flex  overflow-y-hidden h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] hidden w-[380px]">
        <div className=" bg-white   dark:bg-[#0F0F0F] w-full">
                <div>
                    <h3 className="flex justify-center p-4 text-lg font-semibold">
                       <MessageCircleDashedIcon className="mr-2"/> Gestartete Konversatione
                    </h3>
                </div>
                <div>
                {startedConversations.length > 0 ? (
                    <div>
                        {/*
                            {startedConversations.map((conversation: ConversationWithUsers) => (
                            <StartedChats
                            key={conversation.id}
                            conversation={conversation}
                            currentUser = {currentUser}
                            />
                        ))}                        
                        */}
                    
                    </div>
                ) : (
                    <div>
                        <p>
                            Noch keine Konversation gestartet
                        </p>
                    </div>
                )}
                </div>
            </div>
        </div>
     );
}
 
export default ChatSideBar;