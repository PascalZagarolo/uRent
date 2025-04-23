
import PkwBrandBar from "./pkw/pkw-brand";
import PkwSeatsBar from "./pkw/pkw-seats";
import PkwDoorsBar from "./pkw/pkw-doors";
import PkwFuelBar from "./pkw/pkw-fuel";
import PkwTransmissionBar from "./pkw/pkw-transmission";
import PkwPowerBar from "./pkw/pkw-power";
import PkwTypeBar from "./pkw/pkw-type";
import { Separator } from "@/components/ui/separator";

import LoadingVolumeBar from "./every/loading_volume";

import SetInitialSearch from "./pkw/initial";

import PkwAhkBar from "./pkw/pkw-ahk";

const PkwSearchComponents = () => {
    return (
        <div className="mt-2 space-y-4">
            <div className="flex w-full gap-x-2">
                <div className="w-1/2">
                    <PkwBrandBar />
                </div>
                <div className="w-1/2">
                    <PkwTypeBar />
                </div>
            </div>
            <div className="w-full">
            <PkwSeatsBar />
            </div>
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                <PkwAhkBar/>
                </div>
                <div className="w-1/2">
                    
                </div>
            </div>
            <div className="w-full flex gap-x-2">
                <div className="w-1/2">
                    <PkwFuelBar />
                </div>
                <div className="w-1/2">
                    <PkwTransmissionBar />
                </div>
            </div>
            <div className="w-full">
            <PkwDoorsBar />
            </div>



            <div className="pb-4 pt-8">
            <PkwPowerBar />
            </div>
            <div className="pb-4">
                <SetInitialSearch />
            </div>
            <div className="w-full gap-x-2 space-y-4 s">
                <h3 className="flex justify-center text-md items-center font-semibold  mt-4 text-gray-200">
                    Laderaum 
                </h3>
                <div className="">
                <LoadingVolumeBar />
                </div>

            </div>
        </div>
    );
}

export default PkwSearchComponents;