'use client'

import { Button } from "@/components/ui/button";
import { Globe2Icon, MailCheckIcon, MapPin, PhoneCall, Settings2 } from "lucide-react";
import AddContactOption from "./add-contact-option";

import { cn } from "@/lib/utils";
import { contactOptions } from "@/db/schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ContactOptionsProps {
    thisContactOptions: typeof contactOptions.$inferSelect;
    ownProfile: boolean;
}

const ContactOptionsRender: React.FC<ContactOptionsProps> = ({
    thisContactOptions,
    ownProfile
}) => {
    console.log(thisContactOptions?.userAddress?.postalCode)
    const router = useRouter();

    const nothingAdded = !thisContactOptions?.emailAddress && !thisContactOptions?.websiteAddress && !thisContactOptions?.phoneNumber ? true : false;

    return (
        <div className="bg-white dark:bg-[#191919]  dark:border-[#191919] border border-gray-300 p-4 mt-2 ">
            <div className={cn("gap-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]", nothingAdded ? "" : "grid grid-cols-2")}>

                {nothingAdded && (
                    <p className="flex text-gray-900/50 justify-center italic font-medium dark:text-gray-100/70">
                        Keine Kontaktmöglichkeiten hinzugefügt...
                    </p>
                )}

                {thisContactOptions?.emailAddress && (
                    <div className="bg-gray-300 dark:bg-[#171717] p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]
                    sm:text-base text-sm">
                        <MailCheckIcon className="p-1 rounded-md border-black border" />
                        {thisContactOptions.emailAddress}
                    </div>
                )}

                {thisContactOptions?.userAddress?.postalCode && thisContactOptions?.userAddress?.street &&
                thisContactOptions?.userAddress?.city &&  (
                    <div className="bg-gray-300 dark:bg-[#171717] text-gray-200 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] sm:text-base text-sm truncate">
                        <MailCheckIcon className="p-1 rounded-md border-black border" />
                        
                        {thisContactOptions?.userAddress?.street} {thisContactOptions?.userAddress?.houseNumber}, {thisContactOptions?.userAddress?.postalCode} {thisContactOptions?.userAddress?.city}
                    </div>
                )}

                {thisContactOptions?.websiteAddress && (
                    <div className="bg-gray-300 dark:bg-[#171717] sm:text-base text-sm p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]"><Globe2Icon className="p-1 rounded-md border-black border" />
                        <a href={`//${thisContactOptions.websiteAddress}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {thisContactOptions.websiteAddress} 
                        </a>
                    </div>
                )}

                {thisContactOptions?.phoneNumber && (
                    <div className="bg-gray-300 dark:bg-[#171717] p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]"><PhoneCall className="p-1 rounded-md border-black border" />
                        {thisContactOptions.phoneNumber}
                    </div>
                )}


            </div>
            {ownProfile && (
                <AddContactOption
                    thisContactOptions={thisContactOptions}
                />
            )}
        </div>
    );
}

export default ContactOptionsRender;