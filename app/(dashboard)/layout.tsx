import { getServerSession } from "next-auth";
import React from "react";


import HeaderLogo from "./_components/header-logo";
import Header from "./_components/header";
import getCurrentUser from "../actions/getCurrentUser";

const DashboardLayout = async (
    { children } : { children : React.ReactNode }
) => {

   const currentUser = await getCurrentUser();

    return ( 
        <div>
             <div className="w-full">
                <HeaderLogo
                currentUser={currentUser}
                />
                
             </div>
             
            <div className="h-full">
                {children}
            </div>
        </div>
     );
}
 
export default DashboardLayout;