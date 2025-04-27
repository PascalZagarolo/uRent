import LkwApplicationSearch from "../_lkw/lkw-application-search";
import LkwBrandSearch from "../_lkw/lkw-brand-search";
import LkwDriveSearch from "../_lkw/lkw-drive-search";
import LkwLoadingSearch from "../_lkw/lkw-loading-search";
import LkwSeatsSearch from "../_lkw/lkw-seats-search";
import LkwWeightClassSearch from "../_lkw/lkw-weightclass-search";
import TrailerWeightClassSearch from "../_trailer/trailer-weight-search";
import TrailerTypeSearch from "../_trailer/trailer-type-search";
import TrailerExtraTypeSearch from "../_trailer/trailer-extra-type-search";
import TrailerCouplingSearch from "../_trailer/trailer-coupling";
import TrailerBrakeSearch from "../_trailer/trailer-brakes";
import TrailerAxisSearch from "../_trailer/trailer-axis";
import TrailerBrandSearch from "../_trailer/trailer-brand-search";
import TrailerSeatsSearch from "../_trailer/trailer-seats-search";
import LoadingVolumeSearch from "../_every/loading-volume-search";
import LoadingSizeSearch from "../_every/loading-size-search";
import InitialSearch from "../_every/initial-search";
import WeightClassSearch from "../_weight-search/weightClass-search";
import PayloadSearch from "../_weight-search/payload-search";

const TrailerSearch = () => {
    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
                    <TrailerTypeSearch />
                </div>
                <div>
                    <TrailerBrandSearch />
                </div>
                <div>
                    <TrailerExtraTypeSearch />
                </div>
                
                <div>
                    <LkwLoadingSearch />
                </div>
                <div>
                    <TrailerWeightClassSearch />
                </div>
                <div>
                    <TrailerCouplingSearch />
                </div>
                
                <div>
                    <TrailerAxisSearch isTrailer={true} />
                </div>
                <div>
                    <TrailerBrakeSearch />
                </div>
                <div>
                    <TrailerSeatsSearch />
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
                    <LoadingVolumeSearch />
                </div>
                <div>
                    <LoadingSizeSearch />
                </div>
            </div>
        </div>
    );
}

export default TrailerSearch;