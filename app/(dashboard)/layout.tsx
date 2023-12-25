import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../utils/auth";

const DashboardLayout = async (
    { children } : { children : React.ReactNode }
) => {

    const session = await getServerSession(authOptions);

    return ( 
        <div>
             { session ? (
                <h3> Du bist eingeloggt </h3>
             ) : (
                <h3> Du bist nicht eingeloggt</h3>
             )}
            <div>
                {children}
            </div>
        </div>
     );
}
 
export default DashboardLayout;