'use client';

import { userTable } from "@/db/schema";
import useActiveList from "@/hooks/useActiveList";
import ReportModal from "./report-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsThreeDots } from "react-icons/bs";
import BlockUser from "./block-user";


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
            <Popover>
                <PopoverTrigger>
                    <BsThreeDots />
                </PopoverTrigger>
                <PopoverContent className="dark:bg-[#191919] dark:border-none w-[200px] space-y-2">
                    <div>
                    <ReportModal/>
                    </div>
                    <div>
                        <BlockUser />
                    </div>
                </PopoverContent>
            </Popover>
            </div>
        </div>
     );
}
 
export default ChatHeader;