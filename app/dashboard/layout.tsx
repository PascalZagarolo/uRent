import { Banknote, Construction, Signpost } from "lucide-react";
import Logo from "../profile/[profileId]/_components/u-rent-logo";
import UrentDashboardLogo from "./[userId]/_components/urent-dashboard-logo";
import SidebarMenu from "./[userId]/_components/sidebar-menu";

const DashboardLayout = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className="bg-[#404040]/10 h-screen">

            <div className="flex">
                <div className="bg-white w-64 h-screen border-r border-black">
                    <div>
                        <h3 className="flex justify-center p-8">
                            uRent
                        </h3>
                    </div>
                    <div className="mt-16 h-full">
                        <SidebarMenu/>
                    </div>
                </div>
                <div className="flex-1 p-8">
                   
                {children}

                </div>
            </div>
        </div>

    );
}

export default DashboardLayout;