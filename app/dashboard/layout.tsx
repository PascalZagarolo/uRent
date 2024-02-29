import { Banknote, BarChartHorizontal, Construction, Signpost, Truck } from "lucide-react";
import Logo from "../profile/[profileId]/_components/u-rent-logo";

import SidebarMenu from "./[userId]/_components/sidebar-menu";
import UserVerification from "./[userId]/_components/verification";
import { db } from "@/utils/db";
import UrentDashboardLogo from "./[userId]/_components/urent-dashboard-logo";
import UrentDashboardLogoHeader from "./[userId]/_components/u-rent-logo-dashboard";
import SidebarDashboard from "./[userId]/_components/sidebar-dashboard";

const DashboardLayout = async (
    { children }: { children: React.ReactNode },

) => {



    return (
        <div className="bg-[#404040]/10 h-full w-full  dark:bg-[#0F0F0F] ">
            
           
                <div className="flex justify-center">
                <div className="mt-8">
                <SidebarDashboard/>
                </div>
                {children}

                </div>
          
        </div>
    );
}

export default DashboardLayout;