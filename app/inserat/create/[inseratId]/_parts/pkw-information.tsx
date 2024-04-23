import Seats from "./pkw/seats";
import TransmissionForm from "./pkw/transmission";
import FuelForm from "./pkw/fuel";
import CarTypeForm from "./pkw/car-type";
import Doors from "./pkw/doors";
import PowerForm from "./pkw/power";
import InitialForm from "./pkw/initial";
import CarBrandForm from "./pkw/carbrand";
import { inserat } from "@/db/schema";
import PkwWeightClass from "./pkw/pkw-weight-class";
import CarLoadingForm from "./pkw/car-loading";
import LoadingVolumeForm from "./pkw/loading-volume";
import LoadingSizeForm from "./pkw/loading-size";
import { pkwAttribute } from '../../../../../db/schema';
import PkwAhk from "./pkw/pkw-ahk";
;


interface PkwInformationProps {
    thisInserat : typeof inserat.$inferSelect;

}

const PkwInformation: React.FC<PkwInformationProps> = ({
    thisInserat
}) => {
    return (
        <div className="mt-4">
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8">
                <div className="sm:w-1/2 w-full">
                    <CarBrandForm 
                    thisBrand = {thisInserat?.pkwAttribute?.brand}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                    <Seats
                    thisSeats={thisInserat?.pkwAttribute?.seats}
                    />
                </div>
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <CarTypeForm
                    thisCarType = {thisInserat?.pkwAttribute?.type}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                    <TransmissionForm
                        thisTransmission={thisInserat.pkwAttribute?.transmission}
                    />
                </div>
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <FuelForm 
                    thisFuel={thisInserat?.pkwAttribute?.fuel}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                    <Doors 
                        thisDoors={thisInserat?.pkwAttribute?.doors}
                    />
                </div>
            </div>
            
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <PkwWeightClass
                    thisWeightClass={thisInserat?.pkwAttribute?.weightClass}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                    <PkwAhk 
                    thisBrake={thisInserat?.pkwAttribute?.ahk}
                    />
                </div>
                
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <PowerForm
                    thisPower={thisInserat?.pkwAttribute?.power}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                    <InitialForm 
                    thisInitial={thisInserat?.pkwAttribute?.initial}/>
                </div>
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <LoadingVolumeForm
                    thisVolume={thisInserat?.pkwAttribute?.loading_volume}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                    <LoadingSizeForm 
                    thisLength = {thisInserat?.pkwAttribute?.loading_l}
                    thisWidth = {thisInserat?.pkwAttribute?.loading_b}
                    thisHeight = {thisInserat?.pkwAttribute?.loading_h}
                    />
                </div>
            </div>
        </div>
    );
}

export default PkwInformation;