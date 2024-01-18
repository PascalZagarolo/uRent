import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import ConversationProfileBar from "./_components/conversation-profile-bar";
import ChatComponent from "./_components/chat-component";

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

   const otherUser = conversation.userIds.find((id) => id !== currentUser.id);

   const otherUserDetails = await db.user.findUnique({
    where : {
        id : otherUser,
    }
   })
    

    return (
        <div className="overflow-y-hidden h-screen bg-[#404040]/10 ">
            <div className="w-full h-[120px] overflow-hidden bg-gray-200">
                
            </div>
           <div className="h-screen flex">
            <div className="w-full">
                <ChatComponent/>
            </div>
           <ConversationProfileBar
           otherUser={otherUserDetails}
           />
           </div>
        </div>
    );
}

export default ConversationPage;