'use client'

import { CarFrontIcon, TruckIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import PkwSearchComponents from "./pkw-search-components";


const CategoryOverview = () => {

    const params = useSearchParams();
    const currentCategory = params.get("category");


    return ( 
        <>
        {currentCategory && (
            <div className="p-2 mr-2 ml-2 bg-[#1B1F2C] rounded-md">
                <div className="w-full flex justify-start items-center">
                {
                    {
                        "PKW" : <CarFrontIcon className="h-6 w-6 mr-2" />,
                        "LKW" : <TruckIcon className="h-6 w-6 mr-2" />,
                        "TRAILOR" : <RiCaravanLine className="h-6 w-6 mr-2" />,
                        "TRANSPORT" : <PiVanFill className="h-6 w-6 mr-2" />,
                    }[currentCategory]
                }
               
                <div className="ml-2 text-lg">
                {
                    {
                        "PKW" : "Pkw",
                        "LKW" : "Lkw",
                        "TRAILOR" : "Anhänger",
                        "TRANSPORT" : "Transporter",
                    }[currentCategory]
                }
                </div>
            </div>
            
            </div>
        )}
        <div className="p-2">
        {
                    {
                        "PKW" : <PkwSearchComponents />,
                        "LKW" : "Lkw",
                        "TRAILOR" : "Anhänger",
                        "TRANSPORT" : "Transporter",
                    }[currentCategory]
                }
        </div>
        </>
     );
}
 
export default CategoryOverview;