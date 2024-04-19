'use client'

import { cn } from "@/lib/utils";


import ChatImageRender from "./chat-image-render";
import { format } from "date-fns";
import { Forward, Share, Trash, TrashIcon } from "lucide-react";
import DeleteMessage from "./delete-message";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { message } from "@/db/schema";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { BsChatSquareQuoteFill } from "react-icons/bs";




interface ChatMessageRenderProps {
    messages: typeof message.$inferSelect;
    isOwn: boolean;

}

const ChatMessageRender: React.FC<ChatMessageRenderProps> = ({
    messages,
    isOwn,

}) => {

    const router = useRouter();


    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        setShowDate(false);
        setTimeout(() => {
            setShowDate(true);
        }, 500)
    }, [messages])

    console.log()

    return (
        <div className={cn("w-full p-2 flex items-center dark:text-gray-300 text-sm", isOwn && " justify-end", )}>
            <div className="flex space-x-2 ">
                {!isOwn && (
                    <div className="mt-auto">
                        <Image
                            src={//@ts-ignore
                                messages.sender?.image}
                            width={60}
                            height={60}
                            className="w-[32px] h-[32px] rounded-full object-cover"
                            alt="pfp"
                        />
                    </div>
                )}

                <div>

                    <div className={cn("max-w-lg text-sm font-medium p-2 rounded-md ", 
                    !isOwn ? "dark:bg-[#191919]" : "dark:bg-[#1F2332] dark:bg-opacity-100",
                    messages.isInterest && "border "
                    )}>
                        <div>
                            {messages.isInterest && (
                                <div className="w-full h-full">
                                    <div>
                                        <div className="font-bold text-gray-200 flex items-center">
                                        <BsChatSquareQuoteFill className="w-4 h-4 mr-2" /> Anfrage zu deinem Inserat
                                        </div>
                                        <div>
                                            {//@ts-ignore
                                            messages.inserat.title}
                                        </div>
                                        <div className="w-full py-2 ">
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            )}
                        </div>
                        {messages?.image ? (
                            <div className=" py-0.5">
                        <Image
                        src={messages?.image}
                        width={200}
                        height={200}
                        className=""
                        alt="image"
                        />
                        </div>
                        ) : (
                            <div className="font-medium text-gray-200 px-1 py-0.5">
                        {messages?.content}
                        </div>
                        )}
                        <div className={cn("text-xs font-normal mt-0.5  text-gray-200/80", isOwn ? "flex justify-end" : "")}>
                            {format(new Date(messages.createdAt), "HH:mm")} Uhr
                        </div>
                    </div>

                </div>

            </div>



        </div>


    );
}

export default ChatMessageRender;