'use client'

import { Button } from "@/components/ui/button";
import LoginBarHeader from "./login-bar-header";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LoggedInBarHeader from "./logged-in-header";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import DashboardLayout from "../layout";
import DashboardLink from "./dashboard-link";

interface HeaderProps {
    currentUser : User;
}

const Header: React.FC<HeaderProps> =  ({
    currentUser
}) => {

    const { data : session, status } = useSession();

    

    
    return ( 
        <div className="flex justify-center  w-full items-center">
            <Button variant="ghost">
                <Link href="/">
                <h3 className="text-4xl flex justify-center mt-4 font-semibold"> 
                <p className="text-blue-800 font-bold">u</p> Rent 
            </h3>
                </Link>
            </Button>
            
            <div className="items-center">
                
                {
                    status === 'unauthenticated' ? (
                        <LoginBarHeader
                        
                        />
                    ) : (
                        <div className="flex items-center">
                           <LoggedInBarHeader
                           currentUser = { currentUser }
                           />
                           <div className="mt-4">
                                <DashboardLink
                                currentUser = {currentUser}
                                />
                            </div>
                        </div>
                    )
                }
                
            </div>
        </div>
     );
}
 
export default Header;