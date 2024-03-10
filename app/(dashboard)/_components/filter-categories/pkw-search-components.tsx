
import PkwBrandBar from "./pkw/pkw-brand";
import PkwSeatsBar from "./pkw/pkw-seats";
import PkwDoorsBar from "./pkw/pkw-doors";
import PkwFuelBar from "./pkw/pkw-fuel";
import PkwTransmissionBar from "./pkw/pkw-transmission";
import PkwPowerBar from "./pkw/pkw-power";
import PkwTypeBar from "./pkw/pkw-type";
import { Separator } from "@/components/ui/separator";
import FreeMilesBar from "./pkw/pkw-miles";

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
            
            <div className="w-full gap-x-2 space-y-4">
            <h3 className="flex justify-center text-md items-center font-semibold  mt-4">
                <Separator className="w-1/3 mr-2 bg-gray-200 h-[0.5px]" /> Kilometer <Separator className="w-1/3 ml-2 bg-gray-200 h-[0.5px]" />
            </h3>
            
            
            <FreeMilesBar />
            
            
            
            
           
            </div>
            <PkwPowerBar />
        </div>
     );
}
 
export default PkwSearchComponents;