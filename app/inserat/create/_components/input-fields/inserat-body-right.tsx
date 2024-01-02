import { Inserat } from "@prisma/client";

import RentPeriod from "./rent-period";
import InseratImageUpload from "./inserat-image-upload";

interface InseratBodyRightProps {
    inserat: Inserat;
}

const InseratBodyRight: React.FC<InseratBodyRightProps> = ({
    inserat
}) => {
    return (
        <div>
            <div>
                <InseratImageUpload
                inserat={inserat}
                />
            </div>
            <div className="mt-32 flex justify-center">
                <RentPeriod
                />
            </div>
        </div>
    );
}

export default InseratBodyRight;