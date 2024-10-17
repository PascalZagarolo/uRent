import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock6Icon, Clock7Icon } from "lucide-react";
import EditOpenhours from "./edit-openhours";
import { business } from "@/db/schema";
import { openingTimes } from '../../../../db/schema';

interface OpenhoursProps {
    thisBusiness : typeof business.$inferSelect;
    ownProfile : boolean;
}

const Openhours : React.FC<OpenhoursProps> = ({
    thisBusiness,
    ownProfile
}) => {
    return (
        <div className="dark:bg-[#222222] shadow-lg p-4">
            <div>
                <h1 className="font-medium flex items-center">
                    Öffnungszeiten
                    {ownProfile && (
                        <div className="ml-auto">
                        <EditOpenhours 
                        businessId={thisBusiness.id}
                        openTimes={thisBusiness.openingTimes}
                        />
                        </div>
                    )}
                </h1>
                <div>
                    {thisBusiness.openingTimes ? (
                        <div className="grid grid-cols-6 grid-rows-2 gap-2 mt-4">
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Montag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Dienstag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Mittwoch</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Donners<br className="sm:hidden block"/>tag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Freitag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Samstag</div>

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