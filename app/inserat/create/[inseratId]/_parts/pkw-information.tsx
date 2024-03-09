import { Inserat, PkwAttribute } from "@prisma/client";
import Seats from "./pkw/seats";
import TransmissionForm from "./pkw/transmission";
import FuelForm from "./pkw/fuel";
import CarTypeForm from "./pkw/car-type";
import Doors from "./pkw/doors";
import PowerForm from "./pkw/power";
import InitialForm from "./pkw/initial";
import CarBrandForm from "./pkw/carbrand";
;


interface PkwInformationProps {
    inserat: Inserat & { pkwAttribute?: PkwAttribute };

}

const PkwInformation: React.FC<PkwInformationProps> = ({
    inserat
}) => {
    return (
        <div className="mt-4">
            <div className="flex w-full gap-x-8">
                <div className="w-1/2">
                    <CarBrandForm 
                    brand = {inserat?.pkwAttribute?.brand}
                    />
                </div>
                <div className="w-1/2">
                    <Seats
                        seats={inserat?.pkwAttribute?.seats}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    <CarTypeForm
                    cartype = {inserat?.pkwAttribute?.type}
                    />
                </div>
                <div className="w-1/2">
                    <TransmissionForm
                        transmission={inserat.pkwAttribute?.transmission}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    <FuelForm 
                    fuel={inserat?.pkwAttribute?.fuel}
                    />
                </div>
                <div className="w-1/2">
                    <Doors 
                        doors={inserat?.pkwAttribute?.doors}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    <PowerForm
                    power={inserat?.pkwAttribute?.power}
                    />
                </div>
                <div className="w-1/2">
                    <InitialForm 
                    
                    inital={inserat?.pkwAttribute?.initial}/>
                </div>
            </div>
            
        </div>
    );
}

export default PkwInformation;