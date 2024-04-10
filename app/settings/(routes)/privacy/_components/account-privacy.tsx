import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { User2Icon } from "lucide-react";

const AccountPrivacy = () => {
    return ( 
        <div>
            <h1 className="font-semibold flex items-center">
              <User2Icon className="w-4 h-4 mr-2" />  Account-Einstellungen
            </h1>
            <div className="mt-4 space-y-4">
                <div className="flex items-center gap-x-2">
                    <Checkbox className="w-4 h-4"/> <Label className="font-semibold"> E-Mail teilen</Label>
                </div>
                <div className="flex items-center gap-x-2">
                    <Checkbox className="w-4 h-4"/> <Label className="font-semibold"> Echten Namen teilen</Label>
                </div>
                

            </div>
        </div>
     );
}
 
export default AccountPrivacy;