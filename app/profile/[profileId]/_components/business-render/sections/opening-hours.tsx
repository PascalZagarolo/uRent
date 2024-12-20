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
                       <div className="mt-4">
                       {[
                         { day: "Montag", time: thisBusiness?.openingTimes?.monday },
                         { day: "Dienstag", time: thisBusiness?.openingTimes?.tuesday },
                         { day: "Mittwoch", time: thisBusiness?.openingTimes?.wednesday },
                         { day: "Donnerstag", time: thisBusiness?.openingTimes?.thursday },
                         { day: "Freitag", time: thisBusiness?.openingTimes?.friday },
                         { day: "Samstag", time: thisBusiness?.openingTimes?.saturday },
                         { day: "Sonntag", time: thisBusiness?.openingTimes?.sunday ?? "/" },
                       ].map(({ day, time }) => (
                         <div
                           key={day}
                           className="flex justify-between items-center border-b  border-[#242424]  py-4 text-sm sm:text-base"
                         >
                           <span className="font-medium">{day}:</span>
                           <span className="font-semibold">{time}</span>
                         </div>
                       ))}
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