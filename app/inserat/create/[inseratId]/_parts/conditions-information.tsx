import { Address, Inserat, PkwAttribute, User } from "@prisma/client";
import SelectLocation from "../../_components/input-fields/select-location";
import SelectEmail from "../../_components/input-fields/select-email";
import PhoneNumber from "../../_components/input-fields/phone-number";
import SelectCaution from "../../_components/input-fields/select-caution";
import RequiredAge from "../../_components/input-fields/select-req-age";
import FreeMiles from "./pkw/freemiles";
import ExtraCost from "./pkw/extracost";

interface ConditionsInformationProps {
    inserat : Inserat & { pkwAttribute : PkwAttribute};
    addressComponent? : Address;
}


const ConditionsInformation: React.FC<ConditionsInformationProps> = ({
    inserat,
    addressComponent
}) => {
    return ( 
        <div className="mt-8">
            <div className="w-full flex gap-x-4">
            <div className="w-1/2">
                <SelectCaution 
                inserat={inserat}
                />
            </div>
            <div className="w-1/2">
                <RequiredAge 
                inserat={inserat}
                />
            </div>
            </div>

            <div className="w-full flex gap-x-4 mt-4">
            <div className="w-1/2">
            {inserat.category === "PKW" && (          
                  <FreeMiles 
                  inserat={inserat}
                  />      
              )}
            </div>
            <div className="w-1/2">
            {inserat.category === "PKW" && (       
                  <ExtraCost 
                  inserat={inserat}
                  />
              )}
            </div>
            </div>
            


            
        </div>
     );
}
 
export default ConditionsInformation;