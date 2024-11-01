
import { GearIcon } from "@radix-ui/react-icons";
import { ConstructionIcon, WeightIcon } from "lucide-react";
import { FaTruckMoving } from "react-icons/fa";
import { PiCouchFill, PiEngine } from "react-icons/pi";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { TbCarCrane } from "react-icons/tb";
import { lkwAttribute } from "@/db/schema";
import { LuAxis3D } from "react-icons/lu";
import { HiCubeTransparent } from "react-icons/hi";
import { GiResize } from "react-icons/gi";
import { format } from "date-fns";

interface LkwAttributeRenderProps {
    attributes: typeof lkwAttribute.$inferSelect

}


const LkwAttributeRender: React.FC<LkwAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return (
        <div className="w-full grid grid-cols-2 gap-2 mt-4 text-gray-200">
            {attributes?.lkwBrand && (

                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <FaTruckMoving className="w-4 h-4 mr-2" />    {attributes.lkwBrand}
                </div>
            )}
            {attributes?.initial && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <ConstructionIcon className="w-4 h-4 mr-2" />  Baujahr : {format(new Date(attributes?.initial), "yyyy")}
                </div>
            )}
            {attributes?.application && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <LiaTruckLoadingSolid className="w-4 h-4 mr-2" />    {attributes.application.substring(0, 1)}{attributes.application.substring(1).toLowerCase()}
                </div>
            )}
            {attributes?.loading && (

                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <TbCarCrane className="w-4 h-4 mr-2" />    {attributes.loading.substring(0, 1)}{attributes.loading.substring(1).toLowerCase()}
                </div>
            )}
            {attributes?.drive && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <GearIcon className="w-4 h-4 mr-2" />    {attributes.drive.substring(1)}
                </div>
            )}
            {attributes?.weightClass && attributes?.weightClass != 0 && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <WeightIcon className="w-4 h-4 mr-2" />
                    {
                        {
                            '75': " bis 0,75 t",
                            '150': " bis 1,5 t",
                            '280': " bis 2,8 t",
                            '350': " bis 3,5 t",
                            '750': " bis 7,5 t",
                            '1200': " bis 12 t",
                            '1800': " bis 18 t",
                            '2600': " bis 26 t",
                            '3200': " bis 32 t",
                            '3900': " bis 39 t",
                            '5000': " {'>'} 39 t",
                        }[attributes?.weightClass]
                    }
                </div>
            )}
            
            {attributes?.seats && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <PiCouchFill className="w-4 h-4 mr-2" />    {attributes.seats} {attributes.seats > 1 ? 'Sitze' : 'Sitz'}
                </div>
            )}

            {attributes?.axis && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <LuAxis3D className="w-4 h-4 mr-2" />    {
                        {
                            '1': "Einachser",
                            '2': "Zweiachser",
                            '3': "Dreiachser",
                            '4': "Vierachser",
                            '5': " > 4 Achsen"
                        }[attributes?.axis]
                    }
                </div>
            )}

            {attributes?.power && (

                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <PiEngine className="w-4 h-4 mr-2" />    {attributes.power} PS
                </div>
            )}

            {attributes?.loading_volume && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <HiCubeTransparent className="w-4 h-4 mr-2" />    {attributes.loading_volume} l
                </div>
            )}

            {attributes?.loading_l || attributes?.loading_b || attributes?.loading_h && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <GiResize className="w-4 h-4 mr-2" />    {attributes?.loading_l} x {attributes?.loading_b} x {attributes?.loading_h} m
                </div>
            )}

        </div>
    );
}

export default LkwAttributeRender;