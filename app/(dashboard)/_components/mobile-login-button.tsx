'use client'

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const MobileLoginButton = () => {

    const router = useRouter();

    return ( 
        <Button className="bg-slate-800 dark:border-none  hover:bg-slate-700 text-gray-100" onClick={() => {router.push("/login")}} >
           <LogInIcon className="h-4 w-4 mr-2" />Login 
        </Button>
     );
}
 
export default MobileLoginButton;