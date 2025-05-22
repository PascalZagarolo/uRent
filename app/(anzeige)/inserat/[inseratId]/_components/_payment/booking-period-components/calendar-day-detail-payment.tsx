import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { booking, vehicle } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { de } from "date-fns/locale";
import { CheckIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { RiCalendarEventFill } from "react-icons/ri";

interface CalendarDayDetailPaymentProps {
    day_date: Date;
    affectedBookings: typeof booking.$inferSelect[];
    setCompletelyUnaivalable: (value: boolean) => void;
    setIsPartiallyUnaivalable: (value: boolean) => void;
    isMulti?: boolean;
    vehicles?: typeof vehicle.$inferSelect[];
    onSelectRange?: (start: Date, end: Date) => void;
}

const CalendarDayDetailPayment: React.FC<CalendarDayDetailPaymentProps> = ({
    day_date,
    affectedBookings,
    setCompletelyUnaivalable,
    setIsPartiallyUnaivalable,
    isMulti,
    vehicles,
    onSelectRange
}) => {

    let appointedTimes = [];
    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [selectedStart, setSelectedStart] = useState<number | null>(null);
    const [selectedEnd, setSelectedEnd] = useState<number | null>(null);

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
                console.log(format(day_date, "dd. MMMM"));
                //Buchung startet vor dem aktuellen Tag und endet nach dem aktuellen Tag, kompletter Tag ist belegt
                if (isBefore(pBooking.startDate, day_date) && isAfter(pBooking.endDate, day_date)) {
                    for (let i = 0; i <= 1440; i = i + 30) {
                        appointedTimes.push(i);
                    }
                    setCompletelyUnaivalable(true);
                   
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

    const handleSelectTime = (minute: number, available: boolean) => {
        if (!available) return;
        if (selectedStart === null || (selectedStart !== null && selectedEnd !== null)) {
            setSelectedStart(minute);
            setSelectedEnd(null);
            if (onSelectRange) {
                onSelectRange(null, null);
            }
        } else if (selectedStart !== null && selectedEnd === null) {
            if (minute > selectedStart) {
                setSelectedEnd(minute);
                if (onSelectRange) {
                    onSelectRange(new Date(day_date.setHours(Math.floor(selectedStart/60), selectedStart%60)), new Date(day_date.setHours(Math.floor(minute/60), minute%60)));
                }
            } else {
                setSelectedStart(minute);
                setSelectedEnd(null);
            }
        }
    };

    const isInRange = (minute: number) => {
        if (selectedStart !== null && selectedEnd !== null) {
            return minute > selectedStart && minute < selectedEnd;
        }
        return false;
    };

    const renderSegments = () => {
        const slots = [];
        for (let i = 0; i < 48; i++) {
            const hour = Math.floor(i / 2);
            const minute = i % 2 === 0 ? 0 : 30;
            const totalMinutes = hour * 60 + minute;
            const isBooked = checkBooked(String(totalMinutes));
            const isStart = selectedStart === totalMinutes && !isBooked;
            const isEnd = selectedEnd === totalMinutes && !isBooked;
            const inRange = isInRange(totalMinutes) && !isBooked;
            slots.push(
                <button
                    key={totalMinutes}
                    type="button"
                    aria-label={isBooked ? `${hour}:${minute === 0 ? '00' : '30'} Uhr belegt` : `${hour}:${minute === 0 ? '00' : '30'} Uhr auswählbar`}
                    disabled={isBooked}
                    onClick={() => handleSelectTime(totalMinutes, !isBooked)}
                    className={
                        `flex flex-col items-center justify-center h-20 w-full rounded-2xl border-2 transition-all duration-200 font-semibold text-xs focus:outline-none shadow-sm
                        ${isBooked ?
                            'bg-gray-200 dark:bg-[#23263a] text-gray-400 dark:text-gray-500 border-gray-200 dark:border-[#23263a] cursor-not-allowed opacity-60' :
                            isStart ?
                                'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-400 shadow-lg scale-105 animate-pulse' :
                            isEnd ?
                                'bg-blue-600 text-white border-blue-700 ring-2 ring-blue-400 shadow-lg scale-105 animate-pulse' :
                            inRange ?
                                'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-900 dark:text-indigo-100 border-indigo-300 dark:border-indigo-700' :
                                'bg-white dark:bg-[#191a23] text-indigo-900 dark:text-indigo-100 border-indigo-200 dark:border-indigo-900/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer hover:shadow-lg hover:-translate-y-1'}
                        `
                    }
                    tabIndex={isBooked ? -1 : 0}
                    role="option"
                    aria-selected={isStart || isEnd}
                >
                    <span className="text-lg font-extrabold flex items-center gap-1">
                        {hour}:{minute === 0 ? '00' : '30'}
                        {isStart && !isBooked && (
                            <svg className="w-5 h-5 text-white ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        )}
                        {isEnd && !isBooked && (
                            <svg className="w-5 h-5 text-white ml-1" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" /></svg>
                        )}
                    </span>
                    {isStart && !isBooked && (
                        <span className="mt-1 px-2 py-0.5 rounded-full bg-white/80 text-indigo-700 dark:bg-indigo-800/60 dark:text-indigo-200 text-[12px] font-bold shadow">Start</span>
                    )}
                    {isEnd && !isBooked && (
                        <span className="mt-1 px-2 py-0.5 rounded-full bg-white/80 text-blue-700 dark:bg-blue-800/60 dark:text-blue-200 text-[12px] font-bold shadow">Ende</span>
                    )}
                    {inRange && !isBooked && (
                        <span className="mt-1 px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-800/60 text-indigo-700 dark:text-indigo-200 text-[12px] font-semibold">Im Zeitraum</span>
                    )}
                    {isBooked && (
                        <span className="mt-1 text-[12px] text-gray-400 dark:text-gray-500 font-semibold">Belegt</span>
                    )}
                </button>
            );
        }
        return (
            <div className="w-full">
                <div className="mb-4 flex items-center gap-4 px-1 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                    <span className="inline-block w-4 h-4 rounded-full bg-indigo-600 mr-2 border-2 border-indigo-700"></span>
                    <span className="text-sm text-indigo-900 dark:text-indigo-100 font-bold">Start</span>
                    <span className="inline-block w-4 h-4 rounded-full bg-blue-600 ml-6 mr-2 border-2 border-blue-700"></span>
                    <span className="text-sm text-blue-700 dark:text-blue-200 font-bold">Ende</span>
                    <span className="inline-block w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-800/60 ml-6 mr-2 border-2 border-indigo-400"></span>
                    <span className="text-sm text-indigo-700 dark:text-indigo-200 font-bold">Im Zeitraum</span>
                    <span className="inline-block w-4 h-4 rounded-full bg-gray-200 dark:bg-[#23263a] ml-6 mr-2 border-2 border-gray-300 dark:border-[#23263a]"></span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">Belegt</span>
                </div>
                <div className="grid grid-cols-4 gap-5">
                    {slots}
                </div>
            </div>
        );
    };

   
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-7 h-7 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-200 font-bold text-xs shadow hover:bg-indigo-100 dark:hover:bg-indigo-800/60 transition-all">
                    {format(new Date(day_date), "d")}
                </button>
            </DialogTrigger>

            <DialogContent className="p-0 dark:border-none bg-white/95 dark:bg-[#191a23] rounded-2xl shadow-2xl max-w-lg w-full border border-indigo-100 dark:border-[#23263a]/60">
                <div className="h-[520px] overflow-y-auto no-scrollbar">
                    <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#191a23] rounded-t-2xl border-b border-indigo-100 dark:border-[#23263a]/60 px-6 pt-6 pb-2 flex items-center gap-3">
                        <RiCalendarEventFill className="w-5 h-5 text-indigo-700 dark:text-indigo-300" />
                        <div className="font-semibold text-base text-indigo-900 dark:text-indigo-100">
                            {format(new Date(day_date), "d. MMMM yyyy", { locale: de })}
                        </div>
                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">Verfügbarkeitsübersicht</span>
                        <DialogTrigger asChild>
                            <button className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-[#23263a] transition-colors">
                                <X className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                            </button>
                        </DialogTrigger>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <h2 className="text-lg font-extrabold text-indigo-900 dark:text-indigo-100 mb-1">Zeitslot auswählen</h2>
                        <p className="text-sm text-indigo-700 dark:text-indigo-200 mb-4 font-semibold">Klicke auf einen freien Zeitslot, um deine Buchung zu starten oder zu beenden.</p>
                    </div>
                    <div className="mt-2 px-4 pb-6">
                        <div className="flex flex-col gap-2">
                            {renderSegments()}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
    
}

export default CalendarDayDetailPayment;