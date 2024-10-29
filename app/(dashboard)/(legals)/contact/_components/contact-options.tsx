import { InstagramLogoIcon, LinkedInLogoIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { MailIcon, TwitterIcon } from "lucide-react";

const ContactOptions = () => {
    return ( 
        <div className="flex flex-col ">
            <div className="text-base text-gray-200 font-semibold">
                Schreib uns
            </div>
            <p className="text-xs text-gray-200/60">
                Schreibe unserem uRent Team im direkten Chat.
                Wir werden uns so schnell wie möglich um dich kümmern.
            </p>
            <div className="mt-8 space-y-4">
                <div className="flex flex-row text-sm underline items-center">
                  <PaperPlaneIcon className="w-4 h-4 mr-2" />  auf uRent schreiben..
                </div>
                <div className="flex flex-row text-sm underline items-center">
                    <MailIcon className="w-4 h-4 mr-2" /> Email schreiben..
                </div>
            </div>

            <div className="text-base text-gray-200 font-semibold mt-8">
                Folg uns
            </div>
            <p className="text-xs text-gray-200/60">
                Verpasse keine Neuigkeiten und bleib immer auf dem neusten Stand.
            </p>
            <div className="mt-8 space-y-4">
                <div className="flex flex-row text-sm underline items-center">
                  <InstagramLogoIcon className="w-4 h-4 mr-2" />  Instagram
                </div>
                <div className="flex flex-row text-sm underline items-center">
                    <TwitterIcon className="w-4 h-4 mr-2" /> Twitter
                </div>
                <div className="flex flex-row items-center underline text-sm">
                    <LinkedInLogoIcon className="w-4 h-4 mr-2" /> LinkedIn
                </div>
            </div>
        </div>
     );
}
 
export default ContactOptions
