import { Conversation, User } from "@prisma/client";

type ConversationWithUsers = Conversation & { users: User[] };

interface StartedChatsProps{
    conversation : ConversationWithUsers,
    currentUser : User
}


const StartedChats: React.FC<StartedChatsProps> = ({
    conversation,
    currentUser
}) => {

    
    

    return ( 
        <div>
            <div>
                
            </div>
        </div>
     );
}
 
export default StartedChats;