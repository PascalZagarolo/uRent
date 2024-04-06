'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


import { BellDotIcon, BellPlus, MessageCircle, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { conversation, notification } from '../../../db/schema';
import { CiBookmark } from "react-icons/ci";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { LuMailWarning } from "react-icons/lu";



interface NotificationShortCutProps {
    foundNotifications: typeof notification.$inferSelect[];
}


const NotificationShortCut: React.FC<NotificationShortCutProps> = ({
    foundNotifications
}) => {

    const router = useRouter();

    foundNotifications.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="lg:bg-[#181b27] text-gray-200" variant="ghost" >
                    <BellDotIcon className="w-6 h-6" /> <p className="text-xs">{foundNotifications?.length}</p>

                </Button>
            </PopoverTrigger>
            <PopoverContent className="dark:bg-[#0F0F0F] dark:border-gray-800 border-none">
                <div>
                    <h3 className="flex">
                        <BellPlus className="h-4 w-4 " />
                        <span className="ml-2 text-sm">Meine Benachrichtigungen</span>
                    </h3>
                </div>
                <div className="mt-4">
                    {foundNotifications?.length === 0 ? (
                        <p className="text-gray-900/80 dark:text-gray-100/80 text-xs italic"> Du bist auf dem neuesten Stand...</p>
                    ) : (
                        foundNotifications?.map((notification) => (
                            <div className="dark:bg-[#161616] p-2 mt-1 w-full flex" key={notification.id}>
                                <div className="w-1/8 px-2">
                                    {
                                        {
                                            "BOOKING": <CiBookmark className="w-4 h-4" />,
                                            "MESSAGE": <MessageCircle className="w-4 h-4" />,
                                            "BOOKING_REQUEST": <LuMailWarning className="w-4 h-4" />
                                        }[notification.notificationType]
                                    }
                                </div>
                                <div className="text-xs font-semibold">
                                    {
                                        {
                                            "BOOKING": (
                                                <div className="w-full">
                                                    <a className="truncate w-[240px] text-blue-600 font-bold underline-offset-1 
                                                    hover:underline"
                                                        href={`/inserat/${notification.inseratId}`}
                                                    >
                                                        {notification?.content}
                                                    </a> <br />
                                                    Du wurdest zu einer Buchung hinzugefügt <br />
                                                    <div className="text-xs font-light font-size: 0.6rem">
                                                        {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                                                    </div>
                                                </div>),
                                            "MESSAGE": (
                                                <div className="w-full">
                                                    <a className="truncate w-[240px] text-blue-600 font-bold underline-offset-1 
                                                        hover:underline"
                                                        href={`/conversation/${notification?.conversationId}`}
                                                    >
                                                        {notification?.content}
                                                    </a> <br />
                                                    Hat dir eine Nachricht gesendet <br />
                                                    <div className="text-xs font-light font-size: 0.6rem">
                                                        {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                                                    </div>
                                                </div>
                                            ),
                                            "BOOKING_REQUEST" : (
                                                <div className="w-full">
                                                    <a className="truncate w-[240px] text-blue-600 font-bold underline-offset-1 
                                                    hover:underline"
                                                    href={`/inserat/${notification?.inseratId}`}
                                                    >
                                                        {notification?.content}
                                                    </a> <br/>
                                                    Dir wurde eine Anfrage gesendet <br/>
                                                    <div className="text-xs font-light font-size: 0.6rem">
                                                    {format(new Date(notification.createdAt), "HH:mm", {locale : de})} Uhr
                                                    </div>
                                                </div>
                                            
                                        )
                                        }[notification.notificationType]
                                    }
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default NotificationShortCut;