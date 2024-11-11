'use client';

import { block, userTable } from "@/db/schema";
import useActiveList from "@/hooks/useActiveList";
import ReportModal from "./report-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsThreeDots } from "react-icons/bs";
import BlockUser from "./block-user";


interface ChatHeaderProps {
    otherUser : typeof userTable.$inferSelect;
    foundBlocks : typeof block.$inferSelect[];
    currentUser : typeof userTable.$inferSelect;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
    otherUser,
    foundBlocks,
    currentUser
}) => {

    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser.email!) !== -1; 

    return ( 
        <div>
            <div className="text-sm">
            <Popover>
                <PopoverTrigger>
                    <BsThreeDots />
                </PopoverTrigger>
                <PopoverContent className="dark:bg-[#131313] dark:border-none w-[200px] space-y-2">
                    <div>
                    <ReportModal
                    isBlocked = {foundBlocks.some(block => block.userId === currentUser.id)}
                    />
                    </div>
                    <div>
                        <BlockUser 
                        foundBlocks = {foundBlocks}
                        currentUser = {currentUser}
                        />
                    </div>
                </PopoverContent>
            </Popover>
            </div>
        </div>
     );
}
 
export default ChatHeader;