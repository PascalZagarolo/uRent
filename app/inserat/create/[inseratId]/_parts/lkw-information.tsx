
import Seats from "./lkw/seats";

import WeightClassForm from "./lkw/weightClass";
import ApplicationForm from "./lkw/application";
import LoadingForm from "./lkw/loading";
import DriveForm from "./lkw/drive";
import LkwBrandForm from "./lkw/lkwbrand";
import { inserat } from "@/db/schema";
;


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
                    <LkwBrandForm
                    thisBrand={thisInserat?.lkwAttribute?.lkwBrand}
                    />
                </div>
                <div className="w-1/2">
                    
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                <Seats
                    thisSeats={thisInserat?.lkwAttribute?.seats}
                    />
                </div>
                <div className="w-1/2">
                    <WeightClassForm 
                    thisWeightClass={thisInserat?.lkwAttribute?.weightClass}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                   <LoadingForm 
                   thisLoading={thisInserat?.lkwAttribute?.loading}
                   />
                </div>
                <div className="w-1/2">
                    <DriveForm 
                    thisDrive={thisInserat?.lkwAttribute?.drive}
                    />
                </div>
            </div>
            
            
        </div>
    );
}

export default LkwInformation;