import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock6Icon, Clock7Icon } from "lucide-react";
import EditOpenhours from "./edit-openhours";
import { business } from "@/db/schema";
import { openingTimes } from '../../../../db/schema';

interface OpenhoursProps {
    thisBusiness : typeof business.$inferSelect;
}

const Openhours : React.FC<OpenhoursProps> = ({
    thisBusiness
}) => {
    return (
        <div className="dark:bg-[#191919] p-4">
            <div>
                <h1 className="font-medium flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" /> Öffnungszeiten
                    <div className="ml-auto">
                    <EditOpenhours 
                    businessId={thisBusiness.id}
                    openTimes={thisBusiness.openingTimes}
                    />
                    </div>
                </h1>
                <div>
                    {thisBusiness.openingTimes ? (
                        <div className="grid grid-cols-6 grid-rows-2 gap-2 mt-4">
                        <div className="col-span-1 row-span-1 font-medium text-sm">Montag</div>
                        <div className="col-span-1 row-span-1 font-medium text-sm">Dienstag</div>
                        <div className="col-span-1 row-span-1 font-medium text-sm">Mittwoch</div>
                        <div className="col-span-1 row-span-1 font-medium text-sm">Donnerstag</div>
                        <div className="col-span-1 row-span-1 font-medium text-sm">Freitag</div>
                        <div className="col-span-1 row-span-1 font-medium text-sm">Samstag</div>

                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.monday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.tuesday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.wednesday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.thursday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.friday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.saturday}</div>
                    </div>
                    ) : (
                        <div className="p-8 flex justify-center items-center">
                            <p className="dark:text-gray-200/70 text-xs text-gray-700/70">Keine Öffnungszeiten hinterlegt</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Openhours;