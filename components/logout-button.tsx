'use client'

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const LogOutButton = () => {
    return ( 
        <Button className="bg-blue-800" onClick={() => signOut({ callbackUrl : `${window.location.origin}/login`})}>
            Abmelden
        </Button>
     );
}
 
export default LogOutButton;