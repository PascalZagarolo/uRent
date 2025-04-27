import InitialSearch from "../_every/initial-search";
import LoadingSizeSearch from "../_every/loading-size-search";
import LoadingVolumeSearch from "../_every/loading-volume-search";
import LkwLoadingSearch from "../_lkw/lkw-loading-search";
import PkwAhkSearch from "../_pkw/pkw-ahk-search";
import PkwFuelSearch from "../_pkw/pkw-fuel-search";
import PkwPowerSearch from "../_pkw/pkw-power-search";
import PkwTransmissionSearch from "../_pkw/pkw-transmission-search";
import TrailerExtraTypeSearch from "../_trailer/trailer-extra-type-search";
import TransportBrandSearch from "../_transport/transport-brand-search";
import TransportDoorsSearch from "../_transport/transport-doors-search";
import TransportSeatsSearch from "../_transport/transport-seats-search";
import TransportWeightClassSearch from "../_transport/transport-weight-search";
import PayloadSearch from "../_weight-search/payload-search";
import WeightClassSearch from "../_weight-search/weightClass-search";

const TransportSearch = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                    <TransportBrandSearch />
                </div>
                <div>
                    <TrailerExtraTypeSearch />
                </div>
                <div>
                    <PkwFuelSearch />
                </div>
                
                <div>
                    <TransportSeatsSearch />
                </div>
                <div>
                    <TransportDoorsSearch />
                </div>
                <div>
                    <PkwTransmissionSearch />
                </div>
                
                <div>
                    <LkwLoadingSearch />
                </div>
                <div>
                    <TransportWeightClassSearch />
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

export default TransportSearch;