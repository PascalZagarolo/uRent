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
    const isPayment = pathname.includes("payments");
    const isDashboard = !isManage && !isFavourite && !isInserat && !isBooking && !isPayment;

    const baseUrl = "/admin/" ;

    return ( 
        <div className="w-full dark:bg-[#141414]">
            <div className="pt-4 px-4 flex justify-evenly text-sm font-semibold">
            <a className={cn("p-4 rounded-t-md dark:text-gray-200/70 text-gray-700/60", isDashboard && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-700")}
            href={`${baseUrl}`}
            >
                Codes & Rabatte
            </a>
            
            </div>
        </div>
     );
}
 
export default MenuBar;