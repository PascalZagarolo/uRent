import { transportAttribute } from "@/db/schema";

import { GearIcon } from "@radix-ui/react-icons";

import {  DoorClosedIcon, } from "lucide-react";
import { PiCouchFill, } from "react-icons/pi";
import { RiGasStationLine } from "react-icons/ri";
import { TbCarCrane } from "react-icons/tb";

interface TransportAttributeRenderProps {
    attributes: typeof transportAttribute.$inferSelect;

}


const TransportAttributeRender: React.FC<TransportAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return ( 
        <div className="w-full grid grid-cols-2 gap-4 mt-4">
            {attributes?.loading && (
                
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <TbCarCrane  className="w-4 h-4 mr-2" />    {attributes?.loading}
                </div>
            )}
            
            {attributes?.seats && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <PiCouchFill className="w-4 h-4 mr-2" />    {attributes?.seats} 
                </div>
            )}
            {attributes?.fuel && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <RiGasStationLine className="w-4 h-4 mr-2" />    {attributes?.fuel}
                </div>
            )}
            
            {attributes?.transmission && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <GearIcon className="w-4 h-4 mr-2" />    
                    
                    { 
                        {
                            'MANUAL': 'Schaltgetriebe',
                            'AUTOMATIC': 'Automatikgetriebe'
                        }[attributes?.transmission]
                    }
                </div>
            )}
            {Number(attributes?.doors) !== 0 && attributes?.doors  && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <DoorClosedIcon className="w-4 h-4 mr-2" />    {attributes?.doors}/{Number(attributes?.doors) + 1} 
                </div>
            )}
           
        </div>
     );
}
 
export default TransportAttributeRender;