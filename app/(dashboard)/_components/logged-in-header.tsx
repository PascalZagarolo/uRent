'use client'

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LogOutIcon, MailCheck, SettingsIcon, StarIcon, TrendingUp, UserIcon } from "lucide-react";
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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import NewMessageToast from "./used-toasts/new-message-toast";
import { pusherClient } from "@/lib/pusher";
import AddInseratMobile from "./add-inserat-mobile";


interface LoggedInBarHeaderProps {
  currentUser: typeof userTable.$inferSelect;
  foundNotifications: typeof notification.$inferSelect[];
  foundConversations?: number;
  savedSearches: typeof savedSearch.$inferSelect;
  isMobile?: boolean
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
    if (!isMobile) {
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

      pusherClient.bind('notification:new', onNewNotification);

      return () => {
        pusherClient.unsubscribe(currentUser.id);
        pusherClient.unbind("notification:new", onNewNotification);
      };
    }
  }, [])

  useEffect(() => {
    setRenderedNotifications(foundNotifications);
  }, [foundNotifications])

  return (
    <div className="flex ml-auto items-center space-x-3">
      {/* User greeting - only on larger screens */}
      <div className="hidden 2xl:flex flex-col text-xs mr-6">
        <div className="text-gray-200/90 font-medium tracking-wide max-w-[160px] truncate">
          {currentUser.name || ""}
        </div>

        {currentUser?.isBusiness ? (
          <div className="text-indigo-400/90 text-xs font-medium">
            Vermieter
          </div>
        ) : (
          <div className="text-gray-400/80 text-xs hover:text-indigo-300 transition-colors cursor-pointer" 
               onClick={() => { router.push(`/profile/${currentUser.id}`) }}>
            Vermieter werden
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center space-x-1.5 mr-2">
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
        
        <div className="sm:block hidden">
          <ConversationShortCut
            foundConversations={foundConversations || 0}
          />
        </div>
      </div>
      
      {/* Mobile add button */}
      <div className="ml-auto sm:hidden">
        <AddInseratMobile 
          currentUser={currentUser}
        />
      </div>
      
      {/* User avatar and dropdown */}
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <div className="relative overflow-hidden rounded-full border-2 border-transparent hover:border-indigo-500/30 transition-all duration-200">
                  <img
                    src={currentUser?.image || "/placeholder-person.jpg"}
                    className="w-9 h-9 rounded-full object-cover cursor-pointer"
                    alt="User Avatar"
                  />
                </div>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent className="bg-[#141721]/95 border-none text-xs font-medium backdrop-blur-sm">
              <p>Mein Profil</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent className="bg-[#141721]/95 backdrop-blur-sm border border-indigo-500/10 text-gray-200 text-sm rounded-md shadow-md p-3 w-60">
          <div className="mb-3">
            <div className="flex items-center gap-2 pb-2">
              <img 
                src={currentUser?.image || "/placeholder-person.jpg"} 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div>
                <div className="font-medium text-sm text-gray-100">{currentUser.name}</div>
                <div className="text-xs text-gray-400">{currentUser.isBusiness ? "Vermieter" : "Mieter"}</div>
              </div>
            </div>
            
            {!currentUser.isBusiness && (
              <div className="text-xs text-gray-400 mt-1">
                Du bist Vermieter? <a className="text-indigo-400 hover:text-indigo-300 transition-colors" href={`/profile/${currentUser.id}`}>Hier klicken</a>
              </div>
            )}
          </div>

          {currentUser.isAdmin && (
            <a
              href="/admin"
              className="bg-indigo-600/20 text-indigo-300 rounded w-full flex items-center p-1.5 px-2 hover:bg-indigo-600/30 transition-colors border border-indigo-500/20 mb-2 text-xs"
            >
              <RiAdminFill className="mr-2 w-4 h-4" />
              <p>Admin Dashboard</p>
            </a>
          )}

          <div className="space-y-1">
            <a
              href={`/profile/${currentUser.id}`}
              className="bg-[#1B1F2C]/60 text-gray-300 rounded w-full flex items-center p-1.5 px-2 hover:bg-[#1B1F2C] transition-colors text-xs"
            >
              <UserIcon className="mr-2 w-4 h-4" />
              <p>Mein Profil</p>
            </a>

            {currentUser?.isBusiness ? (
              <a
                href={`/dashboard/${currentUser.id}?tab=dashboard`}
                className="bg-[#1B1F2C]/60 text-gray-300 rounded w-full flex items-center p-1.5 px-2 hover:bg-[#1B1F2C] transition-colors text-xs"
              >
                <TrendingUp className="mr-2 w-4 h-4" />
                <p>Dashboard</p>
              </a>
            ) : (
              <a
                href={`/dashboard/${currentUser.id}?tab=favourites`}
                className="bg-[#1B1F2C]/60 text-gray-300 rounded w-full flex items-center p-1.5 px-2 hover:bg-[#1B1F2C] transition-colors text-xs"
              >
                <StarIcon className="mr-2 w-4 h-4" />
                <p>Meine Favouriten</p>
              </a>
            )}

            <a
              href="/conversation"
              className="bg-[#1B1F2C]/60 text-gray-300 rounded w-full flex items-center p-1.5 px-2 hover:bg-[#1B1F2C] transition-colors text-xs"
            >
              <MailCheck className="mr-2 w-4 h-4" />
              <p>Konversationen</p>
            </a>

            {currentUser.isBusiness && (
              <a
                href="/pricing"
                className="bg-[#1B1F2C]/60 text-gray-300 rounded w-full flex items-center p-1.5 px-2 hover:bg-[#1B1F2C] transition-colors text-xs"
              >
                <IoIosPricetags className="mr-2 w-4 h-4" />
                <p>Pläne und Upgrades</p>
              </a>
            )}

            <a
              href="/settings"
              className="bg-[#1B1F2C]/60 text-gray-300 rounded w-full flex items-center p-1.5 px-2 hover:bg-[#1B1F2C] transition-colors text-xs"
            >
              <SettingsIcon className="mr-2 w-4 h-4" />
              <p>Einstellungen</p>
            </a>
          </div>

          <Separator className="bg-indigo-500/10 my-2" />

          <button
            onClick={() => signOut()}
            className="bg-indigo-600/20 text-indigo-300 rounded w-full flex items-center p-1.5 px-2 hover:bg-indigo-600/30 transition-colors border border-indigo-500/10 text-xs"
          >
            <LogOutIcon className="mr-2 w-4 h-4" />
            <p>Abmelden</p>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default LoggedInBarHeader;