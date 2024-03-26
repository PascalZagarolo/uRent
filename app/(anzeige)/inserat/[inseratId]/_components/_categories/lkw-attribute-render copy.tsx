
import { GearIcon } from "@radix-ui/react-icons";
import { WeightIcon } from "lucide-react";
import { FaTruckMoving } from "react-icons/fa";
import { PiCouchFill, PiEngine } from "react-icons/pi";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { TbCarCrane } from "react-icons/tb";
import { lkwAttribute } from "@/db/schema";

interface LkwAttributeRenderProps {
    attributes: typeof lkwAttribute.$inferSelect

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
            {Number(attributes?.weightClass) !== 0 && (
                <div className="bg-[#1D1F2B] p-4 font-semibold flex items-center rounded-md text-gray-200">
                    <WeightIcon className="w-4 h-4 mr-2" />   
                    { 
                        {   
                            '75' : " bis 0,75 t",
                            '150' : " bis 1,5 t",
                            '280' : " bis 2,8 t",
                            '350' : " bis 3,5 t",
                            '750' : " bis 7,5 t",
                            '1200' : " bis 12 t",
                            '1800' : " bis 18 t",
                            '2600' : " bis 26 t",
                            '3200' : " bis 32 t",
                            '3900' : " bis 39 t",
                            '5000' : " {'>'} 39 t",
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