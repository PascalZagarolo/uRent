import { Inserat } from "@prisma/client";

import RentPeriod from "./rent-period";
import InseratImageUpload from "./inserat-image-upload";
import { db } from "@/utils/db";

interface InseratBodyRightProps {
    inserat: Inserat;
}

const InseratBodyRight: React.FC<InseratBodyRightProps> = async ({
    inserat
}) => {

    const images = await db.images.findMany({
        where : {
            inseratId : inserat.id
        }
    })

    return (
        <div>
            <div>
                <InseratImageUpload
                images={images}
                />
            </div>
            <div className="mt-8 flex justify-center">
                <RentPeriod
                inserat={inserat}
                />
            </div>
        </div>
    );
}

export default InseratBodyRight;