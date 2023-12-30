import { Inserat } from "@prisma/client";
import TitleInserat from "./input-fields/title-inserat";
import DescriptionInserat from "./input-fields/description-inserat";
import RentPeriod from "./input-fields/rent-period";
import { Separator } from "@/components/ui/separator";

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
            <div className="mt-16 flex justify-center">
                <RentPeriod/>
                
            </div>
        </div>
     );
}
 
export default InseratBodyLeft;