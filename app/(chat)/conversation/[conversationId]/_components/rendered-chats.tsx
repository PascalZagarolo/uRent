'use client'

import { userTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import { UserCircle2Icon, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface RenderedChatsProps {
    user : typeof userTable.$inferSelect,
    conversationId : string,
    lastMessage : string
}

const RenderedChats: React.FC<RenderedChatsProps> = ({
    user,
    conversationId,
    lastMessage
}) => {

    const onClick = () => {
        if(conversationId === params.conversationId) {
            router.push(`/conversation`)
        } else {
            router.push(`/conversation/${conversationId}`);
        }
    }

    const params = useParams();

    const isOnSite = params.conversationId === conversationId ? true : false;
    const router = useRouter();
    return ( 
        <div className={cn(`flex items-center mr-auto w-full  p-4  
         text-gray-800 dark:text-gray-100/90 font-semibold hover:cursor-pointer border-t border-b dark:border-[#1C1C1C]`, 
         !isOnSite ? "dark:bg-[#0F0F0F] bg-[#404040]/10" : "bg-white dark:bg-[#1c1c1c]")}
         onClick={onClick}
         >

            <div>
                <Image 
                alt="Profile Picture"
                src={user.image || "/placeholder-person.jpg"}
                width={40}
                height={40}
                className="rounded-full h-[32px] w-[32px] object-cover mr-2"
                />
            </div>
            <div className="w-1/2 truncate">
                {user.name} 
            </div>
            {isOnSite && (
                <div className="ml-auto">
                <X  className="w-4 h-4 text-blue-800"/>
                </div>
            )}
            
        </div>
     );
}
 
export default RenderedChats;