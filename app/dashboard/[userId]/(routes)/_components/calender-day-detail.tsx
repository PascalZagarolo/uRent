import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { booking, vehicle } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { de } from "date-fns/locale";
import { CheckIcon } from "lucide-react";

import { RiCalendarEventFill } from "react-icons/ri";

interface CalenderDayDetailProps {
    day_date: Date;
    affectedBookings: typeof booking.$inferSelect[];
    setCompletelyUnaivalable: (value: boolean) => void;
    setIsPartiallyUnaivalable: (value: boolean) => void;
    isMulti?: boolean;
    vehicles?: typeof vehicle.$inferSelect[];
}

const CalenderDayDetail: React.FC<CalenderDayDetailProps> = ({
    day_date,
    affectedBookings,
    setCompletelyUnaivalable,
    setIsPartiallyUnaivalable,
    isMulti,
    vehicles
}) => {

    let appointedTimes = [];

    




    if (isMulti) {

        const helpArray = [];

        if (affectedBookings.length === 0) {
            setCompletelyUnaivalable(false);
        }

        let index = 0;

        for (const vehicle of vehicles) {
            appointedTimes[index] = []
            for (const pBooking of vehicle?.bookings) {

                if (affectedBookings) {
                    //Buchung startet vor dem aktuellen Tag und endet nach dem aktuellen Tag, kompletter Tag ist belegt
                    if (isBefore(pBooking.startDate, day_date) && isAfter(pBooking.endDate, day_date)) {
                        for (let i = 0; i <= 1440; i = i + 30) {
                            appointedTimes[index].push(i);

                        }
                        
                    }
                    //Buchung liegt auf aktuellen Tag, Buchung started & endet am selben Tag
                    if (isSameDay(pBooking.startDate, day_date) && isSameDay(pBooking.startDate, pBooking.endDate)) {
                        for (let i = Number(pBooking.startPeriod); i <= Number(pBooking.endPeriod); i = i + 30) {
                            appointedTimes[index].push(i);
                        }
                    }

                    //Buchung startet am aktuellen Tag und endet nicht am aktuellen Tag
                    if (isSameDay(pBooking?.startDate, day_date) && isAfter(pBooking?.endDate, day_date)) {
                        for (let i = Number(pBooking.startPeriod); i <= 1440; i = i + 30) {
                            appointedTimes[index].push(i);
                        }
                    }

                    //Buchung endet am aktuellen Tag und startet nicht am aktuellen Tag
                    if (isSameDay(pBooking?.endDate, day_date) && isBefore(pBooking?.startDate, day_date)) {
                        for (let i = 0; i <= Number(pBooking.endPeriod); i = i + 30) {
                            appointedTimes[index].push(i);
                        }
                    }
                }
            }

            index++;
        }

        for (let i = 0; i <= 1440; i = i + 30) {

            let isAvailable = false;

            for (let j = 0; j < appointedTimes?.length; j++) {

                if (!appointedTimes[j].includes(i)) {
                    isAvailable = true;
                }
            }

            if (!isAvailable) {
                helpArray.push(i);
            }
        }



        appointedTimes = helpArray;

        let isAvailable = false;

        for (let i = 0; i < 1440; i = i + 30) {
            
            if (!helpArray.includes(i)) {
                isAvailable = true;
                setCompletelyUnaivalable(false);
                break;
            }
        }

        if (!isAvailable) {
            setCompletelyUnaivalable(true);
            
        } else if (appointedTimes.length === 0){
            setCompletelyUnaivalable(false);
        } else if(appointedTimes.length !== 1440){
            setIsPartiallyUnaivalable(true);
        }

        


    } else {
        
        for (const pBooking of affectedBookings) {
            if (affectedBookings) {
                //Buchung startet vor dem aktuellen Tag und endet nach dem aktuellen Tag, kompletter Tag ist belegt
                if (isBefore(pBooking.startDate, day_date) && isAfter(pBooking.endDate, day_date)) {
                    for (let i = 0; i <= 1440; i = i + 30) {
                        appointedTimes.push(i);


                    }
                    setCompletelyUnaivalable(true);
                    break;
                }
                //Buchung liegt auf aktuellen Tag, Buchung started & endet am selben Tag
                if (isSameDay(pBooking.startDate, day_date) && isSameDay(pBooking.startDate, pBooking.endDate)) {
                    for (let i = Number(pBooking.startPeriod); i <= Number(pBooking.endPeriod); i = i + 30) {
                        appointedTimes.push(i);
                    }
                }

                //Buchung startet am aktuellen Tag und endet nicht am aktuellen Tag
                if (isSameDay(pBooking?.startDate, day_date) && isAfter(pBooking?.endDate, day_date)) {
                    for (let i = Number(pBooking.startPeriod); i <= 1440; i = i + 30) {
                        appointedTimes.push(i);
                    }
                }

                //Buchung endet am aktuellen Tag und startet nicht am aktuellen Tag
                if (isSameDay(pBooking?.endDate, day_date) && isBefore(pBooking?.startDate, day_date)) {
                    for (let i = 0; i <= Number(pBooking.endPeriod); i = i + 30) {
                        appointedTimes.push(i);
                    }
                }
            }



            for (let i = 0; i <= 1440; i = i + 30) {
                if (!appointedTimes.includes(i)) {
                    setCompletelyUnaivalable(false);
                    break;
                }
            }

            if(appointedTimes.length === 0){
                setCompletelyUnaivalable(false);
            } else if(appointedTimes?.length !== 0) {
                setIsPartiallyUnaivalable(true)
            }
        }
    }

    const checkBooked = (number: string) => {
        if (appointedTimes.includes(Number(number))) {
            return true;
        }
    }

    const renderSegments = () => {
        const segments = [];
        for (let hour = 8; hour <= 23; hour++) {
            segments.push(
                <div key={hour} className="dark:bg-[#131313] text-sm flex items-center  dark:border border-[#191919]">
                    <div>
                        <div className="p-2 text-sm w-2/5">
                            {hour}:00 Uhr
                        </div>
                    </div>
                    <div className="h-full ml-auto w-3/5 flex flex-col">
                        <div className={cn("h-[32px] w-full p-2",
                            checkBooked(String(hour * 60)) ? " bg-rose-800" : "",
                            checkBooked(String((hour * 60) + 30)) ? "" : "rounded-b-lg",
                            checkBooked(String((hour * 60) - 30)) ? "" : "rounded-t-lg"
                        )}>
                            {(!checkBooked(String(hour * 60)) && checkBooked(String((hour * 60) - 30))) && (
                                `Verfügbar ab ${hour}:00 Uhr`
                            )}
                        </div>
                        <div className={cn("h-[32px] w-full p-2 font-semibold text-xs border-t border-dotted border-[#191919]",
                            checkBooked(String((hour * 60) + 30)) ? " bg-rose-800" : "",
                            checkBooked(String((hour * 60) + 60)) ? "" : "rounded-b-lg",
                            checkBooked(String((hour * 60))) ? "" : "rounded-t-lg"
                        )}>
                            {(!checkBooked(String((hour * 60) + 30)) && checkBooked(String((hour * 60)))) && (
                                <div className="flex">
                                    <CheckIcon className="w-4 h-4 mr-2 text-emerald-600" />  Verfügbar ab {hour}:30 Uhr
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
        return segments;
    };

    return (
        <Dialog>

            <DialogTrigger>
                {format(new Date(day_date), "d")}
            </DialogTrigger>
            <DialogContent className="p-0 dark:border-none dark:bg-[#191919]">
                <div className="h-[520px] overflow-y-auto no-scrollbar">
                    <h3 className="font-medium text-sm flex items-center gap-x-2 px-4 pt-6">
                        <RiCalendarEventFill className="w-4 h-4 text-indigo-800" />
                        <div className="font-semibold">
                            {format(new Date(day_date), "d. MMMM yyyy", { locale: de })}{" "}
                        </div>
                        <div className="dark:text-gray-200">Verfügbarkeitsübersicht</div>
                    </h3>
                    <p className="px-4 text-xs dark:text-gray-200/60">
                        Finde heraus, wann das Inserat verfügbar ist, und wann nicht.
                    </p>

                    <div className="mt-4">
                        {renderSegments()}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CalenderDayDetail;