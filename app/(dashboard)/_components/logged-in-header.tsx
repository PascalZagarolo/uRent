'use client'

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Link,  UserIcon } from "lucide-react";


interface LoggedInBarHeaderProps {
   
}

const LoggedInBarHeader: React.FC<LoggedInBarHeaderProps> = ({
    
}) => {

    
   
    return ( 
        <div className="flex justify-start ml-20 items-center mt-4">
            <p className="flex font-semibold mr-4 text-sm">
                    Willkommen zurück
                    <p> </p>
                </p>
            <Button variant="ghost"  className="outline outline-offset-1 outline-1 mr-4">
                <UserIcon className="text-blue-800"/>
            </Button>
        </div>
     );
}
 
export default LoggedInBarHeader;