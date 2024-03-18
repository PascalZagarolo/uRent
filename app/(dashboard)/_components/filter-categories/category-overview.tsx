'use client'

import { CarFrontIcon, TruckIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PiVanFill } from "react-icons/pi";
import { RiCaravanLine } from "react-icons/ri";
import PkwSearchComponents from "./pkw-search-components";
import ConditionsSearchComponent from "./conditions-search-component";
import LkwSearchComponent from "./lkw-search-component";
import TrailerSearchComponent from "./trailer-search-component";
import TransportSearchComponent from "./transport-search-component";



const CategoryOverview = () => {

    const params = useSearchParams();
    const currentCategory = params.get("category");


    return ( 
        <>
        {currentCategory && (
            <div className="">
            <ConditionsSearchComponent />
            </div>
        )}
        {currentCategory && (
            
            <div className="p-2 mr-2 ml-2 bg-[#1B1F2C] rounded-md mt-4 text-gray-200">
                
                <div className="w-full flex justify-start items-center">
                {
                    {
                        "PKW" : <CarFrontIcon className="h-6 w-6 mr-2" />,
                        "LKW" : <TruckIcon className="h-6 w-6 mr-2" />,
                        "TRAILOR" : <RiCaravanLine className="h-6 w-6 mr-2" />,
                        "TRANSPORT" : <PiVanFill className="h-6 w-6 mr-2" />,
                    }[currentCategory]
                }
               
                <div className="ml-2 text-lg text-gray-200">
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
        
           
                
           
        
        
        <div className="p-2 ">
        {
                    {
                        "PKW" : <PkwSearchComponents />,
                        
                       
                       "LKW" : <LkwSearchComponent />,
                       
                        "TRAILOR" : <TrailerSearchComponent />,
                       
                        "TRANSPORT" : <TransportSearchComponent />,
                       
                        
                    }[currentCategory]
                }
        </div>
        
        </>
     );
}
 
export default CategoryOverview;