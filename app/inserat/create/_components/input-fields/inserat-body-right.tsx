import { Inserat } from "@prisma/client";

import RentPeriod from "./rent-period";
import InseratImageUpload from "./inserat-image-upload";
import { db } from "@/app/utils/db";

interface InseratBodyRightProps {
    inserat: Inserat;
}

const InseratBodyRight: React.FC<InseratBodyRightProps> = async ({
    inserat
}) => {

    const images = await db.image.findMany({
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
            <div className="mt-24 flex justify-center">
                <RentPeriod
                />
            </div>
        </div>
    );
}

export default InseratBodyRight;