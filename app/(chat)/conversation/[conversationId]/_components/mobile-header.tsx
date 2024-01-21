'use client';

import { AlignCenterIcon, AlignJustify, ArrowLeft, MessageSquareIcon, User2Icon } from "lucide-react";
import ChatLogo from "./chat-logo";
import { User, Messages } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileProfileSidebar from "./mobile-profile-sidebar";

interface MobileHeaderChatProps {
    otherUser : User;
    attachments : Messages[]
}

const MobileHeaderChat: React.FC<MobileHeaderChatProps> = ({
    otherUser,
    attachments
}) => {

    const router = useRouter();

    return (
        <div className="w-full h-[100px] overflow-y-hidden bg-[#1d2235] border-2 border-[#23283d] flex items-center sm:hidden">
            <div className="border-2 border-gray-300 p-2 rounded-md ml-2 bg-white" onClick={() => {router.push("/")}}>
                <ArrowLeft/>
            </div>
            <h3 className="flex justify-center w-full text-[#eaebf0] text-3xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] items-center">
                 <p className="flex justify-center ml-auto">
                 {otherUser.name} 
                </p>
                <Image 
                className="ml-4 rounded-full border-2 border-[#323956]"
                src={otherUser.image || "/placeholder-person.jpg"}
                width={50}
                height={50}
                alt="profile picture"
                />
                <MobileProfileSidebar
                user = {otherUser}
                attachments = {attachments}
                />
            </h3>
        </div>
    );
}

export default MobileHeaderChat;