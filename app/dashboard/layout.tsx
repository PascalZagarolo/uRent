
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import MobileHeader from "../(dashboard)/_components/mobile-header";
import { eq, sql } from "drizzle-orm";
import db from "@/db/drizzle";
import { notification } from "@/db/schema";
import Footer from "../(dashboard)/_components/footer";
import { redirect } from "next/navigation";
import getCurrentUserWithNotifications from "@/actions/getCurrentUserWithNotifications";


const DashboardLayout = async (
    { children }: { children: React.ReactNode },

) => {
    
    const currentUser = await getCurrentUserWithNotifications();

    if(!currentUser) {
        redirect("/")
    }

    return (
        <div className="bg-[#404040]/10 h-full w-full  dark:bg-[#0F0F0F] ">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={currentUser?.notifications}
                    />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                foundNotifications = {currentUser?.notifications}       
                />
             </div>
            <div>       
                {children}
            </div>
            <div>
            <Footer />
            </div>
            
        </div>
    );
}

export default DashboardLayout;