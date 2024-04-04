'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";



const MenuBar = () => {

    const router = useRouter();

    const pathname = usePathname();

    const params = useParams();


    const isAnsicht = pathname.includes("view");
    const isPrivacy = pathname.includes("privacy");
    const isSafety = pathname.includes("safety");
    const isDashboard = !isAnsicht && !isPrivacy && !isSafety;

    

    return ( 
        <div className="w-full dark:bg-[#141414]">
            <div className="pt-4 px-4 flex justify-evenly text-sm font-semibold">
            <a className={cn("p-4 rounded-t-md", isDashboard && "bg-[#1C1C1C]")}
            href={`/settings`}
            >
                Account
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer", isAnsicht && "bg-[#1C1C1C]")} href={`/settings/view`}>
                Ansicht
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer", isPrivacy && "bg-[#1C1C1C]")} href={`/settings/privacy`}>
                Privatsphäre
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer", isSafety && "bg-[#1C1C1C]")} href={`/settings/safety`}>
                Sicherheit
            </a>
            
            </div>
        </div>
     );
}
 
export default MenuBar;