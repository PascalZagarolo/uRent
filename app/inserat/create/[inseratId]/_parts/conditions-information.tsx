

import SelectCaution from "../../_components/input-fields/select-caution";
import RequiredAge from "../../_components/input-fields/select-req-age";
import FreeMiles from "./pkw/freemiles";
import ExtraCost from "./pkw/extracost";
import { address, inserat } from "@/db/schema";
import { pkwAttribute } from '../../../../../db/schema';

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
            
            <div className="w-full flex gap-x-4">
            <div className="w-1/2">
                <SelectCaution 
                thisInserat={thisInserat}
                />
            </div>
            <div className="w-1/2">
                <RequiredAge 
                thisInserat={thisInserat}
                />
            </div>
            </div>

            <div className="w-full flex gap-x-4 mt-4">
            <div className="w-1/2">
            {thisInserat.category === "PKW" && (          
                  <FreeMiles 
                  thisInserat={thisInserat}
                  />      
              )}
            </div>
            <div className="w-1/2">
            {thisInserat.category === "PKW" && (       
                  <ExtraCost 
                  thisInserat={thisInserat}
                  />
              )}
            </div>
            </div>
            


            
        </div>
     );
}
 
export default ConditionsInformation;