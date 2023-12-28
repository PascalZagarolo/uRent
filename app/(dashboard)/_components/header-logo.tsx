'use client'

import { Button } from "@/components/ui/button";
import LoginBarHeader from "./login-bar-header";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoggedInBarHeader from "./logged-in-header";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";

interface HeaderProps {
    currentUser : User;
}

const Header: React.FC<HeaderProps> =  ({
    currentUser
}) => {

    const session = useSession();

    const onClick = () => {
        console.log(currentUser)
    }

    
    return ( 
        <div className="flex justify-center  w-full items-center">
            <Button variant="ghost">
                <Link href="/">
                <h3 className="text-4xl flex justify-center mt-4 font-semibold"> 
                <p className="text-blue-800 font-bold">u</p> Rent {currentUser?.name}
            </h3>
                </Link>
            </Button>
            
            <div className="items-center">
                <Button onClick={onClick}>
                    KLICK
                </Button>
                {
                    !session ? (
                        <LoginBarHeader/>
                    ) : (
                        <div>
                           <LoggedInBarHeader
                           
                           />
                        </div>
                    )
                }
                
            </div>
        </div>
     );
}
 
export default Header;