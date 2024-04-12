import { Button } from "@/components/ui/button";
import { GlobeIcon, MailIcon, PhoneIcon, Share2Icon } from "lucide-react";
import EditContactsDialog from "./edit-contacts-dialog";
import { business } from "@/db/schema";
import { FaFax } from "react-icons/fa6";


interface ContactRenderProps {
    thisBusiness : typeof business.$inferSelect;
    ownProfile : boolean
}

const ContactRender : React.FC<ContactRenderProps> = ({
    thisBusiness,
    ownProfile
}) => {
    return (
        <div className="p-4 dark:bg-[#191919] rounded-md">
            <h1 className="font-semibold flex items-center">
                Kontakt
                <div className="ml-auto">
                    <EditContactsDialog 
                    thisBusiness={thisBusiness}
                    />
                </div>
            </h1>
            <div className="mt-10 space-y-2">
            {thisBusiness?.website && (
                <div className="font-semibold text-sm flex gap-x-2">
                <GlobeIcon className="w-4 h-4" />{thisBusiness?.website}
            </div>
            )}
            {thisBusiness?.email && (
                <div className="font-semibold text-sm flex gap-x-2">
                <MailIcon className="w-4 h-4" /> {thisBusiness?.email}
            </div>
            )}
            {thisBusiness?.telephone_number && (
                <div className="font-semibold text-sm flex gap-x-2">
                <PhoneIcon className="w-4 h-4" />Tel. {thisBusiness?.telephone_number}
            </div>
            )}
            {thisBusiness?.fax && (
                <div className="font-semibold text-sm flex gap-x-2">
                <FaFax className="w-4 h-4" />Fax : {thisBusiness?.fax}
            </div>
            )}
                
                
            </div>
        </div>
    );
}

export default ContactRender;