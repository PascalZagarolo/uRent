import { LkwAttribute } from "@prisma/client";
import { GearIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CarFrontIcon, ConstructionIcon, DoorClosedIcon, Globe2, MapPin, MapPinned, WeightIcon } from "lucide-react";
import { FaTruckMoving } from "react-icons/fa";
import { PiCouchFill, PiEngine } from "react-icons/pi";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { TbCarCrane } from "react-icons/tb";

interface LkwAttributeRenderProps {
    attributes: LkwAttribute

}


const LkwAttributeRender: React.FC<LkwAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return ( 
        <div className="w-full grid grid-cols-2 gap-4 mt-4 text-gray-200">
            {attributes?.lkwBrand && (
                
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <FaTruckMoving className="w-4 h-4 mr-2" />    {attributes.lkwBrand}
                </div>
            )}
            {attributes?.application && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <LiaTruckLoadingSolid className="w-4 h-4 mr-2" />    {attributes.application.substring(0,1)}{attributes.application.substring(1).toLowerCase()}
                </div>
            )}
            {attributes?.loading && (
                
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <TbCarCrane  className="w-4 h-4 mr-2" />    {attributes.loading.substring(0,1)}{attributes.loading.substring(1).toLowerCase()}   
                </div>
            )}
            {attributes?.drive && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <GearIcon className="w-4 h-4 mr-2" />    {attributes.drive.substring(1)}
                </div>
            )}
            {attributes?.weightClass && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <WeightIcon className="w-4 h-4 mr-2" />   Gewichtsklasse :
                    { 
                        {
                            '3' : " bis 3,5 t",
                            '5' : " 3,5 - 5,0 t",
                            '7' : " 5,0 - 7,5 t",
                            '12' : " 7,5 - 12 t",
                            '26' : " 12 - 26 t",
                            '40' : " 26 - 40 t",
                        }[attributes.weightClass]
                    }

                </div>
            )}

            {attributes?.seats && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <PiCouchFill className="w-4 h-4 mr-2" />    {attributes.seats} {attributes.seats > 1 ? 'Sitze' : 'Sitz'}
                </div>
            )}
            
        </div>
     );
}
 
export default LkwAttributeRender;