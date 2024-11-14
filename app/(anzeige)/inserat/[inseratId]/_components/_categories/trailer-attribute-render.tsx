import { CaravanIcon, WeightIcon } from "lucide-react";
import { LuAxis3D } from "react-icons/lu";
import { PiCouchFill } from "react-icons/pi";
import { FaGears } from "react-icons/fa6";
import { TbCrane } from "react-icons/tb";
import { GiResize, GiStoneWheel } from "react-icons/gi";
import { RiCaravanFill } from "react-icons/ri";
import { trailerAttribute } from "@/db/schema";
import { HiCubeTransparent } from "react-icons/hi";

interface TrailerAttributeRenderProps {
    attributes: typeof trailerAttribute.$inferSelect;
}

const TrailerAttributeRender: React.FC<TrailerAttributeRenderProps> = ({
    attributes,
}) => {
    return (
        <div className="w-full grid grid-cols-2 gap-4 mt-4 p-4 rounded-lg bg-[#13151C] shadow-md text-gray-200">
            {attributes?.type && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <CaravanIcon className="w-4 h-4 text-teal-400 mr-3" />
                    <span className="font-medium">
                        {attributes.type.charAt(0).toUpperCase() + attributes.type.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.extraType && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <RiCaravanFill className="w-4 h-4 text-blue-400 mr-3" />
                    <span className="font-medium">
                        {attributes.extraType.charAt(0).toUpperCase() + attributes.extraType.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.coupling && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <FaGears className="w-4 h-4 text-yellow-400 mr-3" />
                    <span className="font-medium">
                        {attributes.coupling.charAt(0).toUpperCase() + attributes.coupling.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.loading && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <TbCrane className="w-4 h-4 text-red-400 mr-3" />
                    <span className="font-medium">
                        {attributes.loading.charAt(0).toUpperCase() + attributes.loading.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.axis && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <LuAxis3D className="w-4 h-4 text-green-400 mr-3" />
                    <span className="font-medium">
                        {{
                            '1': "Einachser",
                            '2': "Zweiachser",
                            '3': "Dreiachser",
                            '4': "Vierachser",
                            '5': "> 4 Achsen",
                        }[attributes.axis]}
                    </span>
                </div>
            )}
            {attributes?.weightClass && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <WeightIcon className="w-4 h-4 text-indigo-400 mr-3" />
                    <span className="font-medium text-sm">
                        {attributes?.weightClass} kg <br/> zulässiges Gesamtgewicht
                    </span>
                </div>
            )}
            {attributes?.payload && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <WeightIcon className="w-4 h-4 text-emerald-400 mr-3" />
                    <span className="font-medium text-sm">
                        {attributes?.payload} kg <br/> Nutzlast
                    </span>
                </div>
            )}
            {attributes?.brake && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <GiStoneWheel className="w-4 h-4 text-purple-400 mr-3" />
                    <span className="font-medium">
                        {attributes.brake ? "Hat Auflaufbremse" : "Keine Bremse"}
                    </span>
                </div>
            )}
            {attributes?.loading_volume && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <HiCubeTransparent className="w-4 h-4 text-cyan-400 mr-3" />
                    <span className="font-medium">{attributes.loading_volume} l</span>
                </div>
            )}
            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <GiResize className="w-4 h-4 text-gray-400 mr-3" />
                    <span className="font-medium">
                        {attributes.loading_l} x {attributes.loading_b} x {attributes.loading_h} m
                    </span>
                </div>
            )}
        </div>
    );
};

export default TrailerAttributeRender;
