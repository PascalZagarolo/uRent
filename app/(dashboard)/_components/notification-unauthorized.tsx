'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


import { BellDotIcon, BellPlus, MessageCircle, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { conversation, notification, notificationTypeEnum, notificationUnauthorized } from '../../../db/schema';
import { CiBookmark } from "react-icons/ci";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import { LuMailWarning } from "react-icons/lu";
import { MdOutlineNewReleases, MdOutlineReportProblem } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { IoGiftSharp } from "react-icons/io5";
import { TbClockExclamation } from "react-icons/tb";
import { PiHandWaving } from "react-icons/pi";



interface NotificationUnauthorizedShortCutProps {
    foundNotifications: typeof notificationUnauthorized.$inferSelect[];
}


const NotificationUnauthorizedShortCut: React.FC<NotificationUnauthorizedShortCutProps> = ({
    foundNotifications
}) => {

    const router = useRouter();

    const sortedNoti = foundNotifications.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })


    let unseenNotifications = [];


    const [renderedNotifications, setRenderedNotifications] = useState<any[]>(sortedNoti);






    let usedNotificationType: typeof notificationTypeEnum;

    return (
        <Popover >
            <PopoverTrigger asChild>

                <Button className=" text-gray-200" variant="ghost" size="sm">
                    <BellDotIcon className="w-6 h-6" />
                    {unseenNotifications.length > 0 ? (
                        <span className="bg-rose-600 text-xs font-bold px-1 flex rounded-md text-gray-200">
                            {unseenNotifications.length}
                        </span>
                    ) :
                        <span className=" text-xs font-bold px-1 flex rounded-md text-gray-200">
                            0
                        </span>
                    }
                </Button>




            </PopoverTrigger>
            <PopoverContent className="dark:bg-[#0F0F0F] w-[400px] dark:border-gray-800 border-none" >
                <div>
                    <h3 className="flex">
                        <BellPlus className="h-4 w-4 " />
                        <span className="ml-2 text-sm">Meine Benachrichtigungen</span>
                    </h3>
                </div>
                <div className="mt-4 max-h-[240px] overflow-scroll no-scrollbar">
                    {foundNotifications?.length === 0 ? (
                        <p className="text-gray-900/80 dark:text-gray-100/80 text-xs italic"> Du bist auf dem neuesten Stand...</p>
                    ) : (

                        <div>
                            {foundNotifications.map((notification, index) => (
                                <div>
                                    {notification.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </PopoverContent>
        </Popover>
    );
}

export default NotificationUnauthorizedShortCut;