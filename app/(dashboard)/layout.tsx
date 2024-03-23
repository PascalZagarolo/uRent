import React from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import MobileHeader from "./_components/mobile-header";


const DashboardLayout = async (
    { children } : { children : React.ReactNode }
) => {

    <meta
  name="Mieten auf uRent!"
  content="Kostenlos und schnell mieten auf uRent. Mieten Sie alles, was Sie brauchen."
    />



    const currentUser = await getCurrentUser();
 

    return ( 
        <div className="bg-[#404040]/10 dark:bg-[#0F0F0F] min-h-screen no-scrollbar ">
                        <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                
                />  
             </div>
             <div>
                {children} 
            </div>
        </div>
     );
}
 
export default DashboardLayout;