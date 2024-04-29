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
import { useSavedSearchParams } from "@/store";
import { CategoryEnumRender } from "@/db/schema";



const CategoryOverview = () => {

    const params = useSearchParams();
    

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    //@ts-ignore
    const currentCategory : typeof CategoryEnumRender = params.get("category") || currentObject["thisCategory"];

    return ( 
        <>
        {//@ts-ignore
        (currentCategory || currentObject["thisCategory"]) && (
            <div className="">
            <ConditionsSearchComponent />
            </div>
        )}
        {//@ts-ignore
        (currentCategory || currentObject["thisCategory"]) && (
            
            <div className="p-2  bg-[#1B1F2C]  mt-4 text-gray-200">
                
                <div className="w-full flex justify-start items-center">
                {
                    {
                        "PKW" : <CarFrontIcon className="h-6 w-6 mr-2" />,
                        "LKW" : <TruckIcon className="h-6 w-6 mr-2" />,
                        "TRAILER" : <RiCaravanLine className="h-6 w-6 mr-2" />,
                        "TRANSPORT" : <PiVanFill className="h-6 w-6 mr-2" />,
                        //@ts-ignore
                    }[currentCategory]
                }
               
                <div className="ml-2 text-lg text-gray-200">
                {
                    {
                        "PKW" : "Pkw",
                        "LKW" : "Lkw",
                        "TRAILER" : "Anhänger",
                        "TRANSPORT" : "Transporter",
                        //@ts-ignore
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
                       
                        "TRAILER" : <TrailerSearchComponent />,
                       
                        "TRANSPORT" : <TransportSearchComponent />,
                       
                        //@ts-ignore
                    }[currentCategory]
                }
        </div>
        
        </>
     );
}
 
export default CategoryOverview;