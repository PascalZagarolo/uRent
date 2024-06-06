

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

    const user1orUser2 = otherUserId === conversations.user1Id ? true : false;

    console.log(conversations?.user_user2)

    const userImage = conversations?.user1Id === currentUser.id ? conversations.user2 : conversations.user1;

    //@ts-ignore
    const lastMessage = conversations.messages.sort((a,b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    let content = lastMessage[0]?.content ? lastMessage[0].content : "Hat ein Bild gesendet"

    //@ts-ignore
    const openChats = conversations.messages.filter((message) => {
        
        return !message.seen && message.senderId !== currentUser.id
    })
    
    const isOwnMessage = lastMessage[0]?.senderId === currentUser.id ? true : false;

    return ( 
        <div className="flex justify-center ">
            <RenderedChats
            user = {userImage as any}
            conversationId={conversations.id}
            openMessages = {openChats.length}
            lastMessage = {content}
            lastMessageDate={lastMessage[0]?.createdAt}
            isOwnMessage = {isOwnMessage}
            />
        </div>
     );
}
 
export default StartedChats;