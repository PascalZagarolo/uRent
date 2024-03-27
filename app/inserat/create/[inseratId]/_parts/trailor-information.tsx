import TrailerTypeCreation from "./trailer/trailer-type";
import TrailerCoupling from "./trailer/trailer-coupling";
import TrailerBrake from "./trailer/trailer-brake";
import TrailerAxis from "./trailer/trailer-axis";
import TrailerExtraType from "./trailer/trailer-extra-type";
import TrailerLoading from "./trailer/trailer-loading";
import TrailerWeightClass from "./trailer/trailer-weight-class";
import { inserat } from "@/db/schema";
import TrailerLoadingVolumeForm from "./trailer/trailer-volume";
import TrailerSizeForm from "./trailer/trailer-size";
import { trailerAttribute } from '../../../../../db/schema';



interface TrailorInformationProps {
    thisInserat : typeof inserat.$inferSelect;

}

const TrailorInformation: React.FC<TrailorInformationProps> = ({
    thisInserat
}) => {
    return (
        <div className="mt-4">
            <div className="flex w-full gap-x-8">
                <TrailerTypeCreation 
                thisTrailerType = {thisInserat.trailerAttribute?.type}
                />
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 <TrailerCoupling 
                 thisCoupling = {thisInserat.trailerAttribute?.coupling}
                 />
                </div>
                <div className="w-1/2">
                 
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 <TrailerLoading 
                 thisLoading={thisInserat.trailerAttribute?.loading}
                 />
                </div>
                <div className="w-1/2">
                    <TrailerAxis 
                    thisAxis={thisInserat.trailerAttribute?.axis}
                    />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                <TrailerWeightClass 
                    thisWeightClass={thisInserat.trailerAttribute?.weightClass}
                    />
                </div>
                <div className="w-1/2">
                <TrailerBrake 
                 thisBrake = {thisInserat.trailerAttribute?.brake}
                 />
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                <TrailerLoadingVolumeForm 
                    thisVolume={thisInserat.trailerAttribute?.loading_volume}
                    />
                </div>
                <div className="w-1/2">
                <TrailerSizeForm 
                thisHeight={thisInserat?.trailerAttribute?.loading_h}
                thisWidth={thisInserat?.trailerAttribute?.loading_b}
                thisLength={thisInserat?.trailerAttribute?.loading_l}                
                />
                </div>
            </div>
            
        </div>
    );
}

export default TrailorInformation;