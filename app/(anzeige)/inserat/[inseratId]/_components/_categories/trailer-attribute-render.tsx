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
    if (!attributes) return null;
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {attributes?.type && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/10 flex items-center justify-center mr-3 border border-teal-500/20">
                        <CaravanIcon className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Typ</div>
                        <div className="font-medium text-gray-200">
                            {attributes.type.charAt(0).toUpperCase() + attributes.type.slice(1).toLowerCase()}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.extraType && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center mr-3 border border-blue-500/20">
                        <RiCaravanFill className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Aufbauart</div>
                        <div className="font-medium text-gray-200">
                            {attributes.extraType.charAt(0).toUpperCase() + attributes.extraType.slice(1).toLowerCase()}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.coupling && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/10 flex items-center justify-center mr-3 border border-yellow-500/20">
                        <FaGears className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Anschluss</div>
                        <div className="font-medium text-gray-200">
                            {attributes.coupling.charAt(0).toUpperCase() + attributes.coupling.slice(1).toLowerCase()}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.loading && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/10 flex items-center justify-center mr-3 border border-red-500/20">
                        <TbCrane className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Beladung</div>
                        <div className="font-medium text-gray-200">
                            {attributes.loading.charAt(0).toUpperCase() + attributes.loading.slice(1).toLowerCase()}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.axis && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center mr-3 border border-green-500/20">
                        <LuAxis3D className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Achsen</div>
                        <div className="font-medium text-gray-200">
                            {{
                                '1': "Einachser",
                                '2': "Zweiachser",
                                '3': "Dreiachser",
                                '4': "Vierachser",
                                '5': "> 4 Achsen",
                            }[attributes.axis] || attributes.axis}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.weightClass && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/10 flex items-center justify-center mr-3 border border-indigo-500/20">
                        <WeightIcon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Gewichtsklasse</div>
                        <div className="font-medium text-gray-200">{attributes.weightClass} kg</div>
                    </div>
                </div>
            )}
            
            {attributes?.payload && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-green-500/10 flex items-center justify-center mr-3 border border-emerald-500/20">
                        <WeightIcon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Nutzlast</div>
                        <div className="font-medium text-gray-200">{attributes.payload} kg</div>
                    </div>
                </div>
            )}
            
            {attributes?.brake && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/10 flex items-center justify-center mr-3 border border-purple-500/20">
                        <GiStoneWheel className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Bremse</div>
                        <div className="font-medium text-gray-200">
                            {attributes.brake ? "Hat Auflaufbremse" : "Keine Bremse"}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.loading_volume && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-sky-500/10 flex items-center justify-center mr-3 border border-cyan-500/20">
                        <HiCubeTransparent className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Ladevolumen</div>
                        <div className="font-medium text-gray-200">{attributes.loading_volume} l</div>
                    </div>
                </div>
            )}
            
            {(attributes?.loading_l || attributes?.loading_b || attributes?.loading_h) && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500/20 to-red-500/10 flex items-center justify-center mr-3 border border-rose-500/20">
                        <GiResize className="w-4 h-4 text-rose-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Laderaum</div>
                        <div className="font-medium text-gray-200 text-sm">
                            {attributes?.loading_l && `${attributes?.loading_l}m Länge`}{attributes?.loading_l && attributes?.loading_b ? ", " : ""}
                            {attributes?.loading_b && `${attributes?.loading_b}m Breite`}{((attributes?.loading_l || attributes?.loading_b) && attributes?.loading_h) ? ", " : ""}
                            {attributes?.loading_h && `${attributes?.loading_h}m Höhe`}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrailerAttributeRender;
