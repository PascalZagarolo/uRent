
import LkwApplicationBar from "./lkw/lkw-application";
import LkwBrandBar from "./lkw/lkw-brand";
import PkwSeatsBar from "./pkw/pkw-seats";
import LkwLoadingBar from "./lkw/lkw-loading";
import LkwDriveBar from "./lkw/lkw-drive";
import LkwWeightClassBar from "./lkw/lkw-weight-class";
import TrailerWeightClass from "@/app/inserat/create/[inseratId]/_parts/trailer/trailer-weight-class";
import TrailerWeightClassBar from "./trailer/trailer-weight-class";
import TrailerBrakeBar from "./trailer/trailer-brake";
import TrailerTypeBar from "./trailer/trailer-type";
import TrailerExtraTypeBar from "./trailer/trailer-extra-type";
import TrailerCouplingBar from "./trailer/trailer-coupling";
import TrailerAxisBar from "./trailer/trailer-axis";

const TrailerSearchComponent = () => {
    
    
    
   
    
    
    return (
        <div className="mt-2 space-y-4">
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                    <TrailerTypeBar />
                </div>
                <div className="w-1/2">
                    <TrailerExtraTypeBar />
                </div>
            </div>
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                    <LkwLoadingBar />
                </div>
                <div className="w-1/2">
                    <TrailerBrakeBar />
                </div>
            </div>
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                    <TrailerCouplingBar />
                </div>
                <div className="w-1/2">
                    <TrailerAxisBar />
                </div>
            </div>

            <TrailerWeightClassBar />


        </div>
    );
}

export default TrailerSearchComponent;