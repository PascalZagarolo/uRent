'use client'

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ArrowRight, LogOut } from "lucide-react";

const LogOutButton = () => {
    return ( 
        <>
            <Button className="hidden bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 2xl:block border-2 border-gray-900" variant="ghost" onClick={() => signOut({ callbackUrl : `${window.location.origin}/login`})}>
            <p className="hidden lg:block">Abmelden</p>
            
        </Button>
        <p className="2xl:hidden mr-2 text-white hover:cursor-pointer"> <LogOut/> </p>
        </>
        


     );
}
 
export default LogOutButton;