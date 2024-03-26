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
;


interface PkwInformationProps {
    thisInserat : typeof inserat.$inferSelect;

}

const PkwInformation: React.FC<PkwInformationProps> = ({
    thisInserat
}) => {
    return (
        <div className="mt-4">
            <div className="flex w-full gap-x-8">
                <div className="w-1/2">
                    <CarBrandForm 
                    thisBrand = {thisInserat?.pkwAttribute?.brand}
                    />
                </div>
                <div className="w-1/2">
                    <Seats
                    thisSeats={thisInserat?.pkwAttribute?.seats}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    <CarTypeForm
                    thisCarType = {thisInserat?.pkwAttribute?.type}
                    />
                </div>
                <div className="w-1/2">
                    <TransmissionForm
                        thisTransmission={thisInserat.pkwAttribute?.transmission}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    <FuelForm 
                    thisFuel={thisInserat?.pkwAttribute?.fuel}
                    />
                </div>
                <div className="w-1/2">
                    <Doors 
                        thisDoors={thisInserat?.pkwAttribute?.doors}
                    />
                </div>
            </div>
            
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    <PkwWeightClass
                    thisWeightClass={thisInserat?.pkwAttribute?.weightClass}
                    />
                </div>
                <div className="w-1/2">
                    <CarLoadingForm
                    thisLoading={thisInserat?.pkwAttribute?.loading}
                    />
                </div>
                
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    <PowerForm
                    thisPower={thisInserat?.pkwAttribute?.power}
                    />
                </div>
                <div className="w-1/2">
                    <InitialForm 
                    thisInitial={thisInserat?.pkwAttribute?.initial}/>
                </div>
            </div>
        </div>
    );
}

export default PkwInformation;