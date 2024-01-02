import { Banknote, Construction, Signpost } from "lucide-react";
import Logo from "../profile/[profileId]/_components/u-rent-logo";
import UrentDashboardLogo from "./[userId]/_components/urent-dashboard-logo";

const DashboardLayout = (
     {children}  : { children : React.ReactNode}
) => {
    return (
        <div className="flex h-screen bg-gray-200 border border-black">
           
            <div className="w-64 bg-blue-800/80">
                <div className="flex items-center justify-center mt-8">
                    <span className="text-white text-2xl font-semibold">
                        <UrentDashboardLogo/>
                    </span>
                </div>
                <nav className="mt-10">
                    <a href="#" className="py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white block border border-white">
                        <Banknote className=""/> Bestellungen
                    </a>
                    <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white border border-white">
                        <Signpost/> offene Anzeigen</a>
                        <a href="#" className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white border border-white">
                        <Construction/> Entwürfe</a>
                    
                </nav>
            </div>

            
            <div className="flex-1 p-10 bg-white">
                {children}
            </div>
        </div>

    );
}

export default DashboardLayout;