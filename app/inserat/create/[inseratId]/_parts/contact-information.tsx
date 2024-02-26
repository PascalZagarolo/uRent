import { Inserat, User } from "@prisma/client";
import SelectLocation from "../../_components/input-fields/select-location";
import SelectEmail from "../../_components/input-fields/select-email";

interface ContactInformationProps {
    inserat : Inserat & { user : User};
}


const ContactInformation: React.FC<ContactInformationProps> = ({
    inserat
}) => {
    return ( 
        <div className="mt-8">
            <div className="w-full flex gap-x-4">
            <div className="w-1/2">
                <SelectLocation
                inserat={inserat}
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