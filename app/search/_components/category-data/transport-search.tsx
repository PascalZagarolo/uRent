import LkwLoadingSearch from "../_lkw/lkw-loading-search";
import PkwBrandSearch from "../_pkw/pkw-brand-search";
import PkwDoorsSearch from "../_pkw/pkw-doors-search";
import PkwFuelSearch from "../_pkw/pkw-fuel-search";
import PkwPowerSearch from "../_pkw/pkw-power-search";
import PkwSeatsSearch from "../_pkw/pkw-seats-search";
import PkwTransmissionSearch from "../_pkw/pkw-transmission-search";
import PkwTypeSearch from "../_pkw/pkw-type-search";

const TransportSearch = () => {
    return (
        <div className="w-full">
            <div className="w-full flex gap-x-2">
                <div className="w-1/3">
                    <LkwLoadingSearch />
                </div>
                <div className="w-1/3">
                    <PkwSeatsSearch />
                </div>
                <div className="w-1/3">
                    <PkwFuelSearch />
                </div>
            </div>
            <div className="w-full flex gap-x-2 mt-4">
                <div className="w-1/3">
                    <PkwTransmissionSearch />
                </div>
                <div className="w-1/3">
                <PkwDoorsSearch />
                </div>
                <div className="w-1/3">
                    
                </div>
            </div>
            <div className="w-full flex gap-x-2 mt-4">
                <div className="w-1/3">
                    
                </div>
                <div className="w-1/3">

                </div>
                <div className="w-1/3">

                </div>
            </div>
        </div>
    );
}

export default TransportSearch;