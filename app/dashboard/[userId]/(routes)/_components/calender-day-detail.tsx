import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { booking, vehicle } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { de } from "date-fns/locale";
import { CheckIcon } from "lucide-react";
import { useEffect } from "react";

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
            //@ts-ignore
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
        
    
        for (let hour = 0; hour <= 23; hour++) {
            segments.push(
                <div
                key={hour}
                className="dark:bg-[#1a1a1a] bg-white text-sm flex  flex-row h-full items-start shadow-sm overflow-hidden"
            >
                {/* Left Section: Time Display */}
                <div className="w-2/5 bg-[#222222] text-white shadow-md h-full flex justify-center items-center">
                    <div className="p-2.5 font-semibold">{hour}:00 Uhr</div>
                </div>
            
                {/* Right Section: Booking Slots */}
                <div className="h-full ml-auto w-3/5 flex flex-col ">
                    {/* First Slot */}
                    <div
                        className={`h-10 flex items-center justify-between p-2.5  
                            ${checkBooked(String(hour * 60)) ? "bg-red-600 text-white" : "bg-[#222222] dark:text-gray-200"} 
                            ${!checkBooked(String((hour * 60) + 30)) ? "rounded-b-none" : "rounded-b-none"}`}
                    >
                        {!checkBooked(String(hour * 60)) && checkBooked(String((hour * 60) - 30)) && (
                            <span className="text-sm text-gray-200 font-semibold">Verfügbar ab {hour}:00 Uhr</span>
                        )}
                    </div>
            
                    {/* Second Slot */}
                    <div
                        className={`h-10 flex items-center justify-between p-2.5  
                            ${checkBooked(String((hour * 60) + 30)) ? "bg-red-600 text-white" : "bg-[#222222] dark:text-gray-200"} 
                            ${!checkBooked(String((hour * 60) + 60)) ? "rounded-t-none border-b-4 border-[#1a1a1a]" : "rounded-b-none"}`}
                    >
                        {!checkBooked(String((hour * 60) + 30)) && checkBooked(String((hour * 60))) && (
                            <div className="flex items-center">
                                <CheckIcon className="w-4 h-4 mr-2 text-green-500" />
                                <span className="text-sm text-gray-200 font-semibold">Verfügbar ab {hour}:30 Uhr</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            

            );
        }
    
        // Scroll to 8:00 segment on initial render
        
    
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