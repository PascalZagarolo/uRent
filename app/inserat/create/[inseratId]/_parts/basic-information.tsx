import { Images, Inserat } from "@prisma/client";
import TitleInserat from "../../_components/input-fields/title-inserat";
import DescriptionInserat from "../../_components/input-fields/description-inserat";
import SelectCategoryInserat from "../../_components/input-fields/select-category";
import ImageListForm from "../../_components/input-fields/image-list-form";
import InseratImageUpload from "../../_components/input-fields/inserat-image-upload";
import RentPeriod from "../../_components/input-fields/rent-period";


interface BasicInformationProps {
    inserat : Inserat,
    images : Images[];
}

const BasicInformation: React.FC<BasicInformationProps> = ({
    inserat,
    images
}) => {
    return ( 
        <div>
            <div>
            <TitleInserat 
               inserat={inserat}
               /> 
            </div>
            <div className="mt-4">
            <DescriptionInserat
            inserat={inserat}
            />
            </div>
            <div className="mt-4 flex w-full justify-between items-center">
                <SelectCategoryInserat
                inserat={inserat}
                />
                
            </div>
            <div className="mt-8">
                <InseratImageUpload
                images={images}
                />
            </div>
            
        </div>
     );
}
 
export default BasicInformation;