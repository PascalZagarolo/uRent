import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import ConversationProfileBar from "./_components/conversation-profile-bar";
import ChatComponent from "./_components/chat-component";
import ChatLogo from "./_components/chat-logo";
import ChatSideBar from "./_components/chat-sidebar";
import { MessageSquareIcon } from "lucide-react";

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

    const messages = await db.messages.findMany({
        where : {
            conversationId : params.conversationId
        }, include : {
            sender : true,
            
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
        <div className="overflow-y-hidden  h-screen bg-[#404040]/10 font-medium">
            <div className="w-full h-[100px] overflow-y-hidden bg-[#1d2235] border-2 border-[#23283d] flex items-center">
                <ChatLogo/>
                <h3 className="flex justify-center w-full text-[#eaebf0] text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] items-center">
                   <MessageSquareIcon className="mr-2"/> Konversationen
                </h3>
            </div>
           <div className="h-screen flex overflow-y-hidden">
            <ChatSideBar
            
            />
            <div className="w-full">
                
            <ChatComponent
                messages={messages}
                currentUser={currentUser}
                />
            </div>
           
           <ConversationProfileBar
           otherUser={otherUserDetails}
           attachments = { attachments }
           />
           </div>
        </div>
    );
}

export default ConversationPage;