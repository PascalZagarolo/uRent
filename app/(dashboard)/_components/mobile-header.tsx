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
        <div className="bg-[#1f2332] h-[100px]  flex items-center">
            <div className="flex items-center ml-2">
            <MobileLogoDialog/>
                <div className="flex justify-center ml-4">
                    <SearchItem/>
                </div>
                <div>
                {
                        status === 'unauthenticated' || !currentUser ? (
                            <>
                            </>
                        ) : (
                            <div className="flex ml-auto ">
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