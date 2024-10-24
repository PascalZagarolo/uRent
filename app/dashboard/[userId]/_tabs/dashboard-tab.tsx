import { EyeIcon, TrendingUp, Truck, TruckIcon } from "lucide-react";
import InseratCategoriesChart from "../(routes)/_components/_charts/inserat-category.chart";
import { inserat } from "@/db/schema";
import LatestInserate from "../(routes)/_components/latest-inserate";
import RentalManagementAd from "../(routes)/_components/urent-rms";
import DashboardTips from "../(routes)/_components/dashboard-tips";


interface DashboardTabProps {
    views : number;
    foundInserate : typeof inserat.$inferSelect[] | any[];
}

const DashboardTab = ({ views, foundInserate } : DashboardTabProps) => {

    const releasedInserate = foundInserate?.filter((inserat) => inserat?.isPublished)?.length;
    
    const nonReleased = foundInserate?.length - releasedInserate;

    return (
        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
            {/* <RentalManagementAd /> */}
            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                <TrendingUp className="mr-4" /> Übersicht  <p className="ml-4 text-lg"> </p>
            </h3>

            <div className="w-full flex flex-row items-center space-x-4 mt-4">
                <div className="w-1/3 bg-[#222222] rounded-md shadow-lg flex-col p-4">
                    <div className="p-1 bg-emerald-600 rounded-md w-2"/>
                        
                    
                    <div className="text-base font-semibold mt-2">
                        {releasedInserate}
                    </div>
                    <div className="text-sm text-gray-200 font-semibold">
                        {releasedInserate === 1 ? "Inserat" : "Inserate"} veröffentlicht
                    </div>
                </div>

                <div className="w-1/3 bg-[#222222] rounded-md shadow-lg flex-col p-4">
                    <div className="p-1 bg-gray-600 rounded-md w-2"/>
                        
                    
                    <div className="text-base font-semibold mt-2">
                        {nonReleased}
                    </div>
                    <div className="text-sm text-gray-200 font-semibold">
                        {nonReleased === 1 ? "Entwurf" : "Entwürfe"} gespeichert
                    </div>
                </div>

                <div className="w-1/3 bg-[#222222] rounded-md shadow-lg flex-col p-4">
                    <div className="p-1 bg-indigo-800 rounded-md w-2"/>
                        
                    
                    <div className="text-base font-semibold mt-2">
                        {foundInserate?.length}
                    </div>
                    <div className="text-sm text-gray-200 font-semibold">
                        {foundInserate?.length === 1 ? "Inserat" : "Inserate"} erstellt
                    </div>
                </div>
            </div>

            <div className="mt-4 flex sm:flex-row flex-col sm:space-y-0 space-y-8">
                <div className="sm:w-1/2 w-full h-full">
                    <InseratCategoriesChart 
                    foundInserate={foundInserate}
                    />
                </div>
                <div className="sm:w-1/2 w-full h-full">
                    <LatestInserate 
                    foundInserate={foundInserate}
                    />
                </div>
            </div>
            <div className="mt-16">
                <DashboardTips />
            </div>
        </div>
    );
}

export default DashboardTab;