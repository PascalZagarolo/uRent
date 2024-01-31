import { Button } from "@/components/ui/button";
import { Globe2Icon, MailCheckIcon, MapPin, PhoneCall, Settings2 } from "lucide-react";
import AddContactOption from "./add-contact-option";
import { ContactOptions }   from "@prisma/client";

interface ContactOptionsProps {
    contacts : ContactOptions
}

const ContactOptionsRender: React.FC<ContactOptionsProps> = ({
    contacts
}) => {
    return (
        <div className="bg-white border border-gray-300 p-4  mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-2 gap-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                {contacts.emailAddress && (
                    <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><MailCheckIcon className="p-1 rounded-md border-black border"/>
                    {contacts.emailAddress}
                    </div>
                )}
                {contacts.websiteAddress && (
                    <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><Globe2Icon className="p-1 rounded-md border-black border"/>
                    <a href=".." className="hover:underline"> {contacts.websiteAddress} </a>
                    </div>
                )}
                {contacts.addressString && (
                    <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><MapPin className="p-1 rounded-md border-black border"/>
                    {contacts.addressString}
                    </div>
                )}
                {contacts.phoneNumber && (
                    <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><PhoneCall className="p-1 rounded-md border-black border"/>
                    {contacts.phoneNumber}
                    </div>
                )}
                
                
            </div>
            <AddContactOption />
            <div className="flex-row flex">

            </div>
            <div>

            </div>
        </div>
    );
}

export default ContactOptionsRender;