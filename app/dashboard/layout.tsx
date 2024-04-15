
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";
import MobileHeader from "../(dashboard)/_components/mobile-header";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { notification } from "@/db/schema";
import Footer from "../(dashboard)/_components/footer";

const DashboardLayout = async (
    { children }: { children: React.ReactNode },

) => {
    
    const currentUser = await getCurrentUser();

    const foundNotifications = await db.query.notification.findMany({
        where : (
            eq(notification.userId, currentUser?.id)
        )
    
    })
    
    return (
        <div className="bg-[#404040]/10 h-full w-full  dark:bg-[#0F0F0F] ">
            <div className="relative top-0 w-full z-50">
                <HeaderLogo
                    currentUser={currentUser}
                    foundNotifications={foundNotifications}
                    />
            </div>
            <div className="sm:hidden">
                <MobileHeader
                currentUser={currentUser}
                foundNotifications = {foundNotifications}       
                />
             </div>
            <div >       
                {children}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default DashboardLayout;