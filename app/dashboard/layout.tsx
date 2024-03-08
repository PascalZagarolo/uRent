import { Banknote, BarChartHorizontal, Construction, Signpost, Truck } from "lucide-react";
import Logo from "../profile/[profileId]/_components/u-rent-logo";

import SidebarMenu from "./[userId]/_components/sidebar-menu";
import UserVerification from "./[userId]/_components/verification";
import { db } from "@/utils/db";
import UrentDashboardLogo from "./[userId]/_components/urent-dashboard-logo";
import UrentDashboardLogoHeader from "./[userId]/_components/u-rent-logo-dashboard";
import SidebarDashboard from "./[userId]/_components/sidebar-dashboard";
import HeaderLogo from "../(dashboard)/_components/header-logo";
import getCurrentUser from "@/actions/getCurrentUser";

const DashboardLayout = async (
    { children }: { children: React.ReactNode },

) => {
    
    const currentUser = await getCurrentUser();
    const notifications = await db.notification.findMany({
        where : {
            userId : currentUser.id
        }
    })
    return (
        <div className="bg-[#404040]/10 h-full w-full  dark:bg-[#0F0F0F] ">
            <div className="relative top-0 w-full z-50">

                <HeaderLogo
                    currentUser={currentUser}
                    notifications={notifications} />



            </div>

            <div >
            
                {children}

            </div>

        </div>
    );
}

export default DashboardLayout;