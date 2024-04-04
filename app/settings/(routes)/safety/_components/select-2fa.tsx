import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Select2Fa = () => {
    return ( 
        <div>
            <div>
                <div className="w-1/2">
                    <Checkbox />
                    <Label className="text-sm font-semibold p-2">
                        2FA Aktivieren
                    </Label>

                   
                </div>
            </div>
        </div>
     );
}
 
export default Select2Fa;