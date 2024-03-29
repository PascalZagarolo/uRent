import { Button } from "@/components/ui/button";
import { Globe2Icon, MailCheckIcon, MapPin, PhoneCall, Settings2 } from "lucide-react";
import AddContactOption from "./add-contact-option";

import { cn } from "@/lib/utils";
import { contactOptions } from "@/db/schema";

interface ContactOptionsProps {
    contacts : typeof contactOptions.$inferSelect;
    ownProfile : boolean;
}

const ContactOptionsRender: React.FC<ContactOptionsProps> = ({
    contacts,
    ownProfile
}) => {

    const nothingAdded = !contacts?.emailAddress && !contacts?.websiteAddress &&  !contacts?.phoneNumber ? true : false;

    return (
        <div className="bg-white dark:bg-[#191919]  dark:border-[#191919] border border-gray-300 p-4 mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
            <div className={cn("gap-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]" , nothingAdded ? "" : "grid grid-cols-2")}>

            { nothingAdded && (
                    <p className="flex text-gray-900/50 justify-center italic font-medium dark:text-gray-100/70">
                        Keine Kontaktmöglichkeiten hinzugefügt...
                    </p>
                )}

                {contacts?.emailAddress && (
                    <div className="bg-gray-300 dark:bg-[#171717] p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><MailCheckIcon className="p-1 rounded-md border-black border"/>
                    {contacts.emailAddress}
                    </div>
                )}
                {contacts?.websiteAddress && (
                    <div className="bg-gray-300 dark:bg-[#171717] p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><Globe2Icon className="p-1 rounded-md border-black border"/>
                    <a href=".." className="hover:underline"> {contacts.websiteAddress} </a>
                    </div>
                )}
              
                {contacts?.phoneNumber && (
                    <div className="bg-gray-300 dark:bg-[#171717] p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><PhoneCall className="p-1 rounded-md border-black border"/>
                    {contacts.phoneNumber}
                    </div>
                )}
                
                
            </div>
            {ownProfile && (
                <AddContactOption />
            )}
        </div>
    );
}

export default ContactOptionsRender;