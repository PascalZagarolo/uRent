import { Address, Inserat, User } from "@prisma/client";
import SelectLocation from "../../_components/input-fields/select-location";
import SelectEmail from "../../_components/input-fields/select-email";

interface ContactInformationProps {
    inserat : Inserat & { user : User};
    addressComponent? : Address;
}


const ContactInformation: React.FC<ContactInformationProps> = ({
    inserat,
    addressComponent
}) => {
    return ( 
        <div className="mt-8">
            <div className="w-full flex gap-x-4">
            <div className="w-1/2">
                <SelectLocation
                inserat={inserat}
                addressComponent={addressComponent}
                />
            </div>
            <div className="w-1/2">
                <SelectEmail
                inserat = {inserat}
                />
            </div>
            </div>
        </div>
     );
}
 
export default ContactInformation;