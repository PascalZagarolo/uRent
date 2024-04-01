


import TransportLoading from "./transport/transport-loading";
import TransportTransmission from "./transport/transport-transmission";
import TransportSeats from "./transport/transport-seats";
import TransportFuel from "./transport/transport-fuel";
import TransportDoors from "./transport/transport-doors";
import { inserat } from "@/db/schema";
import TransportWeightClass from "./transport/transport-weight-class";
import TransportPowerForm from "./transport/transport-power";
import TransportLoadingVolumeForm from "./transport/transport-volume";
import TransportSizeForm from "./transport/transport-size";



interface TransportInformationProps {
    thisInserat : typeof inserat.$inferSelect

}

const TransportInformation: React.FC<TransportInformationProps> = ({
    thisInserat
}) => {
    return (
        <div className="mt-4">
            
            
            
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 <TransportLoading 
                 thisLoading={thisInserat?.transportAttribute?.loading}
                 />
                </div>
                <div className="w-1/2">
                <TransportTransmission 
                 thisTransmission={thisInserat?.transportAttribute?.transmission}
                 />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 <TransportFuel 
                 thisFuel={thisInserat?.transportAttribute?.fuel}
                 />
                </div>
                <div className="w-1/2">
                    <TransportSeats 
                    thisSeats = {thisInserat?.transportAttribute?.seats}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8  mt-4">
                <div className="w-1/2">
                <TransportDoors 
                thisDoors={thisInserat?.transportAttribute?.doors}
                />
                </div>
                <div className="w-1/2">
                <TransportWeightClass 
                thisWeightClass={thisInserat?.transportAttribute?.weightClass}
                />
                </div>
            </div>
            <div className="flex w-full gap-x-8  mt-4">
                <div className="w-1/2">
                <TransportPowerForm 
                thisPower={thisInserat?.transportAttribute?.power}
                />
                </div>
                
            </div>
            <div className="flex w-full gap-x-8  mt-4">
                
                <div className="w-1/2">
                <TransportLoadingVolumeForm
                thisVolume={thisInserat?.transportAttribute?.loading_volume}
                />
                </div>
                <div className="w-1/2">
                <TransportSizeForm
                thisHeight={thisInserat?.transportAttribute?.loading_h}
                thisWidth={thisInserat?.transportAttribute?.loading_b}
                thisLength={thisInserat?.transportAttribute?.loading_l}
                />
                </div>
                
            </div>
            
        </div>
    );
}

export default TransportInformation;