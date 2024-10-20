'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";

interface MenuBarProps {
    isBusiness : boolean
    currentTab?: string;
    setCurrentTab: (tab: string) => void;
}

const MenuBar : React.FC<MenuBarProps> = ({
    isBusiness,
    currentTab,
    setCurrentTab
}) => {

   

    const isManage = currentTab === "manage";
    const isFavourite = currentTab === "favourites";
    const isInserat = currentTab === "inserate";
    const isBooking = currentTab === "bookings";
    const isPayment = currentTab === "payments";
    const isDashboard = currentTab === "dashboard";

    

    return ( 
        <div className="w-full dark:bg-[#141414]">
            <div className="pt-4 sm:px-4 flex justify-evenly text-xs sm:text-sm font-semibold">
            <a className={cn("sm:p-4 py-4 px-2 rounded-t-md dark:text-gray-200/70 text-gray-700/60", 
            isDashboard && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-700")}
        
            onClick={() => setCurrentTab("dashboard")}
            >
                Übersicht
            </a>
            {isBusiness && (
                <a className={cn("sm:p-4 py-4 px-2rounded-t-md hover:cursor-pointer dark:text-gray-200/70 text-gray-700/60", 
                isManage && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-700")} 
                //href={`${baseUrl}/manage`}
                onClick={() => setCurrentTab("manage")}
                >
                    Buchungen
                </a>
            )}
            {isBusiness && (
                <a className={cn("sm:p-4 py-4 px-2 rounded-t-md hover:cursor-pointer text-gray-700/60 dark:text-gray-200/70", 
                isInserat && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-700")} 
                //href={`${baseUrl}/inserate`}
                onClick={() => setCurrentTab("inserate")}
                >
                    Meine <br className="sm:hidden block"/>Inserate
                </a>
            )}
            {isBusiness && (
                <a className={cn("sm:p-4 py-4 px-2 rounded-t-md hover:cursor-pointer text-gray-700/60 dark:text-gray-200/70", 
                isPayment && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-700")} 
                //href={`${baseUrl}/payments`}
                onClick={() => setCurrentTab("payments")}
                >
                    Zahlungs<br className="sm:hidden block"/>verkehr
                </a>
            )}
            <a className={cn("sm:p-4 py-4 px-2 rounded-t-md hover:cursor-pointer text-gray-700/60 dark:text-gray-200/70", 
            isFavourite && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-700")} 
            //href={`${baseUrl}/favourites`}
            onClick={() => setCurrentTab("favourites")}
            >
                Favoriten
            </a>
            {/*
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer text-gray-700/60 dark:text-gray-200/70", 
            isBooking && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-700")} href={`${baseUrl}/bookings`}>
                Gemietete Fahrzeuge
            </a>
            */}
            </div>
        </div>
     );
}
 
export default MenuBar;