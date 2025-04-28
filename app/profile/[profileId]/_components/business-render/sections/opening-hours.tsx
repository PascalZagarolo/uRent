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
        <div className="p-4 bg-gradient-to-b from-[#1a1a25] to-[#1a1a25]/90 border border-indigo-900/20 rounded-md">
            <div>
                <h1 className="font-medium flex items-center text-gray-200">
                    <Clock6Icon className="w-4 h-4 mr-2 text-indigo-400" /> Öffnungszeiten
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
                        <div className="mt-4 space-y-2">
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
                                    className="flex justify-between items-center py-3 px-2 rounded-md hover:bg-indigo-900/10 transition-all duration-300"
                                >
                                    <span className="font-medium text-gray-200">{day}:</span>
                                    <span className="font-semibold text-indigo-400">{time}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 flex justify-center items-center">
                            <p className="text-gray-200/60 text-sm">Keine Öffnungszeiten hinterlegt</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OpeningHours;