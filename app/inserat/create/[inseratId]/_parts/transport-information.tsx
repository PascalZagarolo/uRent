


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
import TransportBrandForm from "./transport/transport-brand";
import TransportInitialForm from "./transport/transport-initial";
import TransportAhk from "./transport/transport-ahk";



interface TransportInformationProps {
    thisInserat: typeof inserat.$inferSelect

}

const TransportInformation: React.FC<TransportInformationProps> = ({
    thisInserat
}) => {
    return (
        <div className="mt-4">



            


            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <TransportBrandForm
                        thisBrand={thisInserat?.transportAttribute?.transportBrand}
                    />
                </div>
                <div className="sm:w-1/2 w-full">

                    <TransportSeats
                        thisSeats={thisInserat?.transportAttribute?.seats}
                    />

                </div>
            </div>


            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8  mt-4">
                <div className="sm:w-1/2 w-full">

                    <TransportTransmission
                        thisTransmission={thisInserat?.transportAttribute?.transmission}
                    />
                </div>
                <div className="sm:w-1/2 w-full">

                    <TransportFuel
                        thisFuel={thisInserat?.transportAttribute?.fuel}
                    />
                </div>
            </div>


            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8  mt-4">
                <div className="sm:w-1/2 w-full">


                    <TransportDoors
                        thisDoors={thisInserat?.transportAttribute?.doors}
                    />
                </div>

                <div className="sm:w-1/2 w-full">
                    <TransportLoading
                        thisLoading={thisInserat?.transportAttribute?.loading}
                    />
                </div>
            </div>

            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                    <TransportAhk
                        thisBrake={thisInserat?.transportAttribute?.ahk}
                    />
                </div>
                <div className="sm:w-1/2 w-full">

                </div>
            </div>

            <div className="sm:flex sm:space-y-0 space-y-4w-full sm:gap-x-8  mt-4">

                <div className="sm:w-1/2 w-full">
                    <TransportPowerForm
                        thisPower={thisInserat?.transportAttribute?.power}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                    <TransportInitialForm
                        thisInitial={thisInserat?.transportAttribute?.initial}
                    />
                </div>

            </div>

            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8  mt-4">

                <div className="sm:w-1/2 w-full">
                    <TransportLoadingVolumeForm
                        thisVolume={thisInserat?.transportAttribute?.loading_volume}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
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