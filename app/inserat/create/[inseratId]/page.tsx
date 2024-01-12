import Logo from "@/app/profile/[profileId]/_components/u-rent-logo";
import CreationHeader from "../_components/creation-header";
import InseratBodyLeft from "../_components/inserat-body-left";
import { db } from "@/utils/db";
import InseratBodyRight from "../_components/input-fields/inserat-body-right";

const InseratCreation = async ({
    params
} : { params : { inseratId : string }}) => {

    const inserat = await db.inserat.findUnique({
        where : {
            id : params.inseratId
        }
    })

    return (
        <div>
            <div className="mt-8 flex justify-center">
                <Logo />
            </div>

            <div className="flex justify-center mt-8">
                <CreationHeader 
                inserat={inserat}
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="col-span-1 ">
                    <InseratBodyLeft
                    inserat = {inserat}
                    />
                </div>
                <div className="col-span-1 ">
                    <InseratBodyRight
                    inserat={inserat}
                    />
                </div>
            </div>

        </div>
    );
}

export default InseratCreation;