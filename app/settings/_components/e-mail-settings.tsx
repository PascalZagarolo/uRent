import { Label } from "@/components/ui/label";
import { MailIcon } from "lucide-react";


interface EmailSettingsProps {
    usedEmail : string;
}

const EmailSettings: React.FC<EmailSettingsProps> = ({
    usedEmail
}) => {
    return ( 
        <div>
            <div>
                <div className="w-1/2">
                    <Label className="text-sm font-semibold px-2 flex items-center gap-x-2">
                       <MailIcon className="w-4 h-4" /> E-Mail Adresse
                    </Label>
                    
                        <div className="w-full">
                            <div className="pl-3 p-2.5 dark:bg-[#141414] border dark:border-none bg-gray-200 text-sm rounded-md">
                            {usedEmail}
                        </div>
                        
                        </div>
                  
                </div>
            </div>
        </div>
     );
}
 
export default EmailSettings;