import { PkwAttribute } from "@prisma/client";
import { GearIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CarFrontIcon, ConstructionIcon, DoorClosedIcon, Globe2, MapPin, MapPinned } from "lucide-react";
import { PiCouchFill, PiEngine } from "react-icons/pi";
import { RiGasStationLine } from "react-icons/ri";

interface PkwAttributeRenderProps {
    attributes: PkwAttribute

}


const PkwAttributeRender: React.FC<PkwAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return ( 
        <div className="w-full grid grid-cols-2 gap-4 mt-4">
            {attributes?.brand && (
                
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md">
                    <CarFrontIcon className="w-4 h-4 mr-2" />    {attributes.brand}
                </div>
            )}
            {attributes?.power && (
                
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md">
                    <PiEngine className="w-4 h-4 mr-2" />    {attributes.power} PS 
                </div>
            )}
            {attributes?.freeMiles && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md">
                    <Globe2 className="w-4 h-4 mr-2" />    {attributes.freeMiles} Freikilometer
                </div>
            )}
            {attributes?.seats && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md">
                    <PiCouchFill className="w-4 h-4 mr-2" />    {attributes.seats} Sitze
                </div>
            )}
            {attributes?.fuel && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md">
                    <RiGasStationLine className="w-4 h-4 mr-2" />    {attributes.fuel}
                </div>
            )}
            {attributes?.doors && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md">
                    <DoorClosedIcon className="w-4 h-4 mr-2" />    {attributes.doors}/{Number(attributes.doors) + 1} Türer
                </div>
            )}
            {attributes?.transmission && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md">
                    <GearIcon className="w-4 h-4 mr-2" />    
                    
                    { 
                        {
                            'MANUAL': 'Schaltgetriebe',
                            'AUTOMATIC': 'Automatikgetriebe'
                        }[attributes.transmission]
                    }
                </div>
            )}
            {attributes?.initial && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md">
                    <ConstructionIcon className="w-4 h-4 mr-2" />  Baujahr : {format(new Date(attributes?.initial), "MM/yyyy")} 
                    
                    
                </div>
            )}
        </div>
     );
}
 
export default PkwAttributeRender;