import React from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import MobileHeader from "./_components/mobile-header";
import CookiesDialog from "@/components/cookies";
import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notification } from "@/db/schema";


const DashboardLayout = async (
    { children } : { children : React.ReactNode }
) => {

    <meta
  name="Mieten auf uRent!"
  content="Kostenlos und schnell mieten auf uRent. Mieten Sie alles, was Sie brauchen."
    />



    const currentUser = await getCurrentUser();
    
    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(notification.userId, currentUser?.id)
        )
    
    })

    return ( 
        <div className="bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen no-scrollbar">
                        <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                foundNotifications = {foundNotifications}
                />  
             </div>
             <div>
                {children} 
                
            </div>
        </div>
     );
}
 
export default DashboardLayout;