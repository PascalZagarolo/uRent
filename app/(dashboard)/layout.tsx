import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../utils/auth";

import HeaderLogo from "./_components/header-logo";
import Header from "./_components/header";

const DashboardLayout = async (
    { children } : { children : React.ReactNode }
) => {

    const session = await getServerSession(authOptions);

    return ( 
        <div>
             <div className="w-full">
                <HeaderLogo/>
                <Header/>
             </div>
            <div>
                {children}
            </div>
        </div>
     );
}
 
export default DashboardLayout;