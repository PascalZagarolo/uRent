'use client'

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Settings, Settings2Icon, SettingsIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";


interface LoggedInBarHeaderProps {
   currentUser : User;
}

const LoggedInBarHeader: React.FC<LoggedInBarHeaderProps> = ({
    currentUser
}) => {

    const router = useRouter();


    const onClick = () => {
        router.push(`/profile/${currentUser.id}`);
    }
    
   
    return ( 
        <div className="flex justify-start  items-center mt-2">
            <div className="  font-semibold mr-4 text-xs text-gray-200  hidden items-center 2xl:flex">
            🎉 Willkommen zurück
                    <p className="ml-1 font-bold hidden 2xl:flex  text-gray-100 mr-2">{currentUser.name.toUpperCase() || ""}</p> 🎉
                </div>
            <Button variant="ghost" 
            className="outline outline-offset-1 outline-1 lg:mr-4 bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-2 border-gray-300 lg:block hidden
            dark:bg-slate-800 dark:border-none dark:outline-none
            " 
            onClick={onClick}>
                <UserIcon className="text-black dark:text-gray-100"/>
            </Button>
            <UserIcon className="text-white lg:hidden mr-2 hover: cursor-pointer" onClick={onClick}/>
            
        </div>
     );
}
 
export default LoggedInBarHeader;