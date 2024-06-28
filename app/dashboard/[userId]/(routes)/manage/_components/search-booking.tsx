import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SearchBookingInput = () => {
    return ( 
        <div className="w-full">
            <div>
                <div>
                    <Label className="text-sm font-semibold">
                        Nach Buchungen suchen
                    </Label>
                </div>
                <Input 
                 className="w-full bg-[#0F0F0F] dark:border-none"
                 placeholder="Buchungsnr. , Name, Interne Buchungsnr..."
                />
            </div>
        </div>
     );
}
 
export default SearchBookingInput;