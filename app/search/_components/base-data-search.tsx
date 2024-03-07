'use client'

import { Separator } from "@/components/ui/separator";
import LocationSearch from "./base-date/location-search";
import DateSearch from "./base-date/date-search";

const BaseDataSearch = () => {
    return ( 
        <div>
            <h3 className="font-semibold text-md flex items-center">
                Basisdaten
                <Separator 
                className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"
                
                />
            </h3>
            <div className="w-full flex mt-4 space-x-4">
                <div className="w-1/3">
<LocationSearch />
                </div>
                <div className="w-1/3">
<DateSearch />
                </div>
                <div className="w-1/3">
1
                </div>
            </div>
        </div>
     );
}
 
export default BaseDataSearch;