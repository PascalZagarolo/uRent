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
        <div className="flex justify-start ml-20 items-center mt-4">
            <p className="flex font-semibold mr-4 text-sm">
                    Willkommen zurück
                    <p className="ml-1 font-bold  text-blue-800 mr-4">{currentUser.name}</p>
                </p>
            <Button variant="ghost"  className="outline outline-offset-1 outline-1 mr-4" onClick={onClick}>
                <UserIcon className="text-blue-800"/>
            </Button>
        </div>
     );
}
 
export default LoggedInBarHeader;