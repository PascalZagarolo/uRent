import { Inserat, TrailerAttribute} from "@prisma/client";


import TrailerTypeCreation from "./trailer/trailer-type";



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
                 
                </div>
                <div className="w-1/2">
                 4   
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                 5  
                </div>
                <div className="w-1/2">
                    6
                </div>
            </div>
            <div className="flex w-full gap-x-8 mt-4">
                <div className="w-1/2">
                    7
                </div>
                <div className="w-1/2">
                    8
                </div>
            </div>
            
        </div>
    );
}

export default TrailorInformation;