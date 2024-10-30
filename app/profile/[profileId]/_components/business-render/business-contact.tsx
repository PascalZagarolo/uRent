
import { Globe2Icon, MailsIcon, PencilIcon, PhoneCallIcon } from "lucide-react";

import EditContactsDialog from "../edit-contacts-dialog";
import { business } from "@/db/schema";
import { FaFax } from "react-icons/fa";

interface BusinessContactProps {
    telephone: string;
    email: string;
    website: string;
    fax: string;
    ownProfile: boolean;
    thisBusiness : typeof business.$inferSelect;
}


const BusinessContact = ({ telephone, email, website, fax, ownProfile, thisBusiness }: BusinessContactProps) => {
    return (
        <div className="flex flex-col items-start text-gray-200/80 space-y-1 px-4 md:px-0">
            {ownProfile && (
                <div className="mt-4 md:ml-auto mr-8 mb-4">
                    <EditContactsDialog 
                thisBusiness={thisBusiness}
                />
                </div>
            )}
            {email && (
                <div className="w-full text-gray-200 flex flex-row items-center font-semibold">
                    
                    <span className="line-clamp-1 break-all w-3/4 ">
                        {email}
                    </span>
                </div>
            )}
            {website && (
                <div className="w-full text-gray-200/95 flex flex-row items-center text-sm">
                    <div>
                        <Globe2Icon className="w-4 h-4 mr-2" />
                    </div>
                    <span className="line-clamp-1 break-all w-3/4">
                        {website}
                    </span>
                </div>
            )}
            
            {telephone && (
                <div className="w-full text-gray-200/90 flex flex-row items-center text-sm">
                    <div>
                        <PhoneCallIcon className="w-4 h-4 mr-2" />
                    </div>
                    <span className="line-clamp-1 break-all w-3/4">
                        {telephone}
                    </span>
                </div>
            )}
            {fax && (
                <div className="w-full text-gray-200/90 flex flex-row items-center text-sm">
                    <div>
                        <FaFax className="w-4 h-4 mr-2" />
                    </div>
                    <span className="line-clamp-1 break-all w-3/4">
                        {fax}
                    </span>
                </div>
            )}
        </div>
    );
}

export default BusinessContact;