
import PkwBrandBar from "./pkw/pkw-brand";
import PkwSeatsBar from "./pkw/pkw-seats";
import PkwDoorsBar from "./pkw/pkw-doors";
import PkwFuelBar from "./pkw/pkw-fuel";
import PkwTransmissionBar from "./pkw/pkw-transmission";
import PkwPowerBar from "./pkw/pkw-power";
import PkwTypeBar from "./pkw/pkw-type";
import { Separator } from "@/components/ui/separator";
import FreeMilesBar from "./pkw/pkw-miles";
import ExtraMilesBar from "./pkw/pkw-extra-cost";
import LkwLoadingBar from "./lkw/lkw-loading";

const TransportSearchComponents = () => {
    return ( 
        <div className="mt-2 space-y-4">
            <LkwLoadingBar />
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
            
            
            
        </div>
     );
}
 
export default TransportSearchComponents;