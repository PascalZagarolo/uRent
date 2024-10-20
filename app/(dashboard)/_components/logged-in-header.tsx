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
import { notification, savedSearch, userTable } from "@/db/schema";

import { signOut } from "@/actions/signout";
import { RiAdminFill } from "react-icons/ri";
import { IoIosPricetags } from "react-icons/io";
import SavedSearchShortCut from "./saved-search-shortcut";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import NewMessageToast from "./used-toasts/new-message-toast";
import { pusherClient } from "@/lib/pusher";


interface LoggedInBarHeaderProps {
    currentUser: typeof userTable.$inferSelect;
    foundNotifications: typeof notification.$inferSelect[];
    foundConversations?: number;
    savedSearches: typeof savedSearch.$inferSelect;
    isMobile? : boolean
}

const LoggedInBarHeader: React.FC<LoggedInBarHeaderProps> = ({
    currentUser,
    foundNotifications,
    foundConversations,
    savedSearches,
    isMobile
}) => {

    
    
    const [renderedNotifications, setRenderedNotifications] = useState(foundNotifications ? foundNotifications : []);

    const router = useRouter();

    const [savedIds, setSavedIds] = useState([]);


    

    

    useEffect(() => {
        
        if(!isMobile) {
            pusherClient.subscribe(currentUser.id);
        
        
        // Initialize the function inside useEffect to ensure it's only created once
        const onNewNotification = (data) => {
            
            if (savedIds.includes(data.notification.id)) {
                
                return;
            } else {
                setRenderedNotifications((current) => [...current, data.notification]);
                setSavedIds((current) => [...current, data.notification.id]);
                toast.custom((t) => (
                    <NewMessageToast
                        t={t}
                        usedImageUrl={data.imageUrl}
                        notification={data.notification}
                    />
                ));
                
            }
        };

        
        pusherClient.bind('notification:new' , onNewNotification);

        return () => {
            pusherClient.unsubscribe(currentUser.id);
            pusherClient.unbind("notification:new", onNewNotification);
            
        };
        }
    },[])

    useEffect(() => {+
        
        setRenderedNotifications(foundNotifications);
    },[foundNotifications])

    return (
        <div className="flex ml-auto items-center sm:mt-2">
            <div className="font-semibold  text-xs text-gray-200 2xl:mr-8 lg:mr-4  hidden items-center 2xl:block">

                <div className="text-xs max-w-[160px] break-all line-clamp-1 font-medium">
                    🎉 {currentUser.name.toUpperCase() || ""} 🎉
                </div>

                {currentUser?.isBusiness && (
                    <div className="flex justify-center items-center font-semibold text-indigo-600">
                        Vermieter
                    </div>
                )}

                {(!currentUser.isBusiness && currentUser) && (
                    <div className="flex justify-center items-center
                     hover:underline dark:text-gray-200/60 font-medium hover:cursor-pointer" onClick={() => { router.push(`/profile/${currentUser.id}`) }}>
                        Du bist Vermieter? Klicke hier
                    </div>
                )}
            </div>
            <div className="flex lg:gap-x-2">
                <div className="sm:block hidden">
                    <NotificationShortCut
                        foundNotifications={renderedNotifications}
                        
                    />
                </div>
                <div className="xl:block hidden">

                    <SavedSearchShortCut
                        //@ts-ignore
                        savedSearches={savedSearches}
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
            className="sm:ml-0 sm:mr-0 mr-4 w-[40px] h-[40px] rounded-full hover:cursor-pointer"
            alt="User Avatar"
          />
        </PopoverTrigger>
      </TooltipTrigger>
      <TooltipContent className="dark:bg-[#0F0F0F] text-sm">
        <p>Mein Profil</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <PopoverContent className="dark:bg-[#0F0F0F] dark:text-gray-100 text-sm bg-white shadow-lg rounded-lg p-4">
    <div className="mb-2">
      <h3 className="flex">
        <span className="ml-2 text-base flex">
          {currentUser.isBusiness ? (
            <div className="font-semibold flex items-center text-indigo-800 gap-x-1">
              Vermieter <div className="text-gray-400">Account</div>
            </div>
          ) : (
            <div className="font-semibold">
              Mieter Account
              <p className="text-xs font-normal">
                Du bist Vermieter? <a className="text-blue-500 hover:underline" href={`/profile/${currentUser.id}`}>Hier klicken</a>
              </p>
            </div>
          )}
        </span>
      </h3>
    </div>

    {currentUser.isAdmin && (
      <a
        href="/admin"
        className=" bg-indigo-800 text-white rounded-md w-full flex items-center p-2 hover:bg-indigo-900 transition"
      >
        <RiAdminFill className="mr-4 w-4 h-4" />
        <p>Admin Dashboard</p>
      </a>
    )}

    <a
      href={`/profile/${currentUser.id}`}
      className=" bg-gray-100 dark:bg-[#1b1b1b] text-gray-700 dark:text-gray-300 rounded-md w-full flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition mt-2"
    >
      <UserIcon className="mr-4 w-4 h-4" />
      <p>Mein Profil</p>
    </a>

    <a
      href={`/dashboard/${currentUser.id}`}
      className=" bg-gray-100 dark:bg-[#1b1b1b] text-gray-700 dark:text-gray-300 rounded-md w-full flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition mt-2"
    >
      <TrendingUp className="mr-4 w-4 h-4" />
      <p>Dashboard</p>
    </a>

    <a
      href="/conversation"
      className=" bg-gray-100 dark:bg-[#1b1b1b] text-gray-700 dark:text-gray-300 rounded-md w-full flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition mt-2"
    >
      <MailCheck className="mr-4 w-4 h-4" />
      <p>Konversationen</p>
    </a>

    {currentUser.isBusiness && (
      <a
        href="/pricing"
        className=" bg-gray-100 dark:bg-[#1b1b1b] text-gray-700 dark:text-gray-300 rounded-md w-full flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition mt-2"
      >
        <IoIosPricetags className="mr-4 w-4 h-4" />
        <p>Pläne und Upgrades</p>
      </a>
    )}

    <a
      href="/settings"
      className=" bg-gray-100 dark:bg-[#1b1b1b] text-gray-700 dark:text-gray-300 rounded-md w-full flex items-center p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition mt-2"
    >
      <SettingsIcon className="mr-4 w-4 h-4" />
      <p>Einstellungen</p>
    </a>

    <Separator className="dark:bg-gray-100/80 mt-2 mb-2 w-1/2" />

    <a
      onClick={() => signOut()}
      className=" bg-indigo-800 text-white rounded-md w-full flex items-center p-2 hover:bg-indigo-900 transition mt-2 hover:cursor-pointer"
    >
      <LogOutIcon className="mr-4 w-4 h-4" />
      <p>Abmelden</p>
    </a>
  </PopoverContent>
</Popover>





        </div>
    );
}

export default LoggedInBarHeader;