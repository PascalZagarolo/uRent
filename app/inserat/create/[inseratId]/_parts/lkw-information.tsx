
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




interface LkwInformationProps {
    thisInserat : typeof inserat.$inferSelect;

}

const LkwInformation: React.FC<LkwInformationProps> = ({
    thisInserat
}) => {
    return (
        <div className="mt-4">
            <div className="flex w-full gap-x-8">
                <div className="w-1/2">
                    <WeightClassForm 
                    thisWeightClass={thisInserat?.lkwAttribute?.weightClass}
                    />
                </div>
                <div className="w-1/2">
                    <LkwAxis 
                    thisAxis={thisInserat?.lkwAttribute?.axis}
                    />
                </div>
            </div>



            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    <LkwBrandForm
                    thisBrand={thisInserat?.lkwAttribute?.lkwBrand}
                    />
                </div>
                <div className="w-1/2">
                <Seats
                    thisSeats={thisInserat?.lkwAttribute?.seats}
                    />
                </div>
            </div>



            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    Getriebe
                   
                </div>
                <div className="w-1/2">
                    
                    <DriveForm 
                    thisDrive={thisInserat?.lkwAttribute?.drive}
                    />
                </div>
            </div>

            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                <LoadingForm 
                   thisLoading={thisInserat?.lkwAttribute?.loading}
                   />
                   
                </div>
                <div>
                    <DriveForm 
                    thisDrive={thisInserat?.lkwAttribute?.drive}
                    />
                </div>
            </div>

            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                   <LkwPowerForm 
                   thisPower={thisInserat?.lkwAttribute?.power}
                   />
                </div>
                <div className="w-1/2">
                   
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                   <LkwLoadingVolumeForm 
                   thisVolume={thisInserat?.lkwAttribute?.loading_volume}
                   />
                </div>
                <div className="w-1/2">
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