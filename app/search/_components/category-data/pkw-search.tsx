import InitialSearch from "../_every/initial-search";
import LoadingSizeSearch from "../_every/loading-size-search";
import LoadingVolumeSearch from "../_every/loading-volume-search";
import LkwLoadingSearch from "../_lkw/lkw-loading-search";
import PkwAhkSearch from "../_pkw/pkw-ahk-search";
import PkwBrandSearch from "../_pkw/pkw-brand-search";
import PkwDoorsSearch from "../_pkw/pkw-doors-search";
import PkwFuelSearch from "../_pkw/pkw-fuel-search";
import PkwPowerSearch from "../_pkw/pkw-power-search";
import PkwSeatsSearch from "../_pkw/pkw-seats-search";
import PkwTransmissionSearch from "../_pkw/pkw-transmission-search";
import PkwTypeSearch from "../_pkw/pkw-type-search";
import TrailerExtraTypeSearch from "../_trailer/trailer-extra-type-search";
import TrailerWeightClassSearch from "../_trailer/trailer-weight-search";

const PkwSearch = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                    <PkwBrandSearch />
                </div>
                <div>
                    <PkwSeatsSearch />
                </div>
                <div>
                    <PkwFuelSearch />
                </div>
                
                <div>
                    <PkwTransmissionSearch />
                </div>
                <div>
                    <PkwTypeSearch />
                </div>
                <div>
                    <PkwDoorsSearch />
                </div>
                
                <div>
                    <PkwAhkSearch />
                </div>
                <div>
                    <InitialSearch />
                </div>
                <div>
                    <PkwPowerSearch />
                </div>
                
                <div>
                    <LoadingVolumeSearch />
                </div>
            </div>
        </div>
    );
}

export default PkwSearch;