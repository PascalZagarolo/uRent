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
    if (!attributes) return null;
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {attributes?.transportBrand && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/10 flex items-center justify-center mr-3 border border-blue-500/20">
                        <PiVanFill className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Marke</div>
                        <div className="font-medium text-gray-200">{attributes.transportBrand}</div>
                    </div>
                </div>
            )}
            
            {attributes?.initial && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/10 flex items-center justify-center mr-3 border border-green-500/20">
                        <ConstructionIcon className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Baujahr</div>
                        <div className="font-medium text-gray-200">{format(new Date(attributes.initial), "yyyy")}</div>
                    </div>
                </div>
            )}
            
            {attributes?.loading && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/10 flex items-center justify-center mr-3 border border-orange-500/20">
                        <TbCarCrane className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Beladung</div>
                        <div className="font-medium text-gray-200">
                            {attributes.loading.charAt(0).toUpperCase() + attributes.loading.slice(1).toLowerCase()}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.seats && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/10 flex items-center justify-center mr-3 border border-purple-500/20">
                        <PiCouchFill className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Sitze</div>
                        <div className="font-medium text-gray-200">{attributes.seats} {attributes.seats > 1 ? 'Sitze' : 'Sitz'}</div>
                    </div>
                </div>
            )}
            
            {attributes?.fuel && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/10 flex items-center justify-center mr-3 border border-teal-500/20">
                        <RiGasStationLine className="w-4 h-4 text-teal-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Kraftstoff</div>
                        <div className="font-medium text-gray-200">
                            {attributes.fuel.charAt(0).toUpperCase() + attributes.fuel.slice(1).toLowerCase()}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.transmission && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-500/10 flex items-center justify-center mr-3 border border-yellow-500/20">
                        <GearIcon className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Getriebe</div>
                        <div className="font-medium text-gray-200">
                            {{
                                MANUAL: "Schaltgetriebe",
                                SEMI_AUTOMATIC: "Schaltgetriebe",
                                AUTOMATIC: "Automatikgetriebe",
                            }[attributes.transmission] || attributes.transmission}
                        </div>
                    </div>
                </div>
            )}
            
            {Number(attributes?.doors) !== 0 && attributes?.doors && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/10 flex items-center justify-center mr-3 border border-pink-500/20">
                        <DoorClosedIcon className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Türen</div>
                        <div className="font-medium text-gray-200">{attributes.doors}/{Number(attributes.doors) + 1} Türer</div>
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
            
            {attributes?.extraType && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-rose-500/10 flex items-center justify-center mr-3 border border-red-500/20">
                        <RiCaravanFill className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Typ</div>
                        <div className="font-medium text-gray-200">
                            {attributes.extraType.charAt(0).toUpperCase() + attributes.extraType.slice(1).toLowerCase()}
                        </div>
                    </div>
                </div>
            )}
            
            {attributes?.power && (
                <div className="flex items-center p-3 bg-[#1B1F2E]/80 rounded-lg border border-gray-800/10">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-500/20 to-green-500/10 flex items-center justify-center mr-3 border border-lime-500/20">
                        <PiEngine className="w-4 h-4 text-lime-400" />
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Leistung</div>
                        <div className="font-medium text-gray-200">{attributes.power} PS</div>
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

export default TransportAttributeRender;
