
import PkwBrandBar from "./pkw/pkw-brand";
import PkwSeatsBar from "./pkw/pkw-seats";
import PkwDoorsBar from "./pkw/pkw-doors";
import PkwFuelBar from "./pkw/pkw-fuel";
import PkwTransmissionBar from "./pkw/pkw-transmission";
import PkwPowerBar from "./pkw/pkw-power";
import PkwTypeBar from "./pkw/pkw-type";

const PkwSearchComponents = () => {
    return ( 
        <div className="mt-2 space-y-4">
            <PkwBrandBar />
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
            <PkwTypeBar />
            <PkwPowerBar />
        </div>
     );
}
 
export default PkwSearchComponents;