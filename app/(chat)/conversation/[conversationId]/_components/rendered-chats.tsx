'use client'

import { userTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import { UserCircle2Icon, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface RenderedChatsProps {
    user: typeof userTable.$inferSelect,
    conversationId: string,
    lastMessage: string;
    openMessages?: number;
}

const RenderedChats: React.FC<RenderedChatsProps> = ({
    user,
    conversationId,
    lastMessage,
    openMessages
}) => {

    const onClick = () => {
        if (conversationId === params.conversationId) {
            router.push(`/conversation`)
        } else {
            router.push(`/conversation/${conversationId}`);
        }
    }

    const params = useParams();

    const isOnSite = params.conversationId === conversationId ? true : false;
    const router = useRouter();
    return (
        <div className={cn(`flex items-center mr-auto w-full  pl-4 py-2  
         text-gray-800 dark:text-gray-200 font-semibold hover:cursor-pointer border-t border-b dark:border-[#1C1C1C]`,
            !isOnSite ? "dark:bg-[#0F0F0F] bg-[#404040]/10" : "bg-white dark:bg-[#1c1c1c]")}
            onClick={onClick}
        >


            <div className="flex items-center py-2">
                <div>
                    <Image
                        alt="Profile Picture"
                        src={user.image || "/placeholder-person.jpg"}
                        width={40}
                        height={40}
                        className="rounded-full h-[40px] w-[40px] object-cover mr-2"
                    />
                </div>
                <div className="w-2/4">
                    <div className=" truncate">
                        {user.name}
                    </div>
                    
                    <div className="flex w-full items-center gap-x-2">
                    <div className={cn("text-xs font-medium w-6/8 truncate", openMessages === 0 && "dark:text-gray-200/60")}>
                        {lastMessage}
                    </div>
                    {openMessages > 0 && (
                        <div className="py-0.5 px-1 bg-rose-600 w-1/8 text-xs rounded-md ml-auto">
                            {openMessages > 9 ? "9+" : openMessages}
                        </div>
                    )}
                    </div>
                </div>
            </div>



        </div>
    );
}

export default RenderedChats;