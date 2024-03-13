import {  Inserat, TrailerAttribute} from "@prisma/client";


import TrailerTypeCreation from "./trailer/trailer-type";
import TrailerCoupling from "./trailer/trailer-coupling";
import TrailerBrake from "./trailer/trailer-brake";
import TrailerAxis from "./trailer/trailer-axis";
import TrailerExtraType from "./trailer/trailer-extra-type";
import TrailerLoading from "./trailer/trailer-loading";



interface TrailorInformationProps {
    inserat: Inserat & { trailerAttribute? : TrailerAttribute }

}

const TrailorInformation: React.FC<TrailorInformationProps> = ({
    inserat
}) => {
    return (
        <div className="mt-4">
            <div className="flex w-full gap-x-8">
                <TrailerTypeCreation 
                trailerType = {inserat.trailerAttribute?.type}
                />
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 <TrailerCoupling 
                 coupling = {inserat.trailerAttribute?.coupling}
                 />
                </div>
                <div className="w-1/2">
                 <TrailerExtraType
                 extraType={inserat.trailerAttribute?.extraType}
                 />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 <TrailerLoading 
                 loading={inserat.trailerAttribute?.loading}
                 />
                </div>
                <div className="w-1/2">
                    <TrailerAxis 
                    axis={inserat.trailerAttribute?.axis}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                <TrailerBrake 
                 brake = {inserat.trailerAttribute?.brake}
                 />
                </div>
                <div className="w-1/2">
                    
                </div>
            </div>
            
        </div>
    );
}

export default TrailorInformation;