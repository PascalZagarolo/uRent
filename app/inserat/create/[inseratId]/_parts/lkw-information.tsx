import { Inserat, LkwAttribute, LkwBrand, PkwAttribute } from "@prisma/client";
import Seats from "./lkw/seats";
import TransmissionForm from "./pkw/transmission";
import FuelForm from "./pkw/fuel";
import CarTypeForm from "./pkw/car-type";
import Doors from "./pkw/doors";
import PowerForm from "./pkw/power";
import InitialForm from "./pkw/initial";
import CarBrandForm from "./pkw/carbrand";
import WeightClassForm from "./lkw/weightClass";
import ApplicationForm from "./lkw/application";
import LoadingForm from "./lkw/loading";
import DriveForm from "./lkw/drive";
import LkwBrandForm from "./lkw/lkwbrand";
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
                    <LkwBrandForm
                    brand={inserat?.lkwAttribute?.brand}
                    />
                </div>
                <div className="w-1/2">
                    <Seats
                        seats={inserat?.lkwAttribute?.seats}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                   <ApplicationForm 
                   application={inserat?.lkwAttribute?.application}
                   />
                </div>
                <div className="w-1/2">
                    <WeightClassForm 
                    weightClass={inserat?.lkwAttribute?.weightClass}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                   <LoadingForm 
                   loading={inserat?.lkwAttribute?.loading}
                   />
                </div>
                <div className="w-1/2">
                    <DriveForm 
                    drive={inserat?.lkwAttribute?.drive}
                    />
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