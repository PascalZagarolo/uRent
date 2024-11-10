

import LkwLoadingBar from "./lkw/lkw-loading";
import TrailerWeightClassBar from "./trailer/trailer-weight-class";
import TrailerBrakeBar from "./trailer/trailer-brake";
import TrailerTypeBar from "./trailer/trailer-type";
import TrailerExtraTypeBar from "./trailer/trailer-extra-type";
import TrailerCouplingBar from "./trailer/trailer-coupling";
import TrailerAxisBar from "./trailer/trailer-axis";
import { Separator } from "@/components/ui/separator";
import LoadingVolumeBar from "./every/loading_volume";
import LoadingSizeBar from "./every/loading_size";
import SetInitialSearch from "./pkw/initial";

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
                    
                </div>
            </div>
<div className="w-full">
<TrailerAxisBar 
isTrailer={true}
/>
</div>
            <TrailerWeightClassBar />
            <div>
                <SetInitialSearch />
            </div>
            <div className="w-full gap-x-2 space-y-4">
            <h3 className="flex justify-center text-md items-center font-semibold  mt-4 text-gray-200">
                <Separator className="w-1/3 mr-2 bg-gray-200 h-[0.5px]" /> Laderaum <Separator className="w-1/3 ml-2 bg-gray-200 h-[0.5px]" />
            </h3>
            <LoadingVolumeBar />
            <LoadingSizeBar />
            </div>

        </div>
    );
}

export default TrailerSearchComponent;