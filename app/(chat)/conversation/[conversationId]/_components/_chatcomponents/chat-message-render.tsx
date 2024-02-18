'use client'

import { cn } from "@/lib/utils";
import { Messages, User, Inserat, Images } from "@prisma/client";

import ChatImageRender from "./chat-image-render";
import { format } from "date-fns";
import { Forward, Share, Trash, TrashIcon } from "lucide-react";
import DeleteMessage from "./delete-message";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

type MessageWithInserat = Messages & { inserat: Inserat & { images: Images } }

interface ChatMessageRenderProps {
    messages: MessageWithInserat;
    isOwn: boolean;

}

const ChatMessageRender: React.FC<ChatMessageRenderProps> = ({
    messages,
    isOwn,

}) => {

    const router = useRouter();

    const formatEuropeanTime = (inputDate: Date): string => {
        const date = format(new Date(inputDate), "HH:mm");

        return date;
    };

    const formatEuropeanTimeDay = (inputDate: Date): string => {
        const date = format(new Date(inputDate), "dd.MM.yy");

        return date;
    };


    return (
        <div>

            <div className={cn("", isOwn ? "mr-2" : "ml-2 ")}>

                <div className={cn("rounded-lg flex p-2 w-1/2", isOwn ? " mr-8 ml-auto" : " mr-auto")}>

                    <div className={cn("min-w-[50px]", isOwn ? "ml-auto" : "mr-auto")}>
                        {isOwn && (
                            <DeleteMessage
                                messageId={messages.id}
                            />
                        )}
                        <div className={cn("p-4 rounded-lg mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)] border-2 flex border-gray-500",
                            isOwn ? "bg-emerald-400 ml-auto" : "bg-[#2a304b] border-gray-500 text-gray-100 mr-auto",
                            messages.isInterest && "bg-gray-100 text-gray-900 border-emerald-600 dark:bg-[#0F0F0F] dark:border-none dark:text-gray-100")}>
                            {messages.image ? (
                                <ChatImageRender
                                    imageLink={messages.image}
                                />
                            ) : (
                                <div className="">
                                    {messages.isInterest && (
                                        <div className="mb-4 hidden lg:block ">
                                            <div className="flex items-center">
                                                <Forward />
                                                <p className="ml-2 font-semibold text-xs text-gray-900/50">Interesse bezüglich...</p>
                                            </div>
                                            <div className="p-4 border border-gray-200 bg-white dark:bg-[#0F0F0F] dark:text-gray-100 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] hover:cursor-pointer"
                                                onClick={
                                                    () => { router.push(`/inserat/${messages.inseratId}`) }
                                                }
                                            >
                                                <div>
                                                    <div className="flex">

                                                        <div className="rounded-md 2xl:w-1/2">
                                                            <img
                                                                src={messages.inserat.images[0].url}
                                                                className=" object-cover rounded-md"
                                                                alt="..."
                                                                style={{ imageRendering: "auto" }}
                                                            />
                                                        </div>

                                                        <div className="ml-4 font-semibold truncate w-[160px] mr-4">
                                                            {messages.inserat.title}
                                                            <Badge className="2xl:flex ml-auto drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] justify-center hidden">
                                                                {formatEuropeanTimeDay(messages.inserat.createdAt)}
                                                            </Badge>
                                                            <Badge className="flex ml-auto mt-2 bg-emerald-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] justify-center">
                                                                {messages.inserat.price} €
                                                            </Badge>
                                                        </div>
                                                        <div className="rounded-md bg-gray-100 border border-gray-500  ml-auto w-1/2 dark:bg-[#1d1d1d] dark:border-none
                                                        drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] p-2 max-h-[100px] overflow-hidden hidden 2xl:flex">
                                                            <p className="overflow-hidden text-overflow-ellipsis">{messages.inserat.description}</p>
                                                        </div>


                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-center">

                                        {messages.content}

                                    </div>
                                </div>
                            )}


                        </div>

                        <p className={cn(" mr-1 text-xs mt-1 text-gray-900/60 font-semibold", isOwn ? "text-right" : "text-left")}>
                            {formatEuropeanTime(messages.createdAt)} Uhr
                        </p>
                    </div>

                </div>



            </div>
        </div>


    );
}

export default ChatMessageRender;