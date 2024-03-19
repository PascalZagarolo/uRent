
import SelectLocation from "../../_components/input-fields/select-location";
import SelectEmail from "../../_components/input-fields/select-email";
import PhoneNumber from "../../_components/input-fields/phone-number";
import { address, inserat } from "@/db/schema";

interface ContactInformationProps {
    thisInserat : typeof inserat.$inferSelect;
    thisAddressComponent? : typeof address.$inferSelect;
}


const ContactInformation: React.FC<ContactInformationProps> = ({
    thisInserat,
    thisAddressComponent
}) => {
    return ( 
        <div className="mt-8">
            <div className="w-full flex gap-x-4">
            <div className="w-1/2">
                <SelectLocation
                thisInserat={thisInserat}
                thisAddressComponent={thisAddressComponent}
                />
            </div>
            <div className="w-1/2">
                <SelectEmail
                thisInserat = {thisInserat}
                />
            </div>
            </div>
            <div className="mt-4 w-1/2">
                <PhoneNumber
                thisInserat={thisInserat}
                />
            </div>
        </div>
     );
}
 
export default ContactInformation;