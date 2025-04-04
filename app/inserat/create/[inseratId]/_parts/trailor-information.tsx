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
import TrailerInitialForm from "./trailer/trailer-initial";



interface TrailorInformationProps {
    thisInserat : typeof inserat.$inferSelect;

}

const TrailorInformation: React.FC<TrailorInformationProps> = ({
    thisInserat
}) => {
    return (
        <div className="mt-4">
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8">
                
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                <TrailerTypeCreation 
                thisTrailerType = {thisInserat.trailerAttribute?.type}
                />
                </div>
                <div className="sm:w-1/2 w-full">
                <TrailerAxis 
                    thisAxis={thisInserat.trailerAttribute?.axis}
                    />
                </div>
            </div>


            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                <TrailerBrake 
                 thisBrake = {thisInserat.trailerAttribute?.brake}
                 />
                </div>
                <div className="sm:w-1/2 w-full">
                <TrailerCoupling 
                 thisCoupling = {thisInserat.trailerAttribute?.coupling}
                 />
                </div>
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                <TrailerLoading 
                 thisLoading={thisInserat.trailerAttribute?.loading}
                 />
                </div>
                <div className="sm:w-1/2 w-full">
                
                
                </div>
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                <TrailerInitialForm 
                    thisInitial={thisInserat.trailerAttribute?.initial}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
                
                </div>
            </div>
            <div className="sm:flex sm:space-y-0 space-y-4 w-full sm:gap-x-8 mt-4">
                <div className="sm:w-1/2 w-full">
                <TrailerLoadingVolumeForm 
                    thisVolume={thisInserat.trailerAttribute?.loading_volume}
                    />
                </div>
                <div className="sm:w-1/2 w-full">
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