import { Inserat } from "@prisma/client";
import TitleInserat from "./input-fields/title-inserat";
import DescriptionInserat from "./input-fields/description-inserat";
import RentPeriod from "./input-fields/rent-period";
import SelectCategoryInserat from "./input-fields/select-category";
import { Car } from "lucide-react";
import RentPrice from "./input-fields/rent-price";


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
                    <h3 className="flex justify-center text-xl mt-16 font-semibold"><Car className="mr-4 h-6 w-6"/>
                    Spezifikationen deiner Anzeige
                    </h3>
                </div>
                <SelectCategoryInserat
                inserat={inserat}
                />
            </div>
            <div>
                <RentPrice
                inserat={inserat}
                />
            </div>
            
                
            
        </div>
     );
}
 
export default InseratBodyLeft;