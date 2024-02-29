'use client'

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { UserCircle2Icon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface RenderedChatsProps {
    user : User,
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
        <div className={cn(`flex items-center mr-auto w-full mt-2 rounded-md border-2  py-2 bg-[#1C1C1C]
         text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] hover:cursor-pointer`, !isOnSite ? "border-[#171717]" : "border-2 border-[#1C1C1C]")}
         onClick={onClick}
         >
            <div className="flex justify-center ml-4 w-2/5">
                <p className="mr-2">
                    <UserCircle2Icon/>
                </p>
                <p className="5 truncate mr-auto">
                    {user.name}
                </p>
            </div>
            <div>
                <p className="text-gray-200 text-sm overflow-x-hidden ml-2 font-medium w-[120px] h-[20px] mr-auto truncate ">
                {lastMessage}
                </p>
            </div>
            <div className="flex justify-center ml-auto mr-4">
                <Image
                height={45}    
                width={45}
                alt = "pfp"
                className="rounded-full  w-[45px] h-[45px]"
                src={user.image || "/placeholder-person.jpg"}
                 />
            </div>
        </div>
     );
}
 
export default RenderedChats;