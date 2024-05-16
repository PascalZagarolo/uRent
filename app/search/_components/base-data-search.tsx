'use client'

import { Separator } from "@/components/ui/separator";
import LocationSearch from "./base-date/location-search";
import DateSearch from "./base-date/date-search";
import PriceSearch from "./base-date/price-search";
import TitleSearch from "./base-date/title-search";

const BaseDataSearch = () => {
    return (
        <div>
            <h3 className="font-semibold text-md flex items-center dark:text-gray-100">
                Basisdaten
                <Separator
                    className="h-[0.5px] dark:bg-gray-100/20 w-2/3 ml-6"

                />
            </h3>
            <div className="w-full sm:flex mt-4 sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="sm:w-1/3">
                    <TitleSearch />
                </div>
                <div className="sm:w-1/3">
                <LocationSearch />
                </div>
                <div className="sm:w-1/3">
                    <PriceSearch />
                </div>
            </div>
        </div>
    );
}

export default BaseDataSearch;