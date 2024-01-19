import { db } from "@/utils/db";
import { Conversation, User } from "@prisma/client";
import RenderedChats from "./rendered-chats";

type ConversationWithUsers = Conversation & { users: User[] };

interface StartedChatsProps{
    conversation : ConversationWithUsers,
    currentUser : User
}


const StartedChats: React.FC<StartedChatsProps> = async ({
    conversation,
    currentUser
}) => {

    const image = await db.user.findUnique({
        where :{
            id : conversation.userIds[0]
        }
    })
    

    return ( 
        <div className="flex justify-center">
            <RenderedChats
            user = {image}
            conversationId={conversation.id}
            />
        </div>
     );
}
 
export default StartedChats;