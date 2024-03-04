import { Inserat, PkwAttribute } from "@prisma/client";
import Seats from "./pkw/seats";
import TransmissionForm from "./pkw/transmission";
import FuelForm from "./pkw/fuel";


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
                    1
                </div>
                <div className="w-1/2">
                    <Seats
                        seats={inserat?.pkwAttribute?.seats}
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
                    <TransmissionForm
                        transmission={inserat.pkwAttribute.transmission}
                    />
                </div>
            </div>
        </div>
    );
}

export default PkwInformation;