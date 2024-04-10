
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
import LoadingVolumeSearch from "../_every/loading-volume-search";
import LoadingSizeSearch from "../_every/loading-size-search";

const TrailerSearch = () => {





    return (
        <div className="w-full">
            <div className="w-full sm:flex sm:gap-x-2 space-y-2 sm:space-y-0">
                <div className="sm:w-1/3">
                    <TrailerTypeSearch />
                </div>
                <div className="sm:w-1/3">
                    <TrailerExtraTypeSearch />
                </div>
                <div className="sm:w-1/3">
                    <LkwLoadingSearch />
                </div>
            </div>
            <div className="w-full sm:flex sm:gap-x-2 mt-4 space-y-2 sm:space-y-0">
                <div className="sm:w-1/3">
                    <TrailerWeightClassSearch />
                </div>
                <div className="sm:w-1/3">
                    <TrailerCouplingSearch />
                </div>
                <div className="sm:w-1/3">
                    <TrailerAxisSearch />
                </div>
            </div>
            <div className="w-full sm:flex sm:gap-x-2 mt-4 space-y-2 sm:space-y-0">
                <div className="sm:w-1/3">
                    <TrailerBrakeSearch />
                </div>
                <div className="sm:w-1/3">

                </div>
                <div className="sm:w-1/3">

                </div>
            </div>
            <div className="w-full sm:flex sm:gap-x-2 mt-4 space-y-4 sm:space-y-0">
                <div className="sm:w-1/3">
                    <LoadingVolumeSearch />
                </div>
                <div className="sm:w-1/3">
                    <LoadingSizeSearch />
                </div>
                <div className="sm:w-1/3">

                </div>
            </div>
        </div>
    );
}

export default TrailerSearch;