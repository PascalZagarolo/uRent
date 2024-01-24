'use client'

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { UserIcon } from "lucide-react";
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
            <div className="2xl:flex font-semibold mr-4 text-sm text-gray-200 items-center hidden">
            🎉 Willkommen zurück
                    <p className="ml-1 font-bold  text-gray-100 mr-2">{currentUser.name.toUpperCase() || ""}</p> 🎉
                </div>
            <Button variant="ghost"  className="outline outline-offset-1 outline-1 mr-4 bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-2 border-gray-300" onClick={onClick}>
                <UserIcon className="text-black"/>
            </Button>
        </div>
     );
}
 
export default LoggedInBarHeader;