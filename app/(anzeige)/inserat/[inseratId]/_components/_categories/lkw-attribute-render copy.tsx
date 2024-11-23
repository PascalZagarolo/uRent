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
    attributes: typeof lkwAttribute.$inferSelect;
}

const LkwAttributeRender: React.FC<LkwAttributeRenderProps> = ({
    attributes,
}) => {
    return (
        <div className="w-full grid grid-cols-2 gap-4 mt-4 p-4 rounded-lg bg-[#13151C] shadow-md text-gray-200">
            {attributes?.lkwBrand && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <FaTruckMoving className="w-4 h-4 text-teal-400 mr-3" />
                    <span className="font-medium">{attributes.lkwBrand}</span>
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
            {attributes?.initial && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <ConstructionIcon className="w-4 h-4 text-blue-400 mr-3" />
                    <span className="font-medium">Baujahr: {format(new Date(attributes.initial), "yyyy")}</span>
                </div>
            )}
            {attributes?.application && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <LiaTruckLoadingSolid className="w-4 h-4 text-yellow-400 mr-3" />
                    <span className="font-medium">
                        {attributes.application.charAt(0).toUpperCase() + attributes.application.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.loading && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <TbCarCrane className="w-4 h-4 text-red-400 mr-3" />
                    <span className="font-medium">
                        {attributes.loading.charAt(0).toUpperCase() + attributes.loading.slice(1).toLowerCase()}
                    </span>
                </div>
            )}
            {attributes?.drive && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <GearIcon className="w-4 h-4 text-green-400 mr-3" />
                    <span className="font-medium">{attributes.drive.substring(1)}</span>
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
            {attributes?.seats && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <PiCouchFill className="w-4 h-4 text-purple-400 mr-3" />
                    <span className="font-medium">{attributes.seats} {attributes.seats > 1 ? 'Sitze' : 'Sitz'}</span>
                </div>
            )}
            {attributes?.axis && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <LuAxis3D className="w-4 h-4 text-pink-400 mr-3" />
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
            {attributes?.power && (
                <div className="flex items-center p-3 bg-[#1a1d25] rounded-lg shadow-sm transition hover:bg-[#2a2d35]">
                    <PiEngine className="w-4 h-4 text-orange-400 mr-3" />
                    <span className="font-medium">{attributes.power} PS</span>
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
                    <GiResize className="w-4 h-4 text-rose-400 mr-3" />
                    <span className="font-medium text-sm">
                    {attributes?.loading_l && `${attributes?.loading_l}m Länge, `}  {attributes?.loading_b && `${attributes?.loading_b}m Breite, ` } <br/>  {attributes?.loading_h && `${attributes?.loading_b}m Höhe`}
                    </span>
                </div>
            )}
            
        </div>
    );
};

export default LkwAttributeRender;
