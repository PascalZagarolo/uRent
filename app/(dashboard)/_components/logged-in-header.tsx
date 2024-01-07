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
            <p className="flex font-semibold mr-4 text-sm text-gray-200 items-center">
                    Willkommen zurück
                    <p className="ml-1 font-bold  text-gray-100 mr-4">{currentUser.name.toUpperCase()}</p>
                </p>
            <Button variant="ghost"  className="outline outline-offset-1 outline-1 mr-4 bg-[#2e3552]" onClick={onClick}>
                <UserIcon className="text-black"/>
            </Button>
        </div>
     );
}
 
export default LoggedInBarHeader;