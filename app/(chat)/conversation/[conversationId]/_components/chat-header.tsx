'use client';

import { userTable } from "@/db/schema";
import useActiveList from "@/hooks/useActiveList";


interface ChatHeaderProps {
    otherUser : typeof userTable.$inferSelect;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
    otherUser
}) => {

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser.email!) !== -1; 

    return ( 
        <div>
            <div className="text-sm">
            {isActive ? ( 
                        <div>
                            <p className="font-semibold text-emerald-600"> Online </p>
                        </div>
                    ) : ( 
                        <div>
                            <p className="font-semibold text-gray-600/50"> Offline </p>
                        </div>
                    )}
            </div>
        </div>
     );
}
 
export default ChatHeader;