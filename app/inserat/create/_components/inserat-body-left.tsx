import { Inserat } from "@prisma/client";
import TitleInserat from "./input-fields/title-inserat";
import DescriptionInserat from "./input-fields/description-inserat";
import RentPeriod from "./input-fields/rent-period";
import SelectCategoryInserat from "./input-fields/select-category";


interface InseratBodyLeftProps {
    inserat : Inserat;
}

const InseratBodyLeft: React.FC<InseratBodyLeftProps> = ({
    inserat
}) => {
    return ( 
        <div>
            <TitleInserat
            inserat={inserat}
            />
            <div className="mt-8">
                <DescriptionInserat
                inserat={inserat}
                />
            </div>
            <div className="ml-8 mr-8">
                <div >
                    <h3 className="flex justify-center text-xl mt-16 font-semibold">Spezifikationen deines Fahrzeugs</h3>
                </div>
                <SelectCategoryInserat/>
            </div>
            
                
            
        </div>
     );
}
 
export default InseratBodyLeft;