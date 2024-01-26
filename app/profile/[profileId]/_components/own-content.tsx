import OwnContentSlide from "./own-content-slide";
import { Inserat, Images } from '@prisma/client';

interface OwnContentProps {
    inserate : Inserat[] & { images : Images[] }[]
}

const OwnContent: React.FC<OwnContentProps> = ({
    inserate
}) => {
    return ( 
        <div className="">
            <OwnContentSlide
            inserat={inserate}
            />
        </div>
     );
}
 
export default OwnContent;