'use client'

import { cn } from "@/lib/utils";


import { format, set } from 'date-fns';

import { useRouter } from "next/navigation";

import { message } from "@/db/schema";
import Image from "next/image";

import { BsChatSquareQuoteFill } from "react-icons/bs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";




interface ChatMessageRenderProps {
    messages: typeof message.$inferSelect | any;
    isOwn: boolean;

}

const ChatMessageRender: React.FC<ChatMessageRenderProps> = ({
    messages,
    isOwn,

}) => {

    const router = useRouter();

    const [usedImage, setUsedImage] = useState(messages.sender?.image ? messages.sender?.image : "/images/default-profile.png");
    
    useEffect(() => {
        if (messages.sender?.image) {
            setUsedImage(messages.sender?.image)
        }
    }, [messages])

    console.log(messages?.content)
    console.log(messages?.sender)

    return (
        <div className={cn("w-full p-2 flex items-center dark:text-gray-300 text-sm", isOwn && " justify-end",)}>
            <div className="flex space-x-2 ">
                {!isOwn && (
                    <a className="mt-auto hover:cursor-pointer"
                        href={`/profile/${messages.senderId}`} target="_blank">
                        <Image
                            src={//@ts-ignore
                                messages.sender?.image}
                            width={60}
                            height={60}
                            className="w-[32px] h-[32px] rounded-full object-cover"
                            alt="pfp"
                        />
                    </a>
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
                                        <a className="font-bold text-gray-200 flex items-center hover:underline"
                                            href={`/inserat/${messages.inseratId}`}
                                            target="_blank"
                                        >
                                            <BsChatSquareQuoteFill className="w-4 h-4 mr-2" /> Anfrage zu deinem Inserat
                                        </a>
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
                                <Dialog>
                                    <DialogTrigger>
                                        <div className="max-w-max">
                                            <div>
                                                <Image
                                                    src={messages?.image}
                                                    width={200}
                                                    height={200}
                                                    className="object-cover"
                                                    alt="image"
                                                />
                                            </div>
                                            {messages?.content && (
                                                <div className=" justify-start mt-1 break-all text-left text-gray-200/80" style={{ maxWidth: '200px' }}>
                                                    {messages?.content}
                                                </div>
                                            )}
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="p-0">
                                        <Image
                                            src={messages?.image}
                                            width={500}
                                            height={500}
                                            className="object-cover"
                                            alt="image"
                                        />
                                    </DialogContent>
                                </Dialog>
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