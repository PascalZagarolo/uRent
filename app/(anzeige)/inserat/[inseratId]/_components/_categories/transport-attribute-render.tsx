import { transportAttribute } from "@/db/schema";
import { GearIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
    ConstructionIcon,
    DoorClosedIcon,
    WeightIcon,
} from "lucide-react";
import { GiResize } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { PiCouchFill, PiEngine, PiVanFill } from "react-icons/pi";
import { RiCaravanFill, RiGasStationLine } from "react-icons/ri";
import { TbCarCrane } from "react-icons/tb";

interface TransportAttributeRenderProps {
    attributes: typeof transportAttribute.$inferSelect;
}

const TransportAttributeRender: React.FC<TransportAttributeRenderProps> = ({
    attributes,
}) => {
    return (
        <div className="w-full grid grid-cols-2 gap-4 mt-4 p-4 rounded-lg bg-[#13151C] shadow-md text-gray-200">
            {attributes?.transportBrand && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <PiVanFill className="w-4 h-4 text-blue-400 mr-2" />
                    <span className="font-medium">{attributes.transportBrand}</span>
                </div>
            )}
            {attributes?.initial && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <ConstructionIcon className="w-4 h-4 text-green-400 mr-2" />
                    <span className="font-medium">Baujahr: {format(new Date(attributes.initial), "yyyy")}</span>
                </div>
            )}
            {attributes?.loading && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <TbCarCrane className="w-4 h-4 text-orange-400 mr-2" />
                    <span className="font-medium">
                        {attributes.loading.charAt(0).toUpperCase() + attributes.loading.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.seats && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <PiCouchFill className="w-4 h-4 text-purple-400 mr-2" />
                    <span className="font-medium">{attributes.seats}</span>
                </div>
            )}
            {attributes?.fuel && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <RiGasStationLine className="w-4 h-4 text-teal-400 mr-2" />
                    <span className="font-medium">
                        {attributes.fuel.charAt(0).toUpperCase() + attributes.fuel.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.transmission && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <div>
                    <GearIcon className="w-4 h-4 text-yellow-400 mr-2" />
                    </div>
                    <span className="font-medium break-all">
                        {{
                            MANUAL: "Schaltgetriebe",
                            SEMI_AUTOMATIC: "Schaltgetriebe",
                            AUTOMATIC: "Automatikgetriebe",
                        }[attributes.transmission]}
                    </span>
                </div>
            )}
            {Number(attributes?.doors) !== 0 && attributes?.doors && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <DoorClosedIcon className="w-4 h-4 text-pink-400 mr-2" />
                    <span className="font-medium">{attributes.doors}/{Number(attributes.doors) + 1}</span>
                </div>
            )}
            {attributes?.weightClass && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <WeightIcon className="w-4 h-4 text-indigo-400 mr-2" />
                    <span className="font-medium text-sm">
                        {attributes?.weightClass} kg <br/> zulässiges Gesamtgewicht
                    </span>
                </div>
            )}
            {attributes?.payload && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <WeightIcon className="w-4 h-4 text-emerald-400 mr-2" />
                    <span className="font-medium text-sm">
                        {attributes?.payload} kg <br/> Nutzlast
                    </span>
                </div>
            )}
            {attributes?.extraType && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <RiCaravanFill className="w-4 h-4 text-red-400 mr-2" />
                    <span className="font-medium">
                        {attributes.extraType.charAt(0).toUpperCase() + attributes.extraType.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.power && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <PiEngine className="w-4 h-4 text-lime-400 mr-2" />
                    <span className="font-medium">{attributes.power} PS</span>
                </div>
            )}
            {attributes?.loading_volume && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <HiCubeTransparent className="w-4 h-4 text-cyan-400 mr-2" />
                    <span className="font-medium">{attributes.loading_volume} l</span>
                </div>
            )}
            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <GiResize className="w-4 h-4 text-rose-400 mr-2" />
                    <span className="font-medium text-sm">
                    {attributes?.loading_l && `${attributes?.loading_l}m Länge, `}  {attributes?.loading_b && `${attributes?.loading_b}m Breite, ` } <br/>  {attributes?.loading_h && `${attributes?.loading_b}m Höhe`}
                    </span>
                </div>
            )}
        </div>
    );
};

export default TransportAttributeRender;
