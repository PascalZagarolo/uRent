import { Inserat } from "@prisma/client";
import TitleInserat from "./input-fields/title-inserat";

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
        </div>
     );
}
 
export default InseratBodyLeft;