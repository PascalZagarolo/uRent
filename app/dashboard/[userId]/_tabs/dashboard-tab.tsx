import { EyeIcon, TrendingUp, Truck } from "lucide-react";
import InseratCategoriesChart from "../(routes)/_components/_charts/inserat-category.chart";
import { inserat } from "@/db/schema";

interface DashboardTabProps {
    views : number;
    foundInserate : typeof inserat.$inferSelect[] | any[];
}

const DashboardTab = ({ views, foundInserate } : DashboardTabProps) => {
    return (
        <div className="sm:p-4 p-2 mt-4  rounded-lg ">
            <h3 className="dark:text-gray-100 text-2xl font-semibold flex items-center">
                <TrendingUp className="mr-4" /> Übersicht  <p className="ml-4 text-lg"> </p>
            </h3>

            <div className="w-full dark:bg-[#141414] p-4 sm:space-y-0 space-y-4  sm:flex justify-evenly mt-2 rounded-md">
                <div className="text-xl font-semibold flex p-4 border dark:border-none dark:bg-[#1C1C1C] rounded-md">
                    <Truck className="h-6 w-6 mr-2" />
                    {foundInserate.length} <p className="font-medium ml-2"> {foundInserate.length === 1 ? "Inserat" : "Inserate"} </p>
                </div>
                <div className="text-xl font-semibold flex sm:mr-2 p-4 border dark:border-none dark:bg-[#1C1C1C] rounded-md">
                    <EyeIcon className="h-6 w-6 mr-2" />   {views ? views : 0} <p className="font-medium ml-2"> Ansichten </p>
                </div>
            </div>

            <div className="mt-4">
                <div className="w-full h-full">
                    <InseratCategoriesChart 
                    foundInserate={foundInserate}
                    />
                </div>
            </div>

        </div>
    );
}

export default DashboardTab;