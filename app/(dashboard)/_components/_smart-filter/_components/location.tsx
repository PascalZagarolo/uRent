
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

const LocationSmartFilter = () => {
    return ( 
        <div className="w-full ml-2 mr-2">
            <h3 className="flex justify-start text-lg text-gray-100 items-center rounded-md border-2 border-black bg-[#1f2332] p-2 ">
                <MapPin className="mr-4 text-rose-400 h-5 w-5" /> Standort
            </h3>
            <div className="gap-x-4 mt-4">
                
                <Input
                
                placeholder="Standort..."
                type="text"
                />
            </div>
            <div className="mt-2 flex justify-center  ">
                    <Button className="bg-[#1a1d2c] w-full border border-[#11131c]" disabled>
                        Standort zurücksetzen
                    </Button>
                </div>
            </div>
     );
}
 
export default LocationSmartFilter;