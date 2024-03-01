import React from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import MobileHeader from "./_components/mobile-header";
import { db } from "@/utils/db";

const DashboardLayout = async (
    { children } : { children : React.ReactNode }
) => {

    <meta
  name="Mieten auf uRent!"
  content="Kostenlos und schnell mieten auf uRent. Mieten Sie alles, was Sie brauchen."
    />



   const currentUser = await getCurrentUser();
   const notification = await db.notification.findMany({
    where : {
        userId : currentUser?.id
    }
   })

    return ( 
        <div className="bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen no-scrollbar ">
             
             <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                notifications={notification}
                />
             </div>
             
             <div className="">
             {children}
            </div>
        </div>
     );
}
 
export default DashboardLayout;