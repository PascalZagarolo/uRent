'use client'

import { Banknote, BarChart4, Construction, LucideIcon } from "lucide-react";

import DashboardOptions from "./dashboard-options";
import { useParams } from "next/navigation";

const SideBarMenu = () => {

    const params = useParams();

    const menuOptions: Record<string, string>[]  = [
        {"Meine Inserate" : "inserate"},
        {"Meine Buchungen" : "bookings"},
        {"Analytics" : "analytics"}
    ]

    const menuMap : Record<string, LucideIcon> = {
        "Meine Inserate" : Construction,
        "Meine Buchungen" : Banknote,
        "Analytics" : BarChart4,

    }

    const userId = params.userId;


    return ( 
        <div>
            <div>
                <h3 className="flex  font-bold text-base ml-12">
                    Menü
                </h3>
            </div>
            <div className="mt-8">
                {menuOptions.map((option, index) => (
                   
                   <DashboardOptions
                   key={option.toString()}
                   label={Object.keys(option)![0]}
                   icon = {menuMap[Object.keys(option)[0]]}
                   link = {Object.values(option)[0]}
                   userId = {userId[0]}
                   />
                   
                  
                ))}
            </div>
        </div>
     );
}
 
export default SideBarMenu;