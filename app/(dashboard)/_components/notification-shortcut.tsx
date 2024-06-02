'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


import { BellDotIcon, BellPlus, MessageCircle, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { conversation, notification,  notificationTypeEnum } from '../../../db/schema';
import { CiBookmark } from "react-icons/ci";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import { LuMailWarning } from "react-icons/lu";
import { MdOutlineNewReleases, MdOutlineReportProblem } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";



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

    const unseenNotifications = foundNotifications.filter((notification) => !notification.seen);

    const onBlur = async () => {
        if (unseenNotifications.length > 0) {
            const patchedNotifications = await axios.patch("/api/notifications")
                .then(() => {
                    router.refresh();
                })
        } else {
            return;
        }
    }

    const [renderedNotifications, setRenderedNotifications] = useState<typeof notification.$inferSelect[]>(foundNotifications);
    const [usedFilter, setUsedFilter] = useState<"ALL" | "MESSAGES" | "BOOKING" | "BOOKING_REQUEST" | "ANDERE">("ALL");

    const onAll = () => {
        setRenderedNotifications(foundNotifications);
    }

    useEffect(() => {
        switch (usedFilter) {
            case "ALL":
                setRenderedNotifications(foundNotifications);
                break;
            case "MESSAGES":
                setRenderedNotifications(foundNotifications.filter((notification) => notification.notificationType === "MESSAGE"));
                break;
            case "BOOKING":
                setRenderedNotifications(foundNotifications.filter((notification) => notification.notificationType === "BOOKING"));
                break;
            case "BOOKING_REQUEST":
                setRenderedNotifications(foundNotifications.filter((notification) => notification.notificationType === "BOOKING_REQUEST"));
                break;
            
            default:
                setRenderedNotifications(foundNotifications);
        }
    }, [usedFilter])

    let usedNotificationType : typeof notificationTypeEnum;

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
            <PopoverContent className="dark:bg-[#0F0F0F] w-[400px] dark:border-gray-800 border-none" onBlur={onBlur}>
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
                            <div className="flex justify-between">
                                <button className={cn("text-xs dark:bg-[#161616] px-4 py-1 rounded-md", 
                                usedFilter === "ALL" ? "border border-blue-900" : "border border-[#161616]")}
                                onClick={() => { setUsedFilter("ALL") }}>
                                    Alle
                                </button>
                                <button className={cn("text-xs dark:bg-[#161616] px-4 py-1 rounded-md", 
                                usedFilter === "MESSAGES" ? "border border-blue-900" : "border border-[#161616]")} 
                                onClick={() => { setUsedFilter("MESSAGES") }}>
                                    Nachrichten
                                </button>
                                <button className={cn("text-xs dark:bg-[#161616] px-4 py-1 rounded-md", 
                                usedFilter === "BOOKING_REQUEST" ? "border border-blue-900" : "border border-[#161616]")} 
                                onClick={() => { setUsedFilter("BOOKING_REQUEST") }}>
                                    Anfragen
                                </button>
                                <button className={cn("text-xs dark:bg-[#161616] px-4 py-1 rounded-md", 
                                usedFilter === "BOOKING" ? "border border-blue-900" : "border border-[#161616]")} 
                                onClick={() => { setUsedFilter("BOOKING") }}>
                                    Buchungen
                                </button>
                                
                            </div>



                            {renderedNotifications.length > 0 ? (
                                renderedNotifications?.map((notification : any) => (
                                    usedNotificationType = notification.notificationType,
                                    <div className="dark:bg-[#161616] p-2 mt-1 w-full flex" key={notification.id}>
                                        <div className="w-1/8 px-2">
                                            {
                                                {   
                                                    "BOOKING": <CiBookmark className="w-4 h-4" />,
                                                    
                                                    "MESSAGE": <MessageCircle className="w-4 h-4" />,
                                                    
                                                    "BOOKING_REQUEST": <LuMailWarning className="w-4 h-4" />,

                                                    "REPORT_ACTION" : <MdOutlineReportProblem className="w-4 h-4 text-rose-600" />, 
                                                    //@ts-ignore
                                                }[usedNotificationType] 
                                            }
                                        </div>
                                        <div className="text-xs font-semibold">
                                            {
                                                { 
                                                    "BOOKING": (
                                                        <div className="w-full">
                                                            <a className="truncate w-[240px] text-blue-600 font-bold underline-offset-1 hover:underline"
                                                                href={`/inserat/${notification.inseratId}`}
                                                            >
                                                                {notification?.content}
                                                            </a> <br />
                                                            Du wurdest zu einer Buchung hinzugefügt <br />
                                                            <div className="text-xs font-light font-size: 0.6rem">
                                                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                                                                {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                                                            </div>
                                                        </div>),
                                                    "MESSAGE": (
                                                        <div className="w-full">
                                                            <a className="truncate w-[240px] text-blue-600 font-bold underline-offset-1 hover:underline"
                                                                href={`/conversation/${notification?.conversationId}`}
                                                            >
                                                                {notification?.content}
                                                            </a> <br />
                                                            Hat dir eine Nachricht gesendet <br />
                                                            <div className="text-xs font-light font-size: 0.6rem flex w-full">
                                                                {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                                                                {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                                                                {!notification.seen && (
                                                                    <div className="bg-rose-600 text-xs font-bold ml-auto px-2 flex rounded-md text-gray-200">
                                                                        Neu
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ),
                                                    "BOOKING_REQUEST": (
                                                        <div className="w-full">
                                                            <a className="truncate w-[240px] text-blue-600 font-bold underline-offset-1 hover:underline"
                                                                href={`/inserat/${notification?.inseratId}`}
                                                            >
                                                                {notification?.content}
                                                            </a> <br />
                                                            Dir wurde eine Anfrage gesendet <br />
                                                            <div className="text-xs font-light font-size: 0.6rem flex">
                                                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                                                                {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                                                                {!notification.seen && (
                                                                    <div className="bg-rose-600 text-xs font-bold ml-auto px-2 flex rounded-md text-gray-200">
                                                                        Neu
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                    ),
                                                    "REPORT_ACTION": (
                                                        <div className="w-full">
                                                            <a className=" w-[240px] text-blue-600 break-words font-bold underline-offset-1 hover:underline"
                                                                href={`/inserat/${notification?.inseratId}`}
                                                            >
                                                                {notification?.content}
                                                            </a> <br />
                                                            Aufgrund eines Verstoßes gegen unsere Richtlinien wurde einer deiner Inhalte verändert. <br />
                                                            Für weitere Informationen über unsere Richtlinien, besuche unsere <a href="/agb" className="text-blue-600 font-bold underline-offset-1 hover:underline">AGB</a> <br />
                                                            <div className="text-xs font-light font-size: 0.6rem flex">
                                                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                                                                {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                                                                {!notification.seen && (
                                                                    <div className="bg-rose-600 text-xs font-bold ml-auto px-2 flex rounded-md text-gray-200">
                                                                        Neu
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                    )
                                                    //@ts-ignore
                                                }[usedNotificationType]
                                            }
                                        </div>
                                    </div>
                                    
                                ))
                            ) : (
                                <div className="p-4 dark:bg-[#161616] mt-2 rounded-md">
                                    <p className="text-gray-900/80 dark:text-gray-100/80 text-xs "> Keine Benachrichtigungen gefunden...</p>
                                </div>
                            )}

                    </div>

                      
                    )}
                </div>
               
            </PopoverContent>
        </Popover>
    );
}

export default NotificationShortCut;