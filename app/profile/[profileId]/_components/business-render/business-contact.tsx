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
        <div className="flex flex-col p-6 bg-[#16161f] rounded-lg shadow-sm border border-indigo-900/30 h-full">
            <div className="flex items-center justify-between w-full mb-4">
                <h3 className="text-lg font-semibold text-gray-200 flex items-center">
                    <div className="bg-indigo-600/20 p-1 rounded-md mr-2 flex items-center justify-center">
                        <PhoneCallIcon className="w-4 h-4 text-indigo-400" />
                    </div>
                    Kontakt
                </h3>
                {ownProfile && (
                    <EditContactsDialog 
                        thisBusiness={thisBusiness}
                    />
                )}
            </div>
            <div className="w-full space-y-4 flex-grow">
                {email && (
                    <div className="w-full text-gray-200 flex flex-row items-center font-medium hover:bg-indigo-900/20 p-2 rounded-md transition-all duration-200">
                        <div className="bg-indigo-600/20 p-1.5 rounded-md mr-3">
                            <MailsIcon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <span className="line-clamp-1 break-all">
                            {email}
                        </span>
                    </div>
                )}
                {website && (
                    <div className="w-full text-gray-200 flex flex-row items-center hover:bg-indigo-900/20 p-2 rounded-md transition-all duration-200">
                        <div className="bg-indigo-600/20 p-1.5 rounded-md mr-3">
                            <Globe2Icon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <span className="line-clamp-1 break-all">
                            {website}
                        </span>
                    </div>
                )}
                {telephone && (
                    <div className="w-full text-gray-200 flex flex-row items-center hover:bg-indigo-900/20 p-2 rounded-md transition-all duration-200">
                        <div className="bg-indigo-600/20 p-1.5 rounded-md mr-3">
                            <PhoneCallIcon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <span className="line-clamp-1 break-all">
                            {telephone}
                        </span>
                    </div>
                )}
                {fax && (
                    <div className="w-full text-gray-200 flex flex-row items-center hover:bg-indigo-900/20 p-2 rounded-md transition-all duration-200">
                        <div className="bg-indigo-600/20 p-1.5 rounded-md mr-3">
                            <FaFax className="w-5 h-5 text-indigo-400" />
                        </div>
                        <span className="line-clamp-1 break-all">
                            {fax}
                        </span>
                    </div>
                )}
                {!email && !website && !telephone && !fax && (
                    <div className="flex-grow flex justify-center items-center">
                        <p className="text-gray-200/60 text-sm">Keine Kontaktinformationen hinterlegt</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BusinessContact;