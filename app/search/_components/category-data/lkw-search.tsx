import InitialSearch from "../_every/initial-search";
import LoadingSizeSearch from "../_every/loading-size-search";
import LoadingVolumeSearch from "../_every/loading-volume-search";
import LkwApplicationSearch from "../_lkw/lkw-application-search";
import LkwBrandSearch from "../_lkw/lkw-brand-search";
import LkwDriveSearch from "../_lkw/lkw-drive-search";
import LkwLoadingSearch from "../_lkw/lkw-loading-search";
import LkwSeatsSearch from "../_lkw/lkw-seats-search";
import LkwWeightClassSearch from "../_lkw/lkw-weightclass-search";
import PkwAhkSearch from "../_pkw/pkw-ahk-search";
import PkwFuelSearch from "../_pkw/pkw-fuel-search";
import PkwPowerSearch from "../_pkw/pkw-power-search";
import PkwSeatsSearch from "../_pkw/pkw-seats-search";
import PkwTransmissionSearch from "../_pkw/pkw-transmission-search";
import TrailerAxisSearch from "../_trailer/trailer-axis";
import PayloadSearch from "../_weight-search/payload-search";
import WeightClassSearch from "../_weight-search/weightClass-search";

const LkwSearch = () => {
    return (
        <div className="w-full sm:space-y-8">
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
                <PkwSeatsSearch />
                </div>
                <div className="sm:w-1/3">
                <TrailerAxisSearch />
                </div>
            </div>
            <div className="w-full sm:flex sm:gap-x-2 mt-4 space-y-2 sm:space-y-0">
                <div className="sm:w-1/3">
                <PkwTransmissionSearch />
                </div>
                <div className="sm:w-1/3">
                <PkwFuelSearch />
                </div>
                <div className="sm:w-1/3">
                <PkwAhkSearch />
                </div>
            </div>
            
            <div className="w-full sm:flex sm:gap-x-2 space-y-2 sm:space-y-0 mt-4">
                <div className="sm:w-1/3">
                    <InitialSearch />
                </div>
                <div className="sm:w-1/3">
                    <WeightClassSearch />
                </div>
                <div className="sm:w-1/3">
                    <PayloadSearch />
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