'use client'


import SearchItem from "./search-item";
import MobileLogoDialog from "./mobile-logo-dialog";
import getCurrentUser from "@/actions/getCurrentUser";
import { useSession } from "next-auth/react";
import LoggedInBarHeader from "./logged-in-header";
import { db } from "@/utils/db";
import { User, Notification } from "@prisma/client";

interface MobileHeaderProps {
    currentUser : User;
    notifications : Notification[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
    currentUser,
    notifications
}) => {

    
    const { data: session, status } = useSession();

    
    return ( 
        <div className="bg-[#1f2332] h-[100px] w-full flex items-center">
            <div className="flex items-center ml-2 w-full">
            <MobileLogoDialog/>
                <div className="ml-4 w-full">
                    <SearchItem/>
                </div>
                <div className="w-2/6">
                {
                        status === 'unauthenticated' || !currentUser ? (
                            <div>
                            </div>
                        ) : (
                            <div className="flex w-full ml-auto ">
                                <LoggedInBarHeader
                                    currentUser={currentUser}
                                    notifications = {notifications}
                                />
                                
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
     );
}
 
export default MobileHeader;