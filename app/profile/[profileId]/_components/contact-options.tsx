import { Button } from "@/components/ui/button";
import { Globe2Icon, MailCheckIcon, MapPin, Settings2 } from "lucide-react";
import AddContactOption from "./add-contact-option";

const ContactOptions = () => {
    return (
        <div className="bg-white border border-gray-300 p-4  mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-2 gap-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><MailCheckIcon className="p-1 rounded-md border-black border"/>
                test@test.com
                </div>
                <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><Globe2Icon className="p-1 rounded-md border-black border"/>
                <a href=".." className="hover:underline"> www.test.com/ </a>
                </div>
                <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><MapPin className="p-1 rounded-md border-black border"/>
                Nordrhein-Westfalen, 42637 Solingen
                </div>
                <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><MailCheckIcon className="p-1 rounded-md border-black border"/>
                test@test.com
                </div>
                <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><MailCheckIcon className="p-1 rounded-md border-black border"/>
                test@test.com
                </div>
                <div className="bg-gray-300 p-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><MailCheckIcon className="p-1 rounded-md border-black border"/>
                test@test.com
                </div>
                
            </div>
            <AddContactOption />
            <div className="flex-row flex">

            </div>
            <div>

            </div>
        </div>
    );
}

export default ContactOptions;