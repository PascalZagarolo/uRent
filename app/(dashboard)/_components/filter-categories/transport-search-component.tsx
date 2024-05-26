

import PkwSeatsBar from "./pkw/pkw-seats";
import PkwDoorsBar from "./pkw/pkw-doors";
import PkwFuelBar from "./pkw/pkw-fuel";
import PkwTransmissionBar from "./pkw/pkw-transmission";
import LkwLoadingBar from "./lkw/lkw-loading";
import { Separator } from "@/components/ui/separator";
import LoadingVolumeBar from "./every/loading_volume";
import LoadingSizeBar from "./every/loading_size";
import TrailerExtraTypeBar from "./trailer/trailer-extra-type";
import PkwPowerBar from "./pkw/pkw-power";
import SetInitialSearch from "./pkw/initial";
import TransportWeightClass from "@/app/inserat/create/[inseratId]/_parts/transport/transport-weight-class";
import TransportWeightClassBar from "./transport/transport-weightclass";

const TransportSearchComponents = () => {
    return ( 
        <div className="mt-2 space-y-4">
            <LkwLoadingBar />
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
<TrailerExtraTypeBar/>
                </div>
                <div className="w-1/2">
                    <TransportWeightClassBar />
                </div>
            </div>
            <div className="w-full flex gap-x-2">
            <div className="w-1/2">
            <PkwSeatsBar />
            </div>
            <div className="w-1/2">
            <PkwDoorsBar />
            </div>
            </div>
            <div className="w-full flex gap-x-2">
            <div className="w-1/2">
            <PkwFuelBar />
            </div>
            <div className="w-1/2">
            <PkwTransmissionBar />
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
 
export default TransportSearchComponents;