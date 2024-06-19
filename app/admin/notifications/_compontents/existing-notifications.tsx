import { Button } from "@/components/ui/button";
import { notificationUnauthorized } from "@/db/schema";
import { format } from "date-fns";
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { FaNewspaper, FaShare } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import DeleteNotificationAlert from "./delete-notification";
import EditNotificationDialog from "./edit-notification-dialog";

interface ExistingNotificationsProps {
    foundNotifications: typeof notificationUnauthorized.$inferSelect[];
}

const ExistingNotifications: React.FC<ExistingNotificationsProps> = ({
    foundNotifications
}) => {
    return (
        <div>
            <div className="gap-y-4">
                {foundNotifications.map((notification) => (
                    <div className="bg-[#0F0F0F] rounded-md p-4" key={notification.id}>
                        {notification.imageUrl && (
                            <div className="w-full h-[80px] mb-2">
                                <Image
                                    src={notification.imageUrl}
                                    width={1000}
                                    height={1000}
                                    alt="notification image"
                                    className="object-cover w-full h-[80px]"
                                />
                            </div>
                        )}
                        <div className="w-full flex items-center">
                            <div>
                                {
                                    {
                                        "NEWS": <FaNewspaper className="w-4 h-4 mr-2" />,
                                        "OFFER": <MdOutlineLocalOffer className="w-4 h-4 mr-2" />
                                    }[notification.notificationType]
                                }
                            </div>
                            <div className="text-sm font-semibold w-3/4 line-clamp-1 break-all">
                                {notification.title}
                            </div>
                        </div>
                        {notification.link && (
                            <a className=" flex items-center text-xs hover:underline text-indigo-800" href={notification.link} target="_blank">
                                {notification.link} <FaShare className="w-4 h-4 ml-2" />
                            </a>
                        )}
                        <div className="mt-2 whitespace-pre-line text-xs">
                            {notification.content}
                        </div>
                        <div className="text-xs text-gray-200/60 w-full flex justify-end mt-2">
                            erstellt am: {format(new Date(notification.createdAt), 'dd.MM.yyyy')}
                        </div>
                        <div className="w-full flex items-center gap-x-4">
                            <EditNotificationDialog 
                            thisNotification={notification}
                            />
                            <DeleteNotificationAlert 
                            notificationId={notification.id}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ExistingNotifications;