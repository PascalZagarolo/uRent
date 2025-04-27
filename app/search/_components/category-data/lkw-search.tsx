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
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                    <LkwBrandSearch />
                </div>
                <div>
                    <LkwApplicationSearch />
                </div>
                <div>
                    <LkwLoadingSearch />
                </div>
                
                <div>
                    <LkwDriveSearch />
                </div>
                <div>
                    <PkwSeatsSearch />
                </div>
                <div>
                    <TrailerAxisSearch />
                </div>
                
                <div>
                    <PkwTransmissionSearch />
                </div>
                <div>
                    <PkwFuelSearch />
                </div>
                <div>
                    <PkwAhkSearch />
                </div>
                
                <div>
                    <InitialSearch />
                </div>
                <div>
                    <WeightClassSearch />
                </div>
                <div>
                    <PayloadSearch />
                </div>
                
                <div>
                    <PkwPowerSearch />
                </div>
                <div>
                    <LoadingVolumeSearch />
                </div>
                <div>
                    <LoadingSizeSearch />
                </div>
            </div>
        </div>
    );
}

export default LkwSearch;