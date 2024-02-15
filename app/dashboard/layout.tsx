import { Banknote, BarChartHorizontal, Construction, Signpost, Truck } from "lucide-react";
import Logo from "../profile/[profileId]/_components/u-rent-logo";

import SidebarMenu from "./[userId]/_components/sidebar-menu";
import UserVerification from "./[userId]/_components/verification";
import { db } from "@/utils/db";
import UrentDashboardLogo from "./[userId]/_components/urent-dashboard-logo";
import UrentDashboardLogoHeader from "./[userId]/_components/u-rent-logo-dashboard";

const DashboardLayout = async (
    { children }: { children: React.ReactNode },
    
) => {
    
    

    return (
        <div className="bg-[#404040]/10 h-full overflow-hidden">
    <div className="flex min-h-full">
        <div className="bg-[#151821] w-64 h-screen border-r border-black fixed">
            <UrentDashboardLogoHeader/>
            <p className="flex justify-center text-xl font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)] text-gray-200 bg-[#1b1e2b] p-4">
               <BarChartHorizontal className="h-6 w-6 mr-2"/> Dashboard
            </p>
            <div className="mt-4">
                <UserVerification/>
            </div>
            <div className="mt-16 h-full">
                <SidebarMenu />
            </div>
        </div>
        <div className="flex-1 p-8 bg-[#404040]/10 ml-64"> {/* Adjusted ml-48 to ml-64 */}
            {children}
        </div>
    </div>
</div>


    );
}

export default DashboardLayout;