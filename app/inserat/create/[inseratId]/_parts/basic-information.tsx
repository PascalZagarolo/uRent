import TitleInserat from "../../_components/input-fields/title-inserat";
import DescriptionInserat from "../../_components/input-fields/description-inserat";
import SelectCategoryInserat from "../../_components/input-fields/select-category";

import InseratImageUpload from "../../_components/input-fields/inserat-image-upload";

import SelectPrice from "../../_components/input-fields/rent-price";

import SelectInseratType from "../../_components/input-fields/select-inserat-type";
import SelectVehicleAmount from "../../_components/input-fields/select-vehicle-amount";
import { CategoryEnumRender, images, inserat, userTable } from "@/db/schema";


import TransportExtraType from "./transport/transport-extra-type";
import ApplicationForm from "./lkw/application";
import TrailerExtraType from "./trailer/trailer-extra-type";



interface BasicInformationProps {
    thisInserat: typeof inserat.$inferSelect,
    thisImages: typeof images.$inferSelect[];
    currentUser: typeof userTable.$inferSelect;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
    thisInserat,
    thisImages,
    currentUser

}) => {

    const usedCategory : typeof CategoryEnumRender = thisInserat.category;

    const usedImages = thisImages.sort((a,b) => a.position - b.position);

    return (
        <div>
            <div> 
                <TitleInserat
                    thisInserat={thisInserat}
                />
            </div>
            <div className="mt-4">
                
                <DescriptionInserat
                    thisInserat={thisInserat}
                />
               
            </div>
            <div className="mt-4 flex w-full justify-between items-center space-x-2">
                <div className="w-1/2 flex space-x-2">
                    <div className="w-full">
                        <SelectCategoryInserat
                            thisInserat={thisInserat}
                        />
                    </div>     
                </div>
                <div className="w-1/2">
                    {
                        {
                            
                            "TRANSPORT" : <TransportExtraType thisExtraType={thisInserat?.transportAttribute?.extraType} />,
                            "LKW" : <ApplicationForm thisApplication={thisInserat?.lkwAttribute?.application} />,
                            "TRAILER" : <TrailerExtraType thisExtraType={thisInserat?.trailerAttribute?.extraType} />
                            //@ts-ignore
                        }[usedCategory]
                    }
                    </div>
            </div>
            <div className="mt-8">
                <InseratImageUpload
                    thisImages={usedImages}
                    existingSubscription={currentUser.subscription}
                    isPublic={thisInserat.isPublished}
                />    
            </div>
            <div className="mt-4 w-full sm:flex gap-x-4 sm:space-y-0 space-y-4">
                <div className="sm:w-1/2 w-full">
                    <SelectPrice
                        thisInserat={thisInserat}
                    />
                </div>
                <div className="sm:w-1/2 w-full sm:flex gap-x-2 sm:space-y-0 space-y-4">
                    <div className="sm:w-1/2 w-full">  
                        <SelectInseratType 
                        thisInserat={thisInserat}
                        />
                    </div>
                    <div className="sm:w-1/2 w-full">
                        <SelectVehicleAmount
                        thisInserat = {thisInserat}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BasicInformation;