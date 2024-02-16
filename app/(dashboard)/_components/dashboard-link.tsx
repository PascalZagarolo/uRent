'use client'

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DashboardLinkProps {
    currentUser : User;
}

const DashboardLink: React.FC<DashboardLinkProps> = ({
    currentUser
}) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/dashboard/${currentUser.id}`)
    }
    return ( 
        <div className="mt-2 lg:ml-0 ml-4">
            <Button  variant="ghost" 
            className="outline outline-offset-1 outline-1  bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-2 border-gray-300 hidden lg:block
            dark:bg-slate-800 dark:border-none dark:outline-none
            " 
            onClick={onClick} >
                    <BarChart3/>
            </Button>
            <BarChart3 className="text-white lg:hidden hover:cursor-pointer" onClick={onClick}/>
        </div>
     );
}
 
export default DashboardLink;