'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Notification, User } from "@prisma/client";
import { LogOutIcon, MailCheck, MessageCircleIcon, Settings, Settings2Icon, SettingsIcon, TrendingUp, UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import ConversationShortCut from "./conversation-shortcut";
import FavouritesShortCut from "./favourites-shortcut";
import NotificationShortCut from "./notification-shortcut";
import SettingsSheet from "./settings-sheet";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface LoggedInBarHeaderProps {
    currentUser: User;
    notifications: Notification[];
}

const LoggedInBarHeader: React.FC<LoggedInBarHeaderProps> = ({
    currentUser,
    notifications
}) => {

    const router = useRouter();


    const onClick = () => {
        router.push(`/profile/${currentUser.id}`);
    }

    const onDashboard = () => {
        router.push(`/dashboard/${currentUser.id}`)
    }

    const onMessages = () => {
        router.push(`/conversation`)
    }


    return (
        <div className="flex ml-auto items-center sm:mt-2">
            <div className="  font-semibold 2xl:mr-16 lg:mr-8 text-xs text-gray-200  hidden items-center 2xl:flex">
                🎉 Willkommen zurück
                <p className="ml-1 font-bold hidden 2xl:flex  text-gray-100 mr-2">{currentUser.name.toUpperCase() || ""}</p> 🎉
            </div>
            <div className="flex lg:gap-x-2">
                <div className="sm:block hidden">
                    <NotificationShortCut
                        notifications={notifications}
                    />
                </div>
                <div className="sm:block hidden">
                    
                                <FavouritesShortCut
                                    currentUser={currentUser}
                                />
                            
                </div>
                <div className="items-center mr-4 sm:block hidden">
                    <ConversationShortCut />
                </div>
            </div>

            <Popover>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>

                                <img
                                    src={currentUser.image || "/placeholder-person.jpg"}
                                    className="sm:ml-0 sm:mr-0 mr-4 w-[40px] h-[40px] rounded-full  hover:cursor-pointer"

                                />

                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent className="dark:bg-[#0F0F0F]">
                            <p>Mein Profil</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <PopoverContent className="dark:bg-[#0F0F0F] dark:text-gray-100 border-none">
                    <div className="mb-2">
                        <h3 className="flex">

                            <span className="ml-2 text-base">Mein Konto</span>
                        </h3>
                    </div>
                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-none flex justify-start"
                        onClick={onClick}
                    >
                        <UserIcon className="mr-4 w-6 h-6" />
                        <p>
                            Mein Profil
                        </p>
                    </Button>

                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-none flex justify-start mt-2"
                        onClick={onDashboard}
                    >
                        <TrendingUp className="mr-4" />
                        <p>
                            Dashboard
                        </p>
                    </Button>

                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-none flex justify-start mt-2"
                        onClick={onMessages}
                    >
                        <MailCheck className="mr-4" />
                        <p>
                            Konversationen
                        </p>
                    </Button>

                    <SettingsSheet
                        currentUser={currentUser}
                    />


                    <Separator className="dark:bg-gray-100/80 mt-2 mb-2 w-1/2" />
                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                        border-2 border-gray-300   w-full dark:bg-[#0f0f0f] dark:hover:bg-[#171717] dark:border-none flex justify-start mt-2"
                        onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
                    >
                        <LogOutIcon className="mr-4" />
                        <p>
                            Abmelden
                        </p>
                    </Button>



                </PopoverContent>
            </Popover>



        </div>
    );
}

export default LoggedInBarHeader;