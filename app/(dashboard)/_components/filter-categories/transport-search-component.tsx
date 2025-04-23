

import PkwSeatsBar from "./pkw/pkw-seats";
import PkwDoorsBar from "./pkw/pkw-doors";
import PkwFuelBar from "./pkw/pkw-fuel";
import PkwTransmissionBar from "./pkw/pkw-transmission";
import LkwLoadingBar from "./lkw/lkw-loading";
import { Separator } from "@/components/ui/separator";
import LoadingVolumeBar from "./every/loading_volume";
import LoadingSizeBar from "./every/loading_size";
import TrailerExtraTypeBar from "./trailer/trailer-extra-type";
import PkwPowerBar from "./pkw/pkw-power";
import SetInitialSearch from "./pkw/initial";
import TransportWeightClass from "@/app/inserat/create/[inseratId]/_parts/transport/transport-weight-class";
import TransportWeightClassBar from "./transport/transport-weightclass";
import TransportBrandBar from "./transport/transport-brand";
import PkwAhkBar from "./pkw/pkw-ahk";
import WeightClassBar from "./weight/weight-class";
import Payload from "./weight/payload";

const TransportSearchComponents = () => {
    return (
        <div className="mt-2 space-y-4">
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                    <TransportBrandBar />
                </div>
                <div className="w-1/2">
                    <LkwLoadingBar />
                </div>

            </div>
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                    <TrailerExtraTypeBar />
                </div>
                <div className="w-1/2">
                    <PkwFuelBar />
                </div>
            </div>
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                    <PkwTransmissionBar />
                </div>
                <div className="w-1/2">
                    <PkwAhkBar />
                </div>
            </div>

            <div className="w-full">
                <PkwDoorsBar />
            </div>
            <div className="w-full">
                <PkwSeatsBar />
            </div>
            
            <div className="pb-4 pt-8">
                <PkwPowerBar />
            </div>
            <div>
                <SetInitialSearch />
            </div>
            <div className="w-full gap-x-2 space-y-4 pb-4">
                <h3 className="flex justify-center text-md items-center font-semibold mt-4 text-gray-200">
                    zul. Gesamtgewicht
                </h3>
                <WeightClassBar />

            </div>

            <div className="w-full gap-x-2 space-y-4 pb-4">
                <h3 className="flex justify-center text-md items-center font-semibold mt-4 text-gray-200">
                    Nutzlast
                </h3>
                <Payload />

            </div>
            <div className="w-full gap-x-2 space-y-4 pb-4">
                <h3 className="flex justify-center text-md items-center font-semibold  mt-4 text-gray-200">
                    Laderaum
                </h3>
                <div>
                <LoadingVolumeBar />
                </div>
                <div className="pt-4">
                <LoadingSizeBar />
                </div>
            </div>


        </div>
    );
}

export default TransportSearchComponents;