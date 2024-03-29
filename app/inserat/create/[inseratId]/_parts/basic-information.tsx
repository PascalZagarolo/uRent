import TitleInserat from "../../_components/input-fields/title-inserat";
import DescriptionInserat from "../../_components/input-fields/description-inserat";
import SelectCategoryInserat from "../../_components/input-fields/select-category";
import ImageListForm from "../../_components/input-fields/image-list-form";
import InseratImageUpload from "../../_components/input-fields/inserat-image-upload";
import RentPeriod from "../../_components/input-fields/rent-period";
import RentPrice from "../../_components/input-fields/rent-price";
import SelectPrice from "../../_components/input-fields/rent-price";
import SelectLicenseInserat from "../../_components/input-fields/select-license";
import SelectInseratType from "../../_components/input-fields/select-inserat-type";
import SelectVehicleAmount from "../../_components/input-fields/select-vehicle-amount";
import { images, inserat } from "@/db/schema";
import PkwExtraType from "./pkw/pkw-extra-type";
import { pkwAttribute } from '../../../../../db/schema';
import TransportExtraType from "./transport/transport-extra-type";
import LkwApplicationBar from "@/app/(dashboard)/_components/filter-categories/lkw/lkw-application";
import ApplicationForm from "./lkw/application";
import TrailerExtraType from "./trailer/trailer-extra-type";


interface BasicInformationProps {
    thisInserat: typeof inserat.$inferSelect,
    thisImages: typeof images.$inferSelect[];
}

const BasicInformation: React.FC<BasicInformationProps> = ({
    thisInserat,
    thisImages
}) => {
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
                     
                    <div className="w-1/2">
                        <SelectCategoryInserat
                            thisInserat={thisInserat}
                        />
                    </div>
                    <div className="w-1/2">
                    {
                        {
                            "PKW" : <PkwExtraType thisExtraType={thisInserat?.pkwAttribute?.extraType} />,
                            "TRANSPORT" : <TransportExtraType thisExtraType={thisInserat?.transportAttribute?.extraType} />,
                            "LKW" : <ApplicationForm thisApplication={thisInserat?.lkwAttribute?.application} />,
                            "TRAILER" : <TrailerExtraType thisExtraType={thisInserat?.trailerAttribute?.extraType} />
                        }[thisInserat.category]
                    }
                    </div>
                   
                </div>
                <div className="w-1/2">
                     
                    <SelectLicenseInserat
                        thisInserat={thisInserat}
                    />
                   
                </div>

            </div>
            <div className="mt-8">
               
                <InseratImageUpload
                    thisImages={thisImages}
                />
                
            </div>
            <div className="mt-4 w-full flex gap-x-4">

                <div className="w-1/2">
                   
                    <SelectPrice
                        thisInserat={thisInserat}
                    />
                    
                </div>
                <div className="w-1/2 flex gap-x-2">
                    <div className="w-1/2">
                       
                        <SelectInseratType 
                        thisInserat={thisInserat}
                        />
                        
                    </div>
                    <div className="w-1/2">
                        
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