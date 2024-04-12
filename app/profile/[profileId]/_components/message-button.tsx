import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

const MessageButton = () => {
    return ( 
        <div>
            <Button className="gap-x-2 font-semibold" variant="ghost">
                  <MailIcon className="w-6 h-6" /> <p className="hidden sm:block">Nachricht schreiben</p>
            </Button>
        </div>
     );
}
 
export default MessageButton;