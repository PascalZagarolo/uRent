'use client'

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const MobileLoginButton = () => {

    const router = useRouter();
    return ( 
        <div className="flex flex-row items-center space-x-4">
         <Button className="bg-slate-800 dark:border-none  hover:bg-slate-700 text-gray-100" onClick={() => {router.push("/login")}} >
           <LogInIcon className="h-4 w-4 mr-2" />Login 
        </Button>
       
        <Button className="bg-slate-800 dark:border-none  hover:bg-slate-700 text-gray-100 text-xs" onClick={() => {router.push("/register")}} >
        <LogInIcon className="h-4 w-4 mr-2" />Registrieren 
     </Button>
        </div>
     );
}
 
export default MobileLoginButton;