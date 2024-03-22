'use client'

import { Button } from "@/components/ui/button";
import { ImageIcon, MailCheck, PhoneCall, PlusCircle, PlusSquare, User2, UserCheck, UserCircle } from "lucide-react";

import Image from "next/image";
import AttachmentRender from "./attachment-render";
import ChatSettings from "./chat-settings";
import useActiveList from "@/hooks/useActiveList";
import { message, users } from "@/db/schema";

interface ConversationProfileBarProps {
    otherUser: typeof users.$inferSelect;
    attachments: typeof message.$inferSelect[]
}

const ConversationProfileBar: React.FC<ConversationProfileBarProps> = ({
    otherUser,
    attachments
}) => {


    const { members } = useActiveList();
    const isActive = members.indexOf(otherUser.email!) !== -1; 

    const formatDate = (inputDate: Date): string => {
        const day = ('0' + inputDate.getDate()).slice(-2);
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const year = inputDate.getFullYear();

        return `${day}.${month}.${year}`;
    };


    return (
        <div className="sm:flex  overflow-y-hidden h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] hidden dark:bg-[#0F0F0F] w-[320px]">
            <div className="bg-[#090909]/05   w-full">
                <div className="text-gray-100">
                    <h3 className="flex justify-center mt-2 p-2   ml-2 mr-2 rounded-md font-semibold text-xl bg-[#181c2c] dark:bg-[#1C1C1C]">
                        <User2 className="mr-2" />  {otherUser.name}
                    </h3>
                </div>
                <div className="flex justify-center">
                    {isActive ? ( 
                        <div>
                            <p className="font-semibold text-emerald-600"> Online </p>
                        </div>
                    ) : ( 
                        <div>
                            <p className="font-semibold text-gray-600/50"> Offline </p>
                        </div>
                    )}
                </div>
                <div className=" flex justify-center mt-8">
                    <Image
                        src={otherUser.image || "/placeholder-person.jpg"}
                        width={120}
                        height={120}
                        alt="profile picture"
                        className="rounded-full  h-[120px] w-[120px]"
                    />
                </div>
                <div className="mt-2">
                    <div className="flex justify-center text-gray-900/80 font-medium text-sm dark:text-gray-100">
                        auf <p className="text-[#4e5889] font-bold ml-1">u</p><p className="text-gray-900 font-bold mr-1 dark:text-gray-100">Rent</p> seit {formatDate(otherUser.createdAt)}
                    </div>
                </div>
                <div className="flex justify-center mt-2 gap-x-12">
                    <div className="">
                        <Button variant="ghost" className="bg-white  dark:bg-[#0b0b0b]">
                            <UserCircle />
                        </Button>
                    </div>
                    <div className="">
                        <Button variant="ghost" className="bg-white  dark:bg-[#0b0b0b]">
                            <PhoneCall />
                        </Button>
                    </div>
                    <div className="">
                        <Button variant="ghost" className="bg-white  dark:bg-[#0b0b0b]">
                            <MailCheck className="" />
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="ml-4 mt-4">
                        <div className="font-semibold flex p-4 bg-white mr-4 rounded-md dark:bg-[#080808] " >
                            <ImageIcon className="mr-4" /> Anhänge und Links ({attachments.length})
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4  ">

                            {attachments.slice(0, 9).map((attachment, index) => (
                                <div key={attachment.id}>
                                    {index === 8 ? (
                                        <div className="bg-gray-100 flex justify-center items-center h-[75px] w-[75px] border-2 border-black rounded-md "
                                            key={attachment.id}
                                        >
                                            <div>
                                                <div className="flex justify-center">
                                                    <PlusSquare className="flex justify-center items-center" />

                                                </div>
                                                <p className="text-xs mt-1 text-gray-900/90 font-bold">
                                                    {attachments.length - 9} weitere..
                                                </p>
                                            </div>
                                        </div>
                                    ) : (

                                        <AttachmentRender
                                            key={attachment.id}
                                            messageWithImage={attachment}
                                        />

                                    )}
                                </div>

                            ))}
                        </div>
                    </div>
                    <div className="mt-2 ml-2 mr-2 ">
                        <ChatSettings/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ConversationProfileBar;