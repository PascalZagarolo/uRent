'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


import { BellDotIcon, BellPlus, MessageCircle, MessageCircleMoreIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { conversation, notification, notificationTypeEnum } from '../../../db/schema';
import { CiBookmark } from "react-icons/ci";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import { LuMailWarning } from "react-icons/lu";
import { MdOutlineNewReleases, MdOutlineReportProblem } from "react-icons/md";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { IoGiftSharp } from "react-icons/io5";
import { TbClockExclamation } from "react-icons/tb";
import { PiHandWaving } from "react-icons/pi";
import { pusherClient } from "@/lib/pusher";
import { set } from "lodash";

// Define a type for the filter values
type NotificationFilter = "ALL" | "MESSAGES" | "BOOKING" | "BOOKING_REQUEST" | "ANDERE";

interface NotificationShortCutProps {
    foundNotifications: typeof notification.$inferSelect[];
}

const NotificationShortCut: React.FC<NotificationShortCutProps> = ({
    foundNotifications,
}) => {

    const router = useRouter();

    // Sort notifications by date
    foundNotifications.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const [unseenNotifications, setUnseenNotifications] = useState(() =>
        foundNotifications.filter((notification) => !notification.seen)
    );

    const [renderedNotifications, setRenderedNotifications] = useState<
        typeof notification.$inferSelect[]
    >(foundNotifications);

    const [usedFilter, setUsedFilter] = useState<NotificationFilter>("ALL");

    const [displayLimit, setDisplayLimit] = useState<number>(5);

    useEffect(() => {
        setRenderedNotifications(foundNotifications);
        setUnseenNotifications(foundNotifications.filter((notification) => !notification.seen));
    },[foundNotifications])

    const onOpen = async () => {
        if (foundNotifications?.length > 0) {
            try {
                const patchedNotifications = await axios.patch("/api/notifications")
                .then((res) => {
                    
                    setUnseenNotifications([]);
                    router.refresh();
                });
            } catch (e: any) {
                console.log(e);
            }
        } else {
            return;
        }
    };

    useEffect(() => {
        switch (usedFilter) {
            case "ALL":
                setRenderedNotifications(foundNotifications.slice(0, displayLimit));
                break;
            case "MESSAGES":
                setRenderedNotifications(foundNotifications.filter((notification) => notification.notificationType === "MESSAGE").slice(0, displayLimit));
                break;
            case "BOOKING":
                setRenderedNotifications(foundNotifications.filter((notification) => notification.notificationType === "BOOKING").slice(0, displayLimit));
                break;
            case "BOOKING_REQUEST":
                setRenderedNotifications(foundNotifications.filter((notification) => notification.notificationType === "BOOKING_REQUEST").slice(0, displayLimit));
                break;

            default:
                setRenderedNotifications(foundNotifications.slice(0, displayLimit));
        }
    }, [usedFilter, displayLimit, foundNotifications])

    const loadMoreNotifications = () => {
        setDisplayLimit((prev) => prev + 5);
    };

    // A component mapper for notification types
    const NotificationContent = ({ notification }: { notification: any }) => {
        const notificationType = notification.notificationType;
        
        switch (notificationType) {
            case "BOOKING":
                return (
                    <div className="w-full">
                        <a className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                            href={`/inserat/${notification.inseratId}`}
                        >
                            {notification?.content}
                        </a>
                        <div className="text-gray-400 mt-0.5">Buchung hinzugefügt</div>
                        <div className="text-gray-500 text-[10px] mt-1">
                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                            {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                        </div>
                    </div>
                );
            case "MESSAGE":
                return (
                    <div className="w-full">
                        <a className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                            href={`/conversation?conversationId=${notification?.conversationId}`}
                        >
                            {notification?.content}
                        </a>
                        <div className="text-gray-400 mt-0.5">Neue Nachricht</div>
                        <div className="flex justify-between mt-1">
                            <div className="text-gray-500 text-[10px]">
                                {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                                {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                            </div>
                            {!notification.seen && (
                                <div className="bg-rose-500/90 text-[10px] font-medium px-1.5 rounded-full text-white">
                                    Neu
                                </div>
                            )}
                        </div>
                    </div>
                );
            case "BOOKING_REQUEST":
                return (
                    <div className="w-full">
                        <a className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                            href={`/dashboard/${notification?.userId}?tab=manage`}
                        >
                            {notification?.content}
                        </a>
                        <div className="text-gray-400 mt-0.5">Neue Anfrage</div>
                        <div className="text-gray-500 text-[10px] mt-1">
                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                            {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                        </div>
                    </div>
                );
            case "REPORT_ACTION":
                return (
                    <div className="w-full">
                        <a className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                            href={`/inserat/${notification?.inseratId}`}
                        >
                            {notification?.content}
                        </a>
                        <div className="text-gray-400 mt-0.5">Inhalt verändert</div>
                        <div className="text-gray-500 text-[10px] mt-1">
                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                            {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                        </div>
                    </div>
                );
            case "SUBSCRIPTION_ALMOST_EXPIRED":
                return (
                    <div className="w-full">
                        <a className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                            href={`/dashboard/${notification?.userId}/payments`}
                        >
                            {notification?.content}
                        </a>
                        <div className="text-gray-400 mt-0.5">Abonnement läuft aus</div>
                        <div className="text-gray-500 text-[10px] mt-1">
                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                            {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                        </div>
                    </div>
                );
            case "SUBSCRIPTION_REDEEMED":
                return (
                    <div className="w-full">
                        <a className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                            href={`/dashboard/${notification?.userId}/payments`}
                        >
                            {notification?.content}
                        </a>
                        <div className="text-gray-400 mt-0.5">Abonnement eingelöst</div>
                        <div className="text-gray-500 text-[10px] mt-1">
                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                            {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                        </div>
                    </div>
                );
            case "WELCOME":
                return (
                    <div className="w-full">
                        <a className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
                            href={`/faqs`}
                        >
                            {notification?.content}
                        </a>
                        <div className="text-gray-400 mt-0.5">Willkommen</div>
                        <div className="text-gray-500 text-[10px] mt-1">
                            {!isToday(new Date(notification.createdAt)) && (format(new Date(notification.createdAt), "dd.MM.yy", { locale: de }) + ", ")}
                            {format(new Date(notification.createdAt), "HH:mm", { locale: de })} Uhr
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    
    // Helper function to get the appropriate icon for a notification type
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "BOOKING": return <CiBookmark className="w-4 h-4" />;
            case "MESSAGE": return <MessageCircle className="w-4 h-4" />;
            case "BOOKING_REQUEST": return <LuMailWarning className="w-4 h-4" />;
            case "REPORT_ACTION": return <MdOutlineReportProblem className="w-4 h-4 text-rose-500/90" />;
            case "SUBSCRIPTION_ALMOST_EXPIRED": return <TbClockExclamation className="w-4 h-4 text-amber-500/90" />;
            case "SUBSCRIPTION_REDEEMED": return <IoGiftSharp className="w-4 h-4 text-indigo-400/80" />;
            case "WELCOME": return <PiHandWaving className="w-4 h-4 text-indigo-400/80" />;
            default: return <BellDotIcon className="w-4 h-4" />;
        }
    };

    return (
        <Popover onOpenChange={(e) => {
            if (e) {
                onOpen();
            }
        }}>
            <PopoverTrigger asChild>
                <Button className="w-8 h-8 rounded-full p-0 bg-transparent hover:bg-[#1B1F2C]/80 text-indigo-400/80 hover:text-indigo-400 transition-all duration-200 relative" variant="ghost">
                    <BellDotIcon className="w-5 h-5 " />
                    {unseenNotifications?.length > 0 ? (
                        <span className="absolute -top-1 -right-1 bg-rose-500/90 text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full text-white">
                            {unseenNotifications?.length > 9 ? '9+' : unseenNotifications?.length}
                        </span>
                    ) : null}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="bg-[#141721]/95 backdrop-blur-sm border border-indigo-500/10 p-3 text-gray-200 rounded-md shadow-md w-[380px]">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                        <BellDotIcon className="h-4 w-4 text-indigo-400/80" />
                        <span className="ml-2 text-sm font-medium">Benachrichtigungen</span>
                    </div>
                    {unseenNotifications?.length > 0 && (
                        <div className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full text-[10px] font-medium">
                            {unseenNotifications?.length} neu
                        </div>
                    )}
                </div>
                
                <div className="flex gap-1 mb-3">
                    <button className={cn("text-xs py-1 px-2.5 rounded transition-all duration-200", 
                        usedFilter === "ALL" ? "bg-indigo-500/20 text-indigo-300" : "bg-[#1B1F2C]/60 text-gray-400 hover:bg-[#1B1F2C]")}
                        onClick={() => { setUsedFilter("ALL") }}>
                        Alle
                    </button>
                    <button className={cn("text-xs py-1 px-2.5 rounded transition-all duration-200",
                        usedFilter === "MESSAGES" ? "bg-indigo-500/20 text-indigo-300" : "bg-[#1B1F2C]/60 text-gray-400 hover:bg-[#1B1F2C]")}
                        onClick={() => { setUsedFilter("MESSAGES") }}>
                        Nachrichten
                    </button>
                    <button className={cn("text-xs py-1 px-2.5 rounded transition-all duration-200", 
                        usedFilter === "BOOKING_REQUEST" ? "bg-indigo-500/20 text-indigo-300" : "bg-[#1B1F2C]/60 text-gray-400 hover:bg-[#1B1F2C]")}
                        onClick={() => { setUsedFilter("BOOKING_REQUEST") }}>
                        Anfragen
                    </button>
                    <button className={cn("text-xs py-1 px-2.5 rounded transition-all duration-200",
                        usedFilter === "BOOKING" ? "bg-indigo-500/20 text-indigo-300" : "bg-[#1B1F2C]/60 text-gray-400 hover:bg-[#1B1F2C]")}
                        onClick={() => { setUsedFilter("BOOKING") }}>
                        Buchungen
                    </button>
                </div>
                
                <style jsx global>{`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
                
                <div className="max-h-[320px] overflow-y-auto no-scrollbar">
                    {foundNotifications?.length === 0 ? (
                        <div className="p-4 bg-[#1B1F2C]/60 rounded text-center flex flex-col items-center gap-2">
                            <BellDotIcon className="h-5 w-5 text-gray-500/50" />
                            <p className="text-gray-400 text-xs">Keine Benachrichtigungen</p>
                        </div>
                    ) : (
                        renderedNotifications?.length > 0 ? (
                            renderedNotifications?.map((notification) => (
                                <div className="bg-[#1B1F2C]/60 hover:bg-[#1B1F2C] p-2.5 mb-1.5 rounded flex gap-2.5 transition-colors" key={notification.id}>
                                    <div className="text-indigo-400/80 flex-shrink-0 mt-0.5 bg-indigo-500/10 rounded-full p-1.5">
                                        {getNotificationIcon(notification.notificationType)}
                                    </div>
                                    <div className="text-xs flex-1">
                                        <NotificationContent notification={notification} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 bg-[#1B1F2C]/60 rounded text-center flex flex-col items-center gap-2">
                                {usedFilter === "MESSAGES" ? <MessageCircle className="h-5 w-5 text-gray-500/50" /> :
                                 usedFilter === "BOOKING" ? <CiBookmark className="h-5 w-5 text-gray-500/50" /> :
                                 usedFilter === "BOOKING_REQUEST" ? <LuMailWarning className="h-5 w-5 text-gray-500/50" /> :
                                 <BellDotIcon className="h-5 w-5 text-gray-500/50" />}
                                <p className="text-gray-400 text-xs">Keine {usedFilter.toLowerCase() === "all" ? "Benachrichtigungen" : 
                                    usedFilter === "MESSAGES" ? "Nachrichten" : 
                                    usedFilter === "BOOKING" ? "Buchungen" : "Anfragen"} gefunden</p>
                            </div>
                        )
                    )}
                </div>
                
                {/* Add helpful footer */}
                {foundNotifications?.length > renderedNotifications?.length && (
                    <div className="mt-2 pt-2 border-t border-indigo-500/10 flex justify-center">
                        <button 
                            onClick={loadMoreNotifications}
                            className="text-indigo-400/80 hover:text-indigo-300 text-[10px] transition-colors"
                        >
                            Mehr Benachrichtigungen anzeigen
                        </button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

export default NotificationShortCut;