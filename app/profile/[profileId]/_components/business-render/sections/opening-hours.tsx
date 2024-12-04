import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock6Icon, Clock7Icon } from "lucide-react";

import { business } from "@/db/schema";
import EditOpenhours from "../../edit-openhours";
import { openingTimes } from '../../../../../../drizzle/schema';


interface OpeningHoursProps {
    thisBusiness : typeof business.$inferSelect;
    ownProfile : boolean;
}

const OpeningHours : React.FC<OpeningHoursProps> = ({
    thisBusiness,
    ownProfile
}) => {
    return (
        <div className="p-4">
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
                        <div className="grid grid-cols-7 grid-rows-2 gap-2 mt-4">
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Montag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Dienstag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Mittwoch</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Donners<br className="sm:hidden block"/>tag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Freitag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Samstag</div>
                        <div className="col-span-1 row-span-1 font-medium sm:text-sm text-xs">Sonntag</div>

                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.monday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.tuesday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.wednesday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.thursday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.friday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.saturday}</div>
                        <div className="col-span-1 row-span-2 font-semibold text-sm">{thisBusiness?.openingTimes?.sunday ?? "/"}</div>
                    </div>
                    ) : (
                        <div className="p-8 flex justify-center items-center">
                            <p className="dark:text-gray-200/60 text-sm text-gray-700/70">Keine Öffnungszeiten hinterlegt</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OpeningHours;