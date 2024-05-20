
import Seats from "./lkw/seats";

import WeightClassForm from "./lkw/weightClass";
import ApplicationForm from "./lkw/application";
import LoadingForm from "./lkw/loading";
import DriveForm from "./lkw/drive";
import LkwBrandForm from "./lkw/lkwbrand";
import { inserat } from "@/db/schema";
import LkwPowerForm from "./lkw/lkw-power";
import LkwAxis from "./lkw/lkw-axis";
import LkwLoadingVolumeForm from "./lkw/lkw-volume";
import LkwSizeForm from "./lkw/loading-size";
import { lkwAttribute } from '../../../../../db/schema';
import LkwTransmission from "./lkw/lkw-transmission";
import LkwInitialForm from "./lkw/lkw-initial";




interface LkwInformationProps {
    thisInserat : typeof inserat.$inferSelect;

}

const LkwInformation: React.FC<LkwInformationProps> = ({
    thisInserat
}) => {
    return (
        <div className="mt-4">
            <div className="sm:flex sm:space-y-0 space-y-4 w-full gap-x-8">
                <div className="sm:w-1/2 w-full">
                    <WeightClassForm 
                    thisWeightClass={thisInserat?.lkwAttribute?.weightClass}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                    <LkwAxis 
                    thisAxis={thisInserat?.lkwAttribute?.axis}
                    />
                </div>
            </div>



            <div className="sm:flex sm:space-y-0 space-y-4 w-full gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <LkwBrandForm
                    thisBrand={thisInserat?.lkwAttribute?.lkwBrand}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                <Seats
                    thisSeats={thisInserat?.lkwAttribute?.seats}
                    />
                </div>
            </div>



            <div className="sm:flex sm:space-y-0 space-y-4 w-full gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <LkwTransmission 
                    thisTransmission={thisInserat?.lkwAttribute?.transmission}
                    />
                   
                </div>
                <div className="sm:w-1/2 w-full">
                    
                    <DriveForm 
                    thisDrive={thisInserat?.lkwAttribute?.drive}
                    />
                </div>
            </div>

            <div className="sm:flex sm:space-y-0 space-y-4 w-full gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                <LoadingForm 
                   thisLoading={thisInserat?.lkwAttribute?.loading}
                   />
                   
                </div>
                <div className="sm:w-1/2 w-full">
                    
                </div>
            </div>

            <div className="sm:flex sm:space-y-0 space-y-4 w-full gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                   <LkwPowerForm 
                   thisPower={thisInserat?.lkwAttribute?.power}
                   />
                </div>
                <div className="sm:w-1/2 w-full">
                   <LkwInitialForm 
                   thisInitial={thisInserat?.lkwAttribute?.initial}
                   />
                </div>
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                   <LkwLoadingVolumeForm 
                   thisVolume={thisInserat?.lkwAttribute?.loading_volume}
                   />
                </div>
                <div className="sm:w-1/2 w-full">
                   <LkwSizeForm 
                   thisHeight={thisInserat?.lkwAttribute?.loading_h}
                   thisWidth={thisInserat?.lkwAttribute?.loading_b}
                   thisLength={thisInserat?.lkwAttribute?.loading_l}
                   />
                </div>
            </div>
            
            
        </div>
    );
}

export default LkwInformation;