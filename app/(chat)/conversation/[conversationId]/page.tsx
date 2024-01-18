import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/utils/db";
import ConversationProfileBar from "./_components/conversation-profile-bar";

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
        <div className="overflow-y-hidden h-screen">
            <div className="w-full h-[120px] overflow-hidden bg-gray-200">
                s
            </div>
           <ConversationProfileBar
           otherUser={otherUserDetails}
           />
        </div>
    );
}

export default ConversationPage;