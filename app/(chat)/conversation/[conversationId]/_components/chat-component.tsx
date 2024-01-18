import { db } from "@/utils/db";
import ChatInput from "./_chatcomponents/chat-input";
import ChatMessageRender from "./_chatcomponents/chat-message-render";
import { Messages, User } from "@prisma/client";

interface ChatComponentProps {
    messages : Messages[] 
    currentUser : User
}

const ChatComponent: React.FC<ChatComponentProps> = async ({
    messages,
    currentUser
}) => {

    

    return ( 
        <div className="overflow-y-hidden h-screen">
            <div>
            {messages.map((message) => (
                <ChatMessageRender
                messages={message}
                isOwn={message.senderId === currentUser.id}
                
                />
            
            ))}
            </div>
            <div className="h-screen text-gray-100 flex justify-center">
               <ChatInput/>
            </div>
        </div>
     );
}
 
export default ChatComponent;