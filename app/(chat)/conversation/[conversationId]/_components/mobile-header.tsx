'use client';

import { ArrowLeft, } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileProfileSidebar from "./mobile-profile-sidebar";
import useActiveList from "@/hooks/useActiveList";
import { cn } from "@/lib/utils";
import { message, userTable } from "@/db/schema";

interface MobileHeaderChatProps {
    otherUser : typeof userTable.$inferSelect;
    attachments : typeof message.$inferSelect[]
}

const MobileHeaderChat: React.FC<MobileHeaderChatProps> = ({
    otherUser,
    attachments
}) => {

    const { members } = useActiveList();

    const isActive = members.indexOf(otherUser.email!) !== -1;

    const router = useRouter();

    return (
        <div className="w-full h-[100px] overflow-y-hidden bg-[#1d2235] border-2 border-[#23283d] flex items-center sm:hidden">
            <div className="border-2 border-gray-300 p-2 rounded-md ml-2 bg-white" onClick={() => {router.push("/")}}>
                <ArrowLeft/>
            </div>
            <h3 className="flex justify-center w-full text-[#eaebf0] text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] items-center">
                 <div className=" justify-center ml-auto items-center">
                 <p className=" text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] truncate">
                 {otherUser.name} 
                </p>
                    <div className={cn("text-sm", isActive ? "text-emerald-600" : "text-gray-600/50")}>
                        {isActive ? (
                            "Online"
                        ) : (
                            "offline"
                        )}
                    </div>
                 </div>
                <div>
                <Image 
                className="ml-4 rounded-full border-2 border-[#323956]"
                src={otherUser.image || "/placeholder-person.jpg"}
                width={50}
                height={50}
                alt="profile picture"
                />
                </div>
                <MobileProfileSidebar
                user = {otherUser}
                attachments = {attachments}
                />
                
            </h3>
            
        </div>
    );
}

export default MobileHeaderChat;