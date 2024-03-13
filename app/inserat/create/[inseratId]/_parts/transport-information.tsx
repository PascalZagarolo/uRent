import { Inserat, TrailerAttribute, TransportAttribute} from "@prisma/client";


import TrailerTypeCreation from "./trailer/trailer-type";
import TrailerCoupling from "./trailer/trailer-coupling";
import TrailerBrake from "./trailer/trailer-brake";
import TrailerAxis from "./trailer/trailer-axis";
import TrailerExtraType from "./trailer/trailer-extra-type";
import TrailerLoading from "./trailer/trailer-loading";
import TrailerWeightClass from "./trailer/trailer-weight-class";
import TransportLoading from "./transport/transport-loading";
import TransportTransmission from "./transport/transport-transmission";
import TransportSeats from "./transport/transport-seats";
import TransportFuel from "./transport/transport-fuel";
import TransportDoors from "./transport/transport-doors";



interface TransportInformationProps {
    inserat: Inserat & { transportAttribute? : TransportAttribute }

}

const TransportInformation: React.FC<TransportInformationProps> = ({
    inserat
}) => {
    return (
        <div className="mt-4">
            
            
            
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 <TransportLoading 
                 loading={inserat?.transportAttribute?.loading}
                 />
                </div>
                <div className="w-1/2">
                <TransportTransmission 
                 transmission={inserat?.transportAttribute?.transmission}
                 />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 <TransportFuel 
                 fuel={inserat?.transportAttribute?.fuel}
                 />
                </div>
                <div className="w-1/2">
                    <TransportSeats 
                    seats = {inserat?.transportAttribute?.seats}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8  mt-4">
                <div className="w-1/2">
                <TransportDoors 
                doors={inserat?.transportAttribute?.doors}
                />
                </div>
                <div>
                    
                </div>
            </div>
            
        </div>
    );
}

export default TransportInformation;