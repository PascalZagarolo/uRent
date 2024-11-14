
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
import PkwFuelBar from "./pkw/pkw-fuel";
import PkwAhkBar from "./pkw/pkw-ahk";
import WeightClassBar from "./weight/weight-class";
import Payload from "./weight/payload";

const LkwSearchComponent = () => {
    return ( 
        <div className="mt-2 space-y-4">
           <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                <LkwBrandBar />
                </div>
                <div className="w-1/2">
                <PkwTransmissionBar />
                </div>
            </div>
            <div className="w-full">
            <LkwWeightClassBar />
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
            <PkwFuelBar />
            </div>
            </div>
            <div className="w-full flex gap-x-2">
          
            <TrailerAxisBar />
            
            
            </div>
            
            <div className="w-full">
            <PkwSeatsBar />
            </div>
            <div className="w-full flex gap-x-2">
                
                <div className="w-1/2">
                <PkwAhkBar/>
                </div>
            </div>
            <PkwPowerBar />
            <div>
                <SetInitialSearch/>
            </div>

            <div className="w-full gap-x-2 space-y-4">
            <h3 className="flex justify-center text-md items-center font-semibold mt-4 text-gray-200">
                zul. Gesamtgewicht 
            </h3>
            <WeightClassBar />
           
            </div>

            <div className="w-full gap-x-2 space-y-4">
            <h3 className="flex justify-center text-md items-center font-semibold mt-4 text-gray-200">
                Nutzlast
            </h3>
            <Payload />
           
            </div>
            
            <div className="w-full gap-x-2 space-y-4">
            <h3 className="flex justify-center text-md items-center font-semibold  mt-4 text-gray-200">
                Laderaum 
            </h3>
            <LoadingVolumeBar />
            <LoadingSizeBar />
            </div>
            
            
        </div>
     );
}
 
export default LkwSearchComponent;