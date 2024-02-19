import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import ConversationProfileBar from "./_components/conversation-profile-bar";
import ChatComponent from "./_components/chat-component";
import ChatLogo from "../_components/chat-logo";
import ChatSideBar from "../_components/chat-sidebar";
import { MessageSquareIcon } from "lucide-react";
import MobileHeaderChat from "./_components/mobile-header";

const ConversationPage = async ({
    params
} : { params: { conversationId : string }}) => {

    const currentUser = await getCurrentUser();

    const conversation = await db.conversation.findUnique({
        where : {
            id : params.conversationId
        }, select : {
            userIds : true
        }
    })

    const justConversation = await db.conversation.findUnique({
        where : {
            id : params.conversationId
        }
    })

    const messages = await db.messages.findMany({
        where : {
            conversationId : params.conversationId
        }, include : {
            sender : true,
            inserat : {
                include : {
                    images : true
                }
            }
        }
    })

    const otherUser = conversation.userIds.find((id) => id !== currentUser.id);

   const otherUserDetails = await db.user.findUnique({
    where : {
        id : otherUser,
    },
    
   })

   const attachments = await db.messages.findMany({
    where : {
        conversationId : params.conversationId,
        image : {
            not : null
        }
    }, orderBy : {
        createdAt : "desc"
    }
   })
    

    return (
        <div className="h-screen w-full">
            <div className="overflow-y-hidden bg-[#404040]/10 font-medium w-full">
        <div className="h-[100px] overflow-y-hidden bg-[#1d2235] border-2 border-[#23283d] sm:flex items-center hidden">
            <ChatLogo/>
            <h3 className="flex justify-center w-full text-[#eaebf0] text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] items-center">
                <MessageSquareIcon className="mr-4"/> Konversationen
            </h3>
        </div>
        <MobileHeaderChat
            otherUser={otherUserDetails}
            attachments={attachments}
        />
    </div>
    <div className="flex  h-full  w-full">
    <div className="w-[460px] flex">
            <ChatSideBar
            />
            </div>
        
        
        
        <div className="w-full">
        <ChatComponent
                //@ts-ignore
                messages={messages}
                currentUser={currentUser}
                conversation={justConversation}
            />
        </div>
       
        
        
       
        
        
        <div className="ml-auto w-[420px]">
        <ConversationProfileBar
            otherUser={otherUserDetails}
            attachments={attachments}
        />
        </div>
        
    </div>
</div>
    );
}

export default ConversationPage;