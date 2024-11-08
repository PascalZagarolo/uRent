'use client'

import { userTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import { format, isToday } from "date-fns";

import { UserCircle2Icon, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";


interface RenderedChatsProps {
    user: typeof userTable.$inferSelect,
    inseratTitle?: string;
    conversationId: string,
    lastMessage: string;
    lastMessageDate?: Date;
    openMessages?: number;
    isOwnMessage?: boolean;
}

const RenderedChats: React.FC<RenderedChatsProps> = ({
    user,
    conversationId,
    lastMessage,
    openMessages,
    lastMessageDate,
    isOwnMessage,
    inseratTitle
}) => {



    let renderedDate = "";



    if (lastMessageDate) {
        renderedDate = isToday(lastMessageDate) ? format(lastMessageDate, "HH:mm") : format(lastMessageDate, "dd.MM")
    }



    const onClick = (usedId: string) => {
        if (conversationId === params) {

        } else {
            const params = new URLSearchParams(searchParams.toString())
            params.set('conversationId', usedId)
            window.history.pushState(null, '', `?${params.toString()}`)
        }
    }

    const params = useSearchParams().get("conversationId");
    const searchParams = useSearchParams();
    const isOnSite = params === conversationId ? true : false;

    return (
        <div
        className={cn(
            `flex items-center w-full py-3 px-3 mr-auto border-t border-b cursor-pointer
            text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-800/20 dark:border-[#1C1C1C]`,
            !isOnSite ? "dark:bg-[#0F0F0F] bg-[#404040]/10" : "bg-white dark:bg-[#1C1C1C]"
        )}
        onClick={() => onClick(conversationId)}
    >
        <div className="flex items-center gap-2 w-full ">
            {/* Profile Picture */}
            <Image
                alt="Profile Picture"
                src={user.image || "/placeholder-person.jpg"}
                width={40}
                height={40}
                className="rounded-full h-[40px] w-[40px] object-cover"
            />
    
            {/* Content */}
            <div className="flex flex-col mr-4">
                {/* Title */}
                {inseratTitle && (
                    <div className="text-base font-semibold  line-clamp-2 ">
                        {inseratTitle}
                    </div>
                )}
    
                {/* Name and Last Message */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col w-3/4 ">
                        <div
                            className={cn(
                                "text-sm line-clamp-1 font-normal ",
                                inseratTitle ? "text-gray-200/60" : ""
                            )}
                        >
                            {user.name}
                        </div>
                        <div
                            className={cn(
                                "text-xs font-medium line-clamp-1 mt-1",
                                openMessages === 0 && "dark:text-gray-200/60"
                            )}
                        >
                            {isOwnMessage ? "Ich: " : ""}{lastMessage}
                        </div>
                    </div>
    
                    {/* Unread Message Badge */}
                    {openMessages > 0 && (
                        <div className="flex items-center bg-rose-600 text-xs font-medium text-white rounded-md px-1 py-0.5">
                            {openMessages > 9 ? "9+" : openMessages}
                        </div>
                    )}
                </div>
    
                {/* Date */}
                {lastMessageDate && (
                    <div className="text-xs dark:text-gray-200/80 font-normal text-right">
                        {renderedDate}
                    </div>
                )}
            </div>
        </div>
    </div>
    
    );
}
export default RenderedChats;