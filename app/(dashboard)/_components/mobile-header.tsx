'use client'


import SearchItem from "./search-item";
import MobileLogoDialog from "./mobile-logo-dialog";

import { useSession } from "next-auth/react";
import LoggedInBarHeader from "./logged-in-header";

import { User, Notification } from "@prisma/client";
import MobileFilterSheet from './mobile-filter-sheet';

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
        <div className="bg-[#1f2332] h-[140px] w-full">
            <div className="flex items-center">
            <div className="flex items-center ml-2 w-full">
                <div className="mr-4">
                <MobileFilterSheet />
                </div>
            <MobileLogoDialog/>
                
                <div className="w-full">
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
        <div className="w-full px-4">
                    <SearchItem/>
                </div>
        </div>
     );
}
 
export default MobileHeader;