import { transportAttribute } from "@/db/schema";

import { GearIcon } from "@radix-ui/react-icons";

import { DoorClosedIcon, WeightIcon, } from "lucide-react";
import { GiResize } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { PiCouchFill, PiEngine, PiVanFill, } from "react-icons/pi";
import { RiCaravanFill, RiGasStationLine } from "react-icons/ri";
import { TbCarCrane } from "react-icons/tb";

interface TransportAttributeRenderProps {
    attributes: typeof transportAttribute.$inferSelect;

}


const TransportAttributeRender: React.FC<TransportAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return (
        <div className="w-full grid grid-cols-2 gap-2 mt-4">
            {attributes?.loading && (

                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <TbCarCrane className="w-4 h-4 mr-2" />    {attributes?.loading}
                </div>
            )}

            {attributes?.seats && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <PiCouchFill className="w-4 h-4 mr-2" />    {attributes?.seats}
                </div>
            )}
            {attributes?.fuel && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <RiGasStationLine className="w-4 h-4 mr-2" />    {attributes?.fuel}
                </div>
            )}

            {attributes?.transmission && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <GearIcon className="w-4 h-4 mr-2" />

                    {
                        {
                            'MANUAL': 'Schaltgetriebe',
                            'SEMI_AUTOMATIC': 'Schaltgetriebe',
                            'AUTOMATIC': 'Automatikgetriebe'
                        }[attributes?.transmission]
                    }
                </div>
            )}
            {Number(attributes?.doors) !== 0 && attributes?.doors && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <DoorClosedIcon className="w-4 h-4 mr-2" />    {attributes?.doors}/{Number(attributes?.doors) + 1}
                </div>
            )}

            {attributes?.weightClass && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
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

            {attributes?.extraType && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <RiCaravanFill className="w-4 h-4 mr-2" />    {attributes?.extraType?.substring(0, 1)}{attributes?.extraType?.substring(1).toLowerCase()}
                </div>
            )}

            {attributes?.power && (

                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <PiEngine className="w-4 h-4 mr-2" />    {attributes.power} PS
                </div>
            )}

            {attributes?.loading_volume && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <HiCubeTransparent className="w-4 h-4 mr-2" />    {attributes.loading_volume} l
                </div>
            )}

            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <GiResize className="w-4 h-4 mr-2" />    {attributes?.loading_l} x {attributes?.loading_b} x {attributes?.loading_h} m
                </div>
            )}

            {attributes?.transportBrand && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center text-gray-200">
                    <PiVanFill className="w-4 h-4 mr-2" />    {attributes?.transportBrand}
                </div>

            )}
        </div>
    );
}

export default TransportAttributeRender;