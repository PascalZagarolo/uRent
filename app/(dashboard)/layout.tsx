import React, { cache } from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import MobileHeader from "./_components/mobile-header";

import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { notification } from "@/db/schema";
import HeaderLogo from "./_components/header-logo";
import AdsComponent from "@/components/ad-component";


const DashboardLayout = cache(async (
    { children }: { children: React.ReactNode }
) => {

    <meta
        name="Mieten auf uRent!"
        content="Kostenlos und schnell mieten auf uRent. Mieten Sie Pkw, Lkw, Transport und Anhänger."
    />



    const currentUser = await getCurrentUser();

    

    const foundNotifications = await db.query.notification.findMany({
        where: (
            eq(notification.userId, currentUser?.id)
        )

    })



    return (
        <div className="bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen no-scrollbar">
            <div className="sm:hidden">
                <MobileHeader
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>
            <div className="relative top-0 w-full z-50">

                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                />
            </div>

      
                
               
               <div className="w-full">
                    {children}
                </div>
                
                
          

        </div>
    );
});

export default DashboardLayout;