import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { booking } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { de } from "date-fns/locale";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { RiCalendarEventFill } from "react-icons/ri";

interface CalenderDayDetailProps {
    day_date: Date;
    affectedBookings: typeof booking.$inferSelect[];
    setCompletelyUnaivalable: (value : boolean) => void;
}

const CalenderDayDetail: React.FC<CalenderDayDetailProps> = ({
    day_date,
    affectedBookings,
    setCompletelyUnaivalable
}) => {



    const [appointedTimes, setAppointedTimes] = useState([]);

    for (const pBooking of affectedBookings) {
        const startHour = Number(pBooking.startPeriod) / 60;


        //TODO: Add all the time between the start and the end date ONLY if the booking on the given day or starts on the given day

        if (affectedBookings) {
            if (!isSameDay(pBooking.startDate, day_date) && !isSameDay(pBooking.endDate, day_date)) {
                setCompletelyUnaivalable(true);
                for (let i = 0; i <= 1440; i = i + 30) {
                    appointedTimes.push(i);   
                }
            } else if(isSameDay(pBooking.startDate, day_date) && isSameDay(pBooking.endDate, day_date)) {
                for (let i = Number(pBooking.startPeriod); i <= Number(pBooking.endPeriod); i = i + 30) {
                    appointedTimes.push(i);
                }
            } else if(isSameDay(pBooking.startDate, day_date) && !isSameDay(pBooking.endDate, day_date)) {
                for (let i = Number(pBooking.startPeriod); i <= 1440; i = i + 30) {
                    appointedTimes.push(i);
                }
            } else if(!isSameDay(pBooking.startDate, day_date) && isSameDay(pBooking.endDate, day_date)) {
                for (let i = 0; i <= Number(pBooking.endPeriod); i = i + 30) {
                    appointedTimes.push(i);
                }
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
                        <div className={cn("h-[32px] w-full p-2 font-semibold text-xs", 
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