import { PkwAttribute } from "@prisma/client";
import { Globe2, MapPin, MapPinned } from "lucide-react";
import { PiEngine } from "react-icons/pi";

interface PkwAttributeRenderProps {
    attributes: PkwAttribute

}


const PkwAttributeRender: React.FC<PkwAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return ( 
        <div className="w-full grid grid-cols-2 gap-4 mt-4">
            {attributes?.power && (
                
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center">
                    <PiEngine className="w-4 h-4 mr-2" />    {attributes.power} PS 
                </div>
            )}
            {attributes?.freeMiles && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center">
                    <Globe2 className="w-4 h-4 mr-2" />    {attributes.freeMiles} Freikilometer
                </div>
            )}
        </div>
     );
}
 
export default PkwAttributeRender;