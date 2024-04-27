

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

    //@ts-ignore
    const lastMessage = conversations.messages.sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    let content = lastMessage[0]?.content ? lastMessage[0].content : "Hat ein Bild gesendet"

    //@ts-ignore
    const openChats = conversations.messages.filter((message) => {
        return !message.seen && message.userId !== currentUser.id
    })
    
    console.log(openChats.length)

    return ( 
        <div className="flex justify-center ">
            <RenderedChats
            user = {userImage}
            conversationId={conversations.id}
            openMessages = {openChats.length}
            lastMessage = {content}
            />
        </div>
     );
}
 
export default StartedChats;