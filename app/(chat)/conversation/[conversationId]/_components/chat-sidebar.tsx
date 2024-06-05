

import { conversation } from "@/db/schema";
import StartedChats from "./started-chats";

interface ChatSideBarProps {
    startedConversations: typeof conversation.$inferSelect[],
    currentUser : any
}

const ChatSideBar: React.FC<ChatSideBarProps> = ({
    startedConversations,
    currentUser
}) => {
    return (
        <div>
            {startedConversations.map((conversation) => (
                <StartedChats
                    key={conversation.id}
                    conversations={conversation}
                    currentUser={currentUser}
                />
            ))}
        </div>
    );
}

export default ChatSideBar;