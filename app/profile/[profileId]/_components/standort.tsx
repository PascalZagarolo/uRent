import { businessAddress } from "@/db/schema";
import { MapPinIcon } from "lucide-react";
import Image from "next/image";

interface StandortProps {
    thisStandort : typeof businessAddress.$inferSelect;
}

const Standort: React.FC<StandortProps> = ({
    thisStandort
}) => {
    return ( 
        <div>
            <div className="dark:bg-[#191919]  rounded-t-md ">
                    <div className="gap-4 flex p-4 mt-4">
                        <MapPinIcon className="h-4 w-4" />
                        <div className="text-sm font-semibold">
                            {thisStandort?.street}, {thisStandort?.postalCode} {thisStandort?.city}, Deutschland
                        </div>
                    </div>
                    <div className="w-full h-[100px] px-2 pb-2">
                        <Image
                            alt="map"
                            src={thisStandort?.image}
                            width={500}
                            height={300}
                            className="w-full object-cover h-[100px]"
                        />
                    </div>
                </div>
            
            
        </div>
     );
}
 
export default Standort;