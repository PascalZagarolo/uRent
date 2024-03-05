import { Inserat, LkwAttribute, PkwAttribute } from "@prisma/client";
import Seats from "./lkw/seats";
import TransmissionForm from "./pkw/transmission";
import FuelForm from "./pkw/fuel";
import CarTypeForm from "./pkw/car-type";
import Doors from "./pkw/doors";
import PowerForm from "./pkw/power";
import InitialForm from "./pkw/initial";
import CarBrandForm from "./pkw/carbrand";
import WeightClassForm from "./lkw/weightClass";
;


interface LkwInformationProps {
    inserat: Inserat & { lkwAttribute?: LkwAttribute};

}

const LkwInformation: React.FC<LkwInformationProps> = ({
    inserat
}) => {
    return (
        <div className="mt-4">
            <div className="flex w-full gap-x-8">
                <div className="w-1/2">
                    
                </div>
                <div className="w-1/2">
                    <Seats
                        seats={inserat?.lkwAttribute?.seats}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                   
                </div>
                <div className="w-1/2">
                    <WeightClassForm 
                    weightClass={inserat?.lkwAttribute?.weightClass}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                   
                </div>
                <div className="w-1/2">
                    
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    
                </div>
                <div className="w-1/2">
                    
                </div>
            </div>
            
        </div>
    );
}

export default LkwInformation;