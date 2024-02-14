
import CreationHeader from "../_components/creation-header";
import InseratBodyLeft from "../_components/inserat-body-left";
import { db } from "@/utils/db";
import InseratBodyRight from "../_components/input-fields/inserat-body-right";
import CreationHeaderLogo from "../_components/creation-logo";
import MoreDetails from "../_components/more-details";


const InseratCreation = async ({
    params
} : { params : { inseratId : string }}) => {

    const inserat = await db.inserat.findUnique({
        where : {
            id : params.inseratId
        }
    })

    return (
        <div className="bg-[#404040]/10 min-h-screen overflow-y-scroll ">
            <div className="flex justify-center">
                <CreationHeaderLogo/>
            </div>
                
            <div className="flex justify-center ">
                <CreationHeader 
                inserat={inserat}
                />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                
                <div className="col-span-1 ">
                <MoreDetails
                inserat = {inserat}
                />
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