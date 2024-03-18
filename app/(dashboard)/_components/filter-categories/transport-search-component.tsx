

import PkwSeatsBar from "./pkw/pkw-seats";
import PkwDoorsBar from "./pkw/pkw-doors";
import PkwFuelBar from "./pkw/pkw-fuel";
import PkwTransmissionBar from "./pkw/pkw-transmission";
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