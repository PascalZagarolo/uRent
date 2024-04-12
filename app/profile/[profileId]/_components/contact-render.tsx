import { Button } from "@/components/ui/button";
import { GlobeIcon, MailIcon, PhoneIcon, Share2Icon } from "lucide-react";
import EditContactsDialog from "./edit-contacts-dialog";


interface ContactRenderProps {
    
    ownProfile : boolean
}

const ContactRender = () => {
    return (
        <div className="p-4 dark:bg-[#191919] rounded-md">
            <h1 className="font-semibold flex items-center">
                Kontakt
                <div className="ml-auto">
                    <EditContactsDialog />
                </div>
            </h1>
            <div className="mt-10 space-y-2">
            <div className="font-semibold text-sm flex gap-x-2">
                    <GlobeIcon className="w-4 h-4" />urent-rental.de
                </div>
                <div className="font-semibold text-sm flex gap-x-2">
                    <MailIcon className="w-4 h-4" /> support@urent-rental.de
                </div>
                <div className="font-semibold text-sm flex gap-x-2">
                    <PhoneIcon className="w-4 h-4" />Tel. +49 17231823 33
                </div>
            </div>
        </div>
    );
}

export default ContactRender;