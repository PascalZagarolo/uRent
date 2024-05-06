'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { LogOutIcon, MailCheck, SettingsIcon, TrendingUp, UserIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import ConversationShortCut from "./conversation-shortcut";
import FavouritesShortCut from "./favourites-shortcut";
import NotificationShortCut from "./notification-shortcut";

import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { notification, savedSearch, userTable  } from "@/db/schema";

import { signOut } from "@/actions/signout";
import { RiAdminFill } from "react-icons/ri";
import { IoIosPricetags } from "react-icons/io";
import SavedSearchShortCut from "./saved-search-shortcut";


interface LoggedInBarHeaderProps {
    currentUser: typeof userTable.$inferSelect;
    foundNotifications : typeof notification.$inferSelect[];
    foundConversations? : number;
    savedSearches : typeof savedSearch.$inferSelect
}

const LoggedInBarHeader: React.FC<LoggedInBarHeaderProps> = ({
    currentUser,
    foundNotifications,
    foundConversations,
    savedSearches
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
            <div className="  font-semibold  text-xs text-gray-200 2xl:mr-8 lg:mr-4  hidden items-center 2xl:flex">
                 
            🎉 {currentUser.name.toUpperCase() || ""} 🎉
            </div>
            <div className="flex lg:gap-x-2">
                <div className="sm:block hidden">
                    <NotificationShortCut
                    foundNotifications={foundNotifications}
                    />
                </div>
                <div className="xl:block hidden">

                    <SavedSearchShortCut
                    //@ts-ignore
                        savedSearches = {savedSearches}
                    />

                </div>
                <div className="lg:block hidden">

                    <FavouritesShortCut
                        currentUser={currentUser}
                    />

                </div>
                <div className="items-center mr-4 sm:block hidden">
                    <ConversationShortCut 
                    foundConversations={foundConversations || 0}
                    />
                </div>
            </div>

            <Popover>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <img
                                    src={currentUser?.image || "/placeholder-person.jpg"}
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

                            <span className="ml-2 text-base flex">
                                {currentUser.isBusiness ? (
                                    <div className="font-semibold  flex items-center text-indigo-800 gap-x-1">
                                            Vermieter <div className="text-gray-200">Account</div>
                                    </div>
                                ) : (
                                    <div className="font-semibold">
                                        Mieter Account
                                        <p className="text-xs font-normal">
                                            Du bist Vermieter? <a className="text-blue-500 cursor-pointer" href={`/profile/${currentUser.id}`}>Hier klicken</a>
                                        </p>
                                    </div>
                                )}
                            </span>
                        </h3>
                    </div>
                    {currentUser.isAdmin && (
                        <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] 
                        border-2 border-gray-300  mb-2 w-full 
                        dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-indigo-900 flex justify-start"
                        onClick={() => {router.push(`/admin`)}}
                    >
                        <RiAdminFill  className="mr-4 w-4 h-4" />
                        <p>
                            Admin Dashboard
                        </p>
                    </Button>
                    )}
                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-none flex justify-start"
                        onClick={onClick}
                    >
                        <UserIcon className="mr-4 w-4 h-4" />
                        <p>
                            Mein Profil
                        </p>
                    </Button>

                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-none flex justify-start mt-2"
                        onClick={onDashboard}
                    >
                        <TrendingUp className="mr-4 w-4 h-4" />
                        <p>
                            Dashboard
                        </p>
                    </Button>

                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-none flex justify-start mt-2"
                        onClick={onMessages}
                    >
                        <MailCheck className="mr-4 w-4 h-4" />
                        <p>
                            Konversationen
                        </p>
                    </Button>

                    {currentUser.isBusiness && (
                        <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-none flex justify-start mt-2"
                        onClick={() => {router.push("/pricing")}}
                    >
                        <IoIosPricetags  className="mr-4 w-4 h-4" />
                        <p>
                            Pläne und Upgrades
                        </p>
                    </Button>
                    )}

                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] 
                        border-2 border-gray-300   w-full dark:bg-[#1b1b1b] dark:hover:bg-[#171717] dark:border-none flex justify-start mt-2"
                        onClick={() => {router.push("/settings")}}
                        
                    >
                        <SettingsIcon className="mr-4 w-4 h-4" />
                        <p>
                            Einstellungen
                        </p>
                    </Button>


                    <Separator className="dark:bg-gray-100/80 mt-2 mb-2 w-1/2" />
                    <Button
                        variant="ghost"
                        className="  bg-[#e1dfdf] 
                        border-2 border-gray-300   w-full dark:bg-[#0f0f0f] dark:hover:bg-[#171717] dark:border-none flex justify-start mt-2"
                      onClick={() => signOut()}
                    >
                        <LogOutIcon className="mr-4 w-4 h-4" />
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