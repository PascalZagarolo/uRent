'use client'

import LocationSearch from "./base-date/location-search";
import DateSearch from "./base-date/date-search";
import PriceSearch from "./base-date/price-search";
import TitleSearch from "./base-date/title-search";

const BaseDataSearch = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-5">
                Basisdaten
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                <div className="bg-[#18181f]/70 rounded-lg p-4 hover:bg-[#18181f] transition-colors">
                    <TitleSearch />
                </div>
                <div className="bg-[#18181f]/70 rounded-lg p-4 hover:bg-[#18181f] transition-colors">
                    <LocationSearch />
                </div>
                <div className="bg-[#18181f]/70 rounded-lg p-4 hover:bg-[#18181f] transition-colors">
                    <PriceSearch />
                </div>
            </div>
        </div>
    );
}

export default BaseDataSearch;