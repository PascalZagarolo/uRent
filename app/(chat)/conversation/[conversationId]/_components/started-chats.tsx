

import { conversation, message, userTable } from "@/db/schema";
import RenderedChats from "./rendered-chats";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";



interface StartedChatsProps{
    conversations : typeof conversation.$inferSelect,
    currentUser : typeof userTable.$inferSelect
}


const StartedChats: React.FC<StartedChatsProps> = async ({
    conversations,
    currentUser
}) => {

    const otherUserId = conversations.user1Id === currentUser.id ? conversations.user2Id : conversations.user1Id;


    const userImage = await db.query.userTable.findFirst({
        where : eq(userTable.id, otherUserId)
    })

    const lastMessage = await db.query.message.findMany({
        where : eq(message.conversationId, conversations.id),
        orderBy : (message, {asc}) => [asc(message.createdAt)]
    
    })

    let content = lastMessage[0]?.content ? lastMessage[0].content : "Hat ein Bild gesendet"

    

    return ( 
        <div className="flex justify-center ">
            <RenderedChats
            user = {userImage}
            conversationId={conversations.id}
            lastMessage = {content}
            />
        </div>
     );
}
 
export default StartedChats;