'use client'

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const LogOutButton = () => {
    return ( 
        <Button className="bg-[#e1dfdf] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-2 border-gray-900" variant="ghost" onClick={() => signOut({ callbackUrl : `${window.location.origin}/login`})}>
            Abmelden
        </Button>
     );
}
 
export default LogOutButton;