
import LkwApplicationBar from "./lkw/lkw-application";
import LkwBrandBar from "./lkw/lkw-brand";
import PkwSeatsBar from "./pkw/pkw-seats";
import LkwLoadingBar from "./lkw/lkw-loading";
import LkwDriveBar from "./lkw/lkw-drive";
import LkwWeightClassBar from "./lkw/lkw-weight-class";
import TrailerAxisBar from "./trailer/trailer-axis";
import { Separator } from "@/components/ui/separator";
import LoadingVolumeBar from "./every/loading_volume";
import LoadingSizeBar from "./every/loading_size";
import TrailerWeightClassBar from "./trailer/trailer-weight-class";
import PkwPowerBar from "./pkw/pkw-power";
import SetInitialSearch from "./pkw/initial";
import PkwTransmissionSearch from "@/app/search/_components/_pkw/pkw-transmission-search";
import PkwTransmissionBar from "./pkw/pkw-transmission";

const LkwSearchComponent = () => {
    return ( 
        <div className="mt-2 space-y-4">
           <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                <LkwBrandBar />
                </div>
                <div className="w-1/2">
                <TrailerWeightClassBar />
                </div>
            </div>
            <div className="w-full flex gap-x-2">
            <div className="w-1/2">
            <LkwApplicationBar />
            </div>
            <div className="w-1/2">
            <LkwLoadingBar />
            </div>
            </div>
            <div className="w-full flex gap-x-2">
            <div className="w-1/2">
            <LkwDriveBar />
            </div>
            <div className="w-1/2">
            <PkwSeatsBar />
            </div>
            </div>
            <div className="w-full flex gap-x-2">
            <div className="w-1/2">
            <PkwTransmissionBar />
            </div>
            <div className="w-1/2">
            <TrailerAxisBar />
            </div>
            </div>
            <PkwPowerBar />
            <div>
                <SetInitialSearch/>
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
 
export default LkwSearchComponent;