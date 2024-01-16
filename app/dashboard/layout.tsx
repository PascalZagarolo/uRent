import { Banknote, BarChartHorizontal, Construction, Signpost, Truck } from "lucide-react";
import Logo from "../profile/[profileId]/_components/u-rent-logo";
import UrentDashboardLogo from "./[userId]/_components/urent-dashboard-logo";
import SidebarMenu from "./[userId]/_components/sidebar-menu";
import UserVerification from "./[userId]/_components/verification";
import { db } from "@/utils/db";

const DashboardLayout = async (
    { children }: { children: React.ReactNode },
    
) => {
    
    

    return (
        <div className="bg-[#404040]/10 h-full overflow-hidden">

            <div className="flex h-full">
                <div className="bg-[#1f2332] w-64 h-screen border-r border-black">
                    <div className="flex justify-center">
                        <h3 className="flex justify-start items-center py-4 mt-2  text-3xl font-semibold text-white hover:cursor-pointer">
                            <p className="text-sm"></p> <Truck className=" mr-2" />
                            <div className="text-[#4e5889] font-font-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">u</div>
                            <p className="text-[#eaebf0] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">Rent</p>
                        </h3>
                    </div>
                    <p className="flex justify-center text-xl font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)] text-gray-200 bg-[#13151e] p-4">
                       <BarChartHorizontal className="h-6 w-6 mr-2"/> Dashboard
                    </p>
                    <div className="mt-4">
                        <UserVerification/>
                    </div>
                    <div className="mt-16 h-full ">
                        <SidebarMenu />
                    </div>
                </div>
                <div className="flex-1 p-8 bg-[#404040]/10">

                {children}

                </div>
            </div>
        </div>

    );
}

export default DashboardLayout;