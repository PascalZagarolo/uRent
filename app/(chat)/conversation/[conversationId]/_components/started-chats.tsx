import { db } from "@/utils/db";
import { Conversation, User, Messages } from "@prisma/client";
import RenderedChats from "./rendered-chats";

type ConversationWithUsers = Conversation & { users: User[], messages : Messages[] };

interface StartedChatsProps{
    conversation : ConversationWithUsers,
    currentUser : User
}


const StartedChats: React.FC<StartedChatsProps> = async ({
    conversation,
    currentUser
}) => {

    const otherUserId = conversation.userIds.find(id => id !== currentUser.id);


    const image = await db.user.findUnique({
        where : {
            id : otherUserId
        }
    })

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    let content = lastMessage?.content ? lastMessage.content : "Hat ein Bild gesendet"

    

    return ( 
        <div className="flex justify-center ">
            <RenderedChats
            user = {image}
            conversationId={conversation.id}
            lastMessage = {content}
            />
        </div>
     );
}
 
export default StartedChats;