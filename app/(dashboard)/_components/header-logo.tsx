

import LoginBarHeader from "./login-bar-header";



import Inserat from "./add-inserat";
import SearchItem from "./search-item";

import { LogOutIcon, Truck } from "lucide-react";



import { cn } from "@/lib/utils";

import MobileFilterSheet from "./mobile-filter-sheet";
import LocationBar from "./location-bar";

import LoggedInBarHeader from "./logged-in-header";

import { notification, notificationUnauthorized, savedSearch, userTable } from '../../../db/schema';


import { cache, useEffect } from "react";
import { getOpenConversations } from "@/actions/getOpenConversations";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import toast from "react-hot-toast";



interface HeaderProps {
    currentUser: typeof userTable.$inferSelect;
    foundNotifications: typeof notification.$inferSelect[];
}

const Header: React.FC<HeaderProps> = cache(async ({
    currentUser,
    foundNotifications
}) => {

   

    const foundConversations = await getOpenConversations(currentUser?.id);

    let savedSearches: any = [];

    let notificationsGlobal;

    if (currentUser) {
        savedSearches = await db.query.savedSearch.findMany({
            where: eq(savedSearch.userId, currentUser.id),
            orderBy: (savedSearch, { desc }) => [desc(savedSearch.createdAt)]
        });
    } else {
        notificationsGlobal = await db.query.notificationUnauthorized.findMany({
            where : eq(notificationUnauthorized.isPublic, true),
        });
    }



    return (
        <div className="bg-[#1f2332] h-[90px] flex-shrink-1 hidden sm:block">
    <div className="flex 2xl:justify-start md:justify-evenly">
        <div className="block relative">
            <a className="flex flex-col justify-start items-center py-6  ml-8 
            sm:text-2xl font-semibold text-white hover:cursor-pointer" href="/">
                {/* <div className="flex items-center relative">
                    <div className="text-[#363d5e] font-font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">u</div>
                    <p className="text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Rent</p>
                </div> */}
                uRent
            </a>
            
        </div>
        <div className="flex w-full">
        <div className={cn("flex items-center justify-center ", currentUser ? "ml-auto" : "w-full")}>
                <div className="2xl:mr-16 items-center sm:mr-8">
                    <Inserat currentUser={currentUser} isntLoggedIn={currentUser ? false : true} />
                </div>
                {/* <div className="p-4 xl:hidden flex rounded-md mt-2 items-center">
                    <MobileFilterSheet />
                </div> */}
                <div className="flex justify-center mt-2">
                    <SearchItem />
                </div>
                <div className="flex justify-center">
                    <LocationBar />
                </div>
            </div>
             {!currentUser ? (
                <LoginBarHeader 
                foundNotifications = {notificationsGlobal}
                />
            ) : (
                <div className="items-center flex ml-auto mr-8 gap-x-2">
                    <LoggedInBarHeader
                        currentUser={currentUser}
                        foundNotifications={foundNotifications}
                        savedSearches={savedSearches}
                        foundConversations={foundConversations}
                    />
                </div>
            )} 
        </div>
    </div>
</div>

    );
});

export default Header;