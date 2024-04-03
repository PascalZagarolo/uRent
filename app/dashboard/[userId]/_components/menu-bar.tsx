'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";



const MenuBar = () => {

    const router = useRouter();

    const pathname = usePathname();

    const params = useParams();

    const isManage = pathname.includes("manage");
    const isFavourite = pathname.includes("favourite");
    const isInserat = pathname.includes("inserat");
    const isBooking = pathname.includes("bookings");
    const isDashboard = !isManage && !isFavourite && !isInserat && !isBooking;

    const baseUrl = "/dashboard/" + params.userId;

    return ( 
        <div className="w-full dark:bg-[#141414]">
            <div className="pt-4 px-4 flex justify-evenly text-sm font-semibold">
            <a className={cn("p-4 rounded-t-md", isDashboard && "bg-[#1C1C1C]")}
            href={`${baseUrl}`}
            >
                Übersicht
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer", isManage && "bg-[#1C1C1C]")} href={`${baseUrl}/manage`}>
                Meine Fahrzeuge
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer", isInserat && "bg-[#1C1C1C]")} href={`${baseUrl}/inserate`}>
                Meine Inserate
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer", isFavourite && "bg-[#1C1C1C]")} href={`${baseUrl}/favourites`}>
                Favouriten
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer", isBooking && "bg-[#1C1C1C]")} href={`${baseUrl}/bookings`}>
                Buchungen
            </a>
            </div>
        </div>
     );
}
 
export default MenuBar;