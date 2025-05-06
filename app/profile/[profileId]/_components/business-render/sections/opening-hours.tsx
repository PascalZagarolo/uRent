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
        <div className="p-6 bg-gradient-to-b from-[#1a1a25] to-[#1a1a25]/90 border border-indigo-900/20 rounded-lg shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between w-full mb-4">
                <h1 className="font-medium flex items-center text-gray-200 text-lg">
                    <Clock6Icon className="w-5 h-5 mr-2 text-indigo-400" /> Öffnungszeiten
                </h1>
                {ownProfile && (
                    <EditOpenhours 
                        businessId={thisBusiness.id}
                        openTimes={thisBusiness.openingTimes}
                    />
                )}
            </div>
            <div className="flex-grow">
                {thisBusiness.openingTimes ? (
                    <div className="space-y-2">
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
                    <div className="flex-grow flex justify-center items-center">
                        <p className="text-gray-200/60 text-sm">Keine Öffnungszeiten hinterlegt</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OpeningHours;