import { Inserat, PkwAttribute } from "@prisma/client";
import Seats from "./pkw/seats";


interface PkwInformationProps {
    inserat: Inserat & { pkwAttribute?: PkwAttribute };

}

const PkwInformation: React.FC<PkwInformationProps> = ({
    inserat
}) => {
    return (
        <div className="mt-4">
            <div className="flex w-full">
                <div className="w-1/2">
                    1
                </div>
                <div className="w-1/2">
                    <Seats
                        seats={inserat?.pkwAttribute?.seats}
                    />
                </div>
            </div>
        </div>
    );
}

export default PkwInformation;