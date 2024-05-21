

import SelectCaution from "../../_components/input-fields/select-caution";
import RequiredAge from "../../_components/input-fields/select-req-age";
import FreeMiles from "./pkw/freemiles";
import ExtraCost from "./pkw/extracost";
import { address, inserat } from "@/db/schema";
import { pkwAttribute } from '../../../../../db/schema';
import SelectLicenseInserat from "../../_components/input-fields/select-license";

interface ConditionsInformationProps {
    thisInserat : typeof inserat.$inferSelect & { thisPkwAttribute : typeof pkwAttribute.$inferSelect};
    thisAddressComponent? : typeof address.$inferSelect;
}


const ConditionsInformation: React.FC<ConditionsInformationProps> = ({
    thisInserat,
    thisAddressComponent
}) => {
    return ( 
        <div className="mt-8">
            
            <div className="w-full sm:flex sm:gap-x-4 space-y-4 sm:space-y-0">
            <div className="sm:w-1/3 w-full">
                <SelectCaution 
                thisInserat={thisInserat}
                />
            </div>
            
            <div className="sm:w-1/3 w-full">
                <RequiredAge 
                thisInserat={thisInserat}
                />
            </div>
            <div className="sm:w-1/3 w-full">
            <SelectLicenseInserat
                        thisInserat={thisInserat}
                    />
            </div>
            </div>

        </div>
     );
}
 
export default ConditionsInformation;