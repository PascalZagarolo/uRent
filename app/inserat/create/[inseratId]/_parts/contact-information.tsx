
import SelectLocation from "../../_components/input-fields/select-location";
import SelectEmail from "../../_components/input-fields/select-email";
import PhoneNumber from "../../_components/input-fields/phone-number";
import { address, inserat, userTable } from "@/db/schema";
import { contactOptions, userAddress } from '../../../../../db/schema';

interface ContactInformationProps {
    thisInserat : typeof inserat.$inferSelect;
    thisAddressComponent? : typeof address.$inferSelect;
    currentUserWithContactOptions : typeof userTable.$inferSelect;
}


const ContactInformation: React.FC<ContactInformationProps> = async ({
    thisInserat,
    thisAddressComponent,
    currentUserWithContactOptions,

}) => {

    
    return ( 
        <div className="mt-8">
            <div className="w-full sm:flex sm:gap-x-4 space-y-4 sm:space-y-0">
            <div className="sm:w-1/2 w-full">
                <SelectLocation
                thisInserat={thisInserat}
                thisAddressComponent={thisAddressComponent}
                usedContactOptions = {currentUserWithContactOptions.contactOptions}
                />
            </div>
            <div className="sm:w-1/2 w-full">
                <SelectEmail
                thisInserat = {thisInserat}
                usedContactOptions = {currentUserWithContactOptions.contactOptions}
                
                />
            </div>
            </div>
            <div className="mt-4 sm:w-1/2 w-full">
                <PhoneNumber
                thisInserat={thisInserat}
                />
            </div>
        </div>
     );
}
 
export default ContactInformation;