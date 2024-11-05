import { pkwAttribute } from "@/db/schema";
import { GearIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
    CarFrontIcon,
    Check,
    ConstructionIcon,
    DoorClosedIcon,
} from "lucide-react";
import { GiResize } from "react-icons/gi";
import { HiCubeTransparent } from "react-icons/hi";
import { PiCouchFill, PiEngine } from "react-icons/pi";
import { RiGasStationLine } from "react-icons/ri";

interface PkwAttributeRenderProps {
    attributes: typeof pkwAttribute.$inferSelect;
}

const PkwAttributeRender: React.FC<PkwAttributeRenderProps> = ({
    attributes,
}) => {
    return (
        <div className="grid grid-cols-2 gap-4 mt-4 p-4 rounded-lg bg-[#13151C] shadow-md">
            {attributes?.brand && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <CarFrontIcon className="w-4 h-4 text-teal-400 mr-3" />
                    <span className="text-gray-100 font-medium">{attributes.brand}</span>
                </div>
            )}
            {attributes?.initial && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <ConstructionIcon className="w-4 h-4 text-blue-400 mr-3" />
                    <span className="text-gray-100 font-medium">Baujahr: {format(new Date(attributes?.initial), "yyyy")}</span>
                </div>
            )}
            {attributes?.power && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <PiEngine className="w-4 h-4 text-yellow-400 mr-3" />
                    <span className="text-gray-100 font-medium">{attributes.power} PS</span>
                </div>
            )}
            {attributes?.seats && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <PiCouchFill className="w-4 h-4 text-purple-400 mr-3" />
                    <span className="text-gray-100 font-medium">{attributes.seats} Sitze</span>
                </div>
            )}
            {attributes?.fuel && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <RiGasStationLine className="w-4 h-4 text-pink-400 mr-3" />
                    <span className="text-gray-100 font-medium">
                        {attributes.fuel.charAt(0).toUpperCase() + attributes.fuel.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.doors && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <DoorClosedIcon className="w-4 h-4 text-red-400 mr-3" />
                    <span className="text-gray-100 font-medium">{attributes.doors}/{Number(attributes.doors) + 1} Türer</span>
                </div>
            )}
            {attributes?.transmission && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <GearIcon className="w-4 h-4 text-green-400 mr-3" />
                    <span className="text-gray-100 font-medium">
                        {{
                            MANUAL: "Schaltgetriebe",
                            SEMI_AUTOMATIC: "Halbautomatikgetriebe",
                            AUTOMATIC: "Automatikgetriebe",
                        }[attributes.transmission]}
                    </span>
                </div>
            )}
            {attributes?.ahk && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <Check className="w-4 h-4 text-cyan-400 mr-3" />
                    <span className="text-gray-100 font-medium">Anhängerkupplung</span>
                </div>
            )}
            {attributes?.loading_volume && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <HiCubeTransparent className="w-4 h-4 text-orange-400 mr-3" />
                    <span className="text-gray-100 font-medium">{attributes.loading_volume} l</span>
                </div>
            )}
            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <div className="flex items-center p-4 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <GiResize className="w-4 h-4 text-indigo-400 mr-3" />
                    <span className="text-gray-100 font-medium">
                        {attributes?.loading_l} x {attributes?.loading_b} x {attributes?.loading_h} m
                    </span>
                </div>
            )}
        </div>
    );
};

export default PkwAttributeRender;
