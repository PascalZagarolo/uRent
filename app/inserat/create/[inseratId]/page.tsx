
import CreationHeader from "../_components/creation-header";
import InseratBodyLeft from "../_components/inserat-body-left";
import { db } from "@/utils/db";
import InseratBodyRight from "../_components/input-fields/inserat-body-right";
import CreationHeaderLogo from "../_components/creation-logo";

const InseratCreation = async ({
    params
} : { params : { inseratId : string }}) => {

    const inserat = await db.inserat.findUnique({
        where : {
            id : params.inseratId
        }
    })

    return (
        <div className="bg-[#404040]/10 h-screen overflow-hidden">
            <div className="flex justify-center">
                <CreationHeaderLogo/>
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