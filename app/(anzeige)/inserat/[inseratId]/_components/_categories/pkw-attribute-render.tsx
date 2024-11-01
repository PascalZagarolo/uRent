import { pkwAttribute } from "@/db/schema";
import { GearIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { CarFrontIcon, Check, ConstructionIcon, DoorClosedIcon, Globe2, MapPin, MapPinned } from "lucide-react";
import { GiResize } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { PiCouchFill, PiEngine } from "react-icons/pi";
import { RiGasStationLine } from "react-icons/ri";

interface PkwAttributeRenderProps {
    attributes: typeof pkwAttribute.$inferSelect

}


const PkwAttributeRender: React.FC<PkwAttributeRenderProps> = ({
    attributes
}) => {

    let shownItems = 0;

    return (
        <div className="w-full gap-2 grid-cols-2 grid mt-4">
            {attributes?.brand && (

                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <CarFrontIcon className="w-4 h-4 mr-2" />    {attributes.brand}
                </div>
            )}
            {attributes?.initial && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <ConstructionIcon className="w-4 h-4 mr-2" />  Baujahr : {format(new Date(attributes?.initial), "yyyy")}
                </div>
            )}
            {attributes?.power && (

                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <PiEngine className="w-4 h-4 mr-2" />    {attributes.power} PS
                </div>
            )}
            
            {attributes?.seats && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <PiCouchFill className="w-4 h-4 mr-2" />    {attributes.seats} Sitze
                </div>
            )}
            {attributes?.fuel && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <RiGasStationLine className="w-4 h-4 mr-2" />    {(attributes.fuel).substring(0,1)}{(attributes.fuel).substring(1).toLowerCase()}
                </div>
            )}
            {attributes?.doors && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <DoorClosedIcon className="w-4 h-4 mr-2" />    {attributes.doors}/{Number(attributes.doors) + 1} Türer
                </div>
            )}
            {attributes?.transmission && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200">
                    <GearIcon className="w-4 h-4 mr-2" />

                    {
                        {
                            'MANUAL': 'Schaltgetriebe',
                            'SEMI_AUTOMATIC': 'Halbautomatikgetriebe',
                            'AUTOMATIC': 'Automatikgetriebe'
                        }[attributes.transmission]
                    }
                </div>
            )}
            

            

            {attributes?.loading_volume && (
                <div className="bg-[#13151C] p-4 font-semibold flex items-center  text-gray-200 ">
                    <HiCubeTransparent className="w-4 h-4 mr-2" />    {attributes.loading_volume} l
                </div>
            )}

            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <div className=" p-4 font-semibold flex items-center  text-gray-200 bg-[#13151C]">
                    <GiResize className="w-4 h-4 mr-2" />    {attributes?.loading_l} x {attributes?.loading_b} x {attributes?.loading_h} m
                </div>
            )}
        </div>
    );
}

export default PkwAttributeRender;