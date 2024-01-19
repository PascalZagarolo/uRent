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
        <div className="overflow-y-auto h-screen no-scrollbar" >
            <div className="h-full ">
            <h3 className="flex justify-center text-gray-900/30 p-4 font-semibold">
                Chat gestartet am {messages[0].createdAt.toLocaleDateString()}
            </h3>
            {messages.map((message) => (
                <ChatMessageRender
                key={message.id}
                messages={message}
                isOwn={message.senderId === currentUser.id}
                
                />
            
            ))}
           
            </div>
            <div className="h-screen text-gray-100 flex justify-center w-full bottom-0   ">
               <ChatInput/>
            </div>
        </div>
     );
}
 
export default ChatComponent;