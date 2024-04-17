'use client'


import SearchItem from "./search-item";
import MobileLogoDialog from "./mobile-logo-dialog";


import LoggedInBarHeader from "./logged-in-header";


import MobileFilterSheet from './mobile-filter-sheet';
import { usePathname } from "next/navigation";
import DashboardSheet from "./dashboard-sheet";

import MobileLoginButton from "./mobile-login-button";
import { notification, userTable } from '../../../db/schema';

interface MobileHeaderProps {
    currentUser: typeof userTable.$inferSelect;
    foundNotifications : typeof notification.$inferSelect[];
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
    currentUser,
    foundNotifications,
}) => {


    

    const pathname = usePathname();

    const isDashboard = pathname.includes('dashboard');


    return (
        <div className="bg-[#1f2332] h-[140px] w-full">
            <div className="flex items-center w-full">
                <div className="flex items-center ml-2 w-full">
                    <div className="mr-4">
                        {
                            isDashboard ? (
                                <DashboardSheet
                                    currentUserId={currentUser?.id}
                                />
                            ) : (
                                <MobileFilterSheet />
                            )
                        }
                    </div>
                    <MobileLogoDialog />

                    <div className="w-full">
                        {
                            status === 'unauthenticated' || !currentUser ? (
                                <div className="w-full flex justify-end px-4">
                                    <MobileLoginButton />
                                </div>
                            ) : (
                                <div className="flex w-full ml-auto ">
                                    <LoggedInBarHeader
                                        currentUser={currentUser}
                                        foundNotifications={foundNotifications}
                                    />

                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
            <div className="w-full px-4">
                <SearchItem />
            </div>
        </div>
    );
}

export default MobileHeader;