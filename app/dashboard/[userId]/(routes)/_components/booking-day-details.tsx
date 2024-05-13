'use client'

import { Label } from "@/components/ui/label";
import { booking, inserat } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { de } from "date-fns/locale";
import { CheckIcon } from "lucide-react";

import React, { useCallback, useEffect, useMemo, useState } from "react";

interface BookingDayDetailsProps {
    selectedDate: Date;
    relevantBookings: typeof booking.$inferSelect[];
    foundInserate: typeof inserat.$inferSelect[];
}

const BookingDayDetails: React.FC<BookingDayDetailsProps> = ({
    selectedDate,
    relevantBookings,
    foundInserate
}) => {

    const [appointedTimes, setAppointedTimes] = useState({});
    const [usedBookings, setUsedBookings] = useState(relevantBookings);

    

    useMemo(() => {
        setAppointedTimes({});
        setUsedBookings(relevantBookings);
        
        for (const pBooking of relevantBookings) {
            
            if (relevantBookings) {
                if (!isSameDay(pBooking.startDate, selectedDate) && !isSameDay(pBooking.endDate, selectedDate)) {
    
                    setAppointedTimes(prevAppointedTimes => {
                        const newAppointedTimes: any = { ...prevAppointedTimes };
                        if (!newAppointedTimes[pBooking.inseratId]) {
                            newAppointedTimes[pBooking.inseratId] = [];
                        }
                        for (let i = 0; i <= 1440; i += 30) {
                            newAppointedTimes[pBooking.inseratId].push(i);
                        }
                        return newAppointedTimes;
                    });
                } else if (isSameDay(pBooking.startDate, selectedDate) && isSameDay(pBooking.endDate, selectedDate)) {
    
                    setAppointedTimes(prevAppointedTimes => {
                        const newAppointedTimes: any = { ...prevAppointedTimes };
                        if (!newAppointedTimes[pBooking.inseratId]) {
                            newAppointedTimes[pBooking.inseratId] = [];
                        }
                        for (let i = Number(pBooking.startPeriod); i <= Number(pBooking.endPeriod); i = i + 30) {
                            newAppointedTimes[pBooking.inseratId].push(i);
                        }
                        return newAppointedTimes;
                    });
    
    
                } else if (isSameDay(pBooking.startDate, selectedDate) && !isSameDay(pBooking.endDate, selectedDate)) {
    
                    setAppointedTimes(prevAppointedTimes => {
                        const newAppointedTimes: any = { ...prevAppointedTimes };
                        if (!newAppointedTimes[pBooking.inseratId]) {
                            newAppointedTimes[pBooking.inseratId] = [];
                        }
                        for (let i = Number(pBooking.startPeriod); i <= 1440; i = i + 30) {
                            newAppointedTimes[pBooking.inseratId].push(i);
                        }
                        return newAppointedTimes;
                    });
                } else if (!isSameDay(pBooking.startDate, selectedDate) && isSameDay(pBooking.endDate, selectedDate)) {
                    setAppointedTimes(prevAppointedTimes => {
                        const newAppointedTimes: any = { ...prevAppointedTimes };
                        if (!newAppointedTimes[pBooking.inseratId]) {
                            newAppointedTimes[pBooking.inseratId] = [];
                        }
                        for (let i = 0; i <= Number(pBooking.endPeriod); i = i + 30) {
                            newAppointedTimes[pBooking.inseratId].push(i);
                        }
                        return newAppointedTimes;
                    });
                }
            }
    
        }
        
    },[selectedDate])

    const checkBooked = (inseratId: string, number: string) => {
        if(appointedTimes[inseratId]) {
            if (appointedTimes[inseratId].includes(Number(number))) {
                return true;
            }
        } else {
            return false;
        }
    }

    const renderSegments = () => {
        const segments = [];
        for (let hour = 8; hour <= 23; hour++) {
            segments.push(
                <div key={hour} className="dark:bg-[#131313] text-sm flex items-center  dark:border border-[#191919] h-[80px]">
                    <div>
                        <div className="p-2 text-sm w-2/5">
                            {hour}:00 Uhr
                        </div>
                    </div>

                </div>
            );
        }
        return segments;
    };

    const renderAvailability = (inseratId: string) => {
        const segments = [];
        for (let hour = 8; hour <= 23; hour++) {
            segments.push(
                <div key={hour} className="dark:bg-[#131313] text-sm flex items-center h-[80px] dark:border border-[#191919]">
                    
                    <div className="h-full ml-auto w-full flex flex-col">
                        <div className={cn("h-[40px] w-full p-2", 
                        checkBooked(inseratId, String(hour * 60)) ? " bg-rose-800" : "",
                        checkBooked(inseratId, String((hour * 60) + 30)) ? "" : "rounded-b-lg",
                        checkBooked(inseratId, String((hour * 60) - 30)) ? "" : "rounded-t-lg"
                        )}>
                            {(!checkBooked(inseratId, String(hour * 60)) && checkBooked(inseratId, String((hour * 60) - 30))) && (
                                `Verfügbar ab ${hour}:00 Uhr`
                            )}
                        </div>
                        <div className={cn("h-[40px] w-full p-2 font-semibold text-xs border-t border-dotted border-[#191919]", 
                        checkBooked(inseratId, String((hour * 60) + 30)) ? " bg-rose-800" : "",
                        checkBooked(inseratId, String((hour * 60) + 60)) ? "" : "rounded-b-lg",
                        checkBooked(inseratId, String((hour * 60))) ? "" : "rounded-t-lg"
                        )}>
                            {(!checkBooked(inseratId, String((hour * 60) + 30)) && checkBooked(inseratId, String((hour * 60)))) && (
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
    }

    return (
        <div className="w-full">
            <div>
                <Label className="text-md font-semibold">
                    Tagesansicht {selectedDate && (
                        <>
                            - {format(selectedDate, "dd MMMM yyyy", { locale: de })}
                        </>
                    )}

                </Label>
                <p className="text-xs dark:text-gray-200/60">
                    Detaillierte Tagesansicht für den {selectedDate && (
                        <>
                            {format(selectedDate, "dd MMMM yyyy", { locale: de })}
                        </>
                    )}
                </p>
            </div>
            <div className="mt-4 w-full">
                {!selectedDate && (
                    <div className="text-sm font-normal dark:text-gray-200/60 w-full flex justify-center">
                        Klicke auf ein Datum um die Details einzusehen
                    </div>
                )}
                <div className="mt-4 dark:bg-[#0F0F0F] rounded-md">
                    <div className="w-full flex ">

                        <div className="w-1/4">
                            <div className="p-8">
                                Uhrzeit
                            </div>
                            <div>
                                {renderSegments()}
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <div className="gap-x-16 flex items-center justify-evenly">
                                {foundInserate.map((inserat) => (
                                    <div className="">
                                        <div className="font-medium text-md p-8">
                                        {inserat.title}
                                    </div>
                                    <div>
                                    {renderAvailability(inserat.id)}
                                    </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDayDetails;