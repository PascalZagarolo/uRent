import InitialSearch from "../_every/initial-search";
import LoadingSizeSearch from "../_every/loading-size-search";
import LoadingVolumeSearch from "../_every/loading-volume-search";
import LkwApplicationSearch from "../_lkw/lkw-application-search";
import LkwBrandSearch from "../_lkw/lkw-brand-search";
import LkwDriveSearch from "../_lkw/lkw-drive-search";
import LkwLoadingSearch from "../_lkw/lkw-loading-search";
import LkwSeatsSearch from "../_lkw/lkw-seats-search";
import LkwWeightClassSearch from "../_lkw/lkw-weightclass-search";
import PkwFuelSearch from "../_pkw/pkw-fuel-search";
import PkwPowerSearch from "../_pkw/pkw-power-search";
import PkwTransmissionSearch from "../_pkw/pkw-transmission-search";
import TrailerAxisSearch from "../_trailer/trailer-axis";

const LkwSearch = () => {
    return (
        <div className="w-full">
            <div className="w-full sm:flex sm:gap-x-2 space-y-2 sm:space-y-0">
                <div className="sm:w-1/3">
                    <LkwBrandSearch />
                </div>
                <div className="sm:w-1/3">
                    <LkwApplicationSearch />
                </div>
                <div className="sm:w-1/3">
                    <LkwLoadingSearch />
                </div>
            </div>
            <div className="w-full sm:flex sm:gap-x-2 mt-4 space-y-2 sm:space-y-0">
                <div className="sm:w-1/3">
                    <LkwDriveSearch />
                </div>
                <div className="sm:w-1/3">
                    <LkwWeightClassSearch />
                </div>
                <div className="sm:w-1/3">
                    <LkwSeatsSearch />
                </div>
            </div>
            <div className="w-full sm:flex sm:gap-x-2 mt-4 space-y-2 sm:space-y-0">
                <div className="sm:w-1/3">
                    <TrailerAxisSearch />
                </div>
                <div className="sm:w-1/3">
                    <PkwTransmissionSearch />
                </div>
                <div className="sm:w-1/3">
                <PkwFuelSearch />
                </div>
            </div>
            <div className="w-full sm:flex sm:gap-x-2 space-y-2 sm:space-y-0 mt-4">
                <div className="sm:w-1/3">
                <InitialSearch />
                </div>
                <div className="sm:w-1/3">
                
                </div>
                <div className="sm:w-1/3">

                </div>
            </div>
            <div className="w-full sm:flex sm:gap-x-2 mt-4 space-y-4 sm:space-y-0">
                <div className="sm:w-1/3">
                    <PkwPowerSearch />
                </div>
                <div className="sm:w-1/3">
                    <LoadingVolumeSearch />
                </div>
                <div className="sm:w-1/3">
                    <LoadingSizeSearch />
                </div>
            </div>
            
        </div>
    );
}

export default LkwSearch;