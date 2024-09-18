'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";


interface MenuBarProps {
    currentValue? : string;
    setCurrentValue? : (value: string) => void;
}

const MenuBar = ({ currentValue, setCurrentValue } : MenuBarProps) => {

    const router = useRouter();

    const pathname = usePathname();

    const params = useParams();


    const isAnsicht = currentValue === "view";
    const isPrivacy = currentValue === "privacy";
    const isSafety = currentValue === "safety";
    const isDashboard = currentValue === "account";

    

    return ( 
        <div className="w-full dark:bg-[#141414]">
            <div className="pt-4 px-4 flex justify-evenly text-sm font-semibold">
            <a className={cn("p-4 rounded-t-md dark:text-gray-200/70 text-gray-700/60",
             isDashboard && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-800")}
            onClick={() => {setCurrentValue("account")}}
            >
                Account
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer dark:text-gray-200/70 text-gray-700/60",
             isAnsicht && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-800")} 
             onClick={() => {setCurrentValue("view")}}>
                Ansicht
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer dark:text-gray-200/70 text-gray-700/60",
             isPrivacy && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-800")} 
             onClick={() => {setCurrentValue("privacy")}}>
                Privatsphäre
            </a>
            <a className={cn("p-4 rounded-t-md hover:cursor-pointer dark:text-gray-200/70 text-gray-700/60",
             isSafety && "dark:bg-[#1C1C1C] dark:text-gray-200 text-gray-800")} 
             onClick={() => {setCurrentValue("safety")}}>
                Sicherheit
            </a>
            
            </div>
        </div>
     );
}
 
export default MenuBar;