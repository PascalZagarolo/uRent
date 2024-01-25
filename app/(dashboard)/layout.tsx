import { getServerSession } from "next-auth";
import React from "react";


import HeaderLogo from "./_components/header-logo";
import Header from "./_components/header";
import getCurrentUser from "../../actions/getCurrentUser";
import MobileHeader from "./_components/mobile-header";

const DashboardLayout = async (
    { children } : { children : React.ReactNode }
) => {

   const currentUser = await getCurrentUser();

    return ( 
        <div className="bg-[#404040]/10 h-screen ">
             <div className="hidden sm:block">
             <HeaderLogo
                currentUser={currentUser}
                />
             </div>
             <div className="sm:hidden">
                <MobileHeader/>
             </div>
             
             <div className="h-screen">
                {children}
            </div>
        </div>
     );
}
 
export default DashboardLayout;