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
        <div className="bg-[#404040]/10 min-h-screen no-scrollbar ">
             <div className="hidden sm:block top-0  w-full  ">
             <HeaderLogo
                currentUser={currentUser}
                />
             </div>
             <div className="sm:hidden">
                <MobileHeader/>
             </div>
             
             <div className="overflow-hidden h-full ">
             {children}
            </div>
        </div>
     );
}
 
export default DashboardLayout;