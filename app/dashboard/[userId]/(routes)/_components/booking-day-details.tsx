'use client'

import { Label } from "@/components/ui/label";
import { booking, inserat } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Share1Icon } from "@radix-ui/react-icons";
import { format, isSameDay } from "date-fns";
import { de, fi } from "date-fns/locale";
import { CheckIcon, LinkIcon, Share2Icon } from "lucide-react";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import BookingDayDetailsPopover from "./booking-day-details-popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vehicle } from '../../../../../db/schema';

interface BookingDayDetailsProps {
    selectedDate: Date;
    relevantBookings: typeof booking.$inferSelect[];
    foundInserate: typeof inserat.$inferSelect[];
    selectedInserat : string;
    selectedInseratData : typeof inserat.$inferSelect;
    renderedInserate : any[];
    
}

const BookingDayDetails: React.FC<BookingDayDetailsProps> = ({
    selectedDate,
    relevantBookings,
    foundInserate,
    selectedInserat,
    selectedInseratData,
    renderedInserate
}) => {

    const [appointedTimes, setAppointedTimes] = useState<{ [key: string]: any[] }[]>([]);
    const [usedBookings, setUsedBookings] = useState(relevantBookings);
    
    
    



    useMemo(() => {
        setAppointedTimes([]);
        setUsedBookings(relevantBookings);
    
        for (const pBooking of relevantBookings) {
            if (relevantBookings) {
                setAppointedTimes(prevAppointedTimes => {
                    const newAppointedTimes: { [key: string]: any[] }[] = [...prevAppointedTimes];
                    const existingIndex = newAppointedTimes.findIndex(item => item.bookingIds.includes(pBooking.id));
                    if (existingIndex === -1) {
                        newAppointedTimes.push({
                            //@ts-ignore
                            inseratId: pBooking.inseratId,
                            bookingIds: [pBooking.id],
                            vehicleId: [pBooking?.vehicleId] || null,
                            times: []
                        });
                    } else {
                        newAppointedTimes[existingIndex].bookingIds.push(pBooking.id);
                    }
    
                    // Populate appointed times array based on booking dates and periods
                    const index = newAppointedTimes.findIndex(item => item.bookingIds.includes(pBooking.id));
                    if (!isSameDay(pBooking.startDate, selectedDate) && !isSameDay(pBooking.endDate, selectedDate)) {
                        for (let i = 0; i <= 1440; i += 30) {
                            newAppointedTimes[index].times.push(i);
                        }
                    } else if (isSameDay(pBooking.startDate, selectedDate) && isSameDay(pBooking.endDate, selectedDate)) {
                        for (let i = Number(pBooking.startPeriod); i <= Number(pBooking.endPeriod); i += 30) {
                            newAppointedTimes[index].times.push(i);
                        }
                    } else if (isSameDay(pBooking.startDate, selectedDate) && !isSameDay(pBooking.endDate, selectedDate)) {
                        for (let i = Number(pBooking.startPeriod); i <= 1440; i += 30) {
                            newAppointedTimes[index].times.push(i);
                        }
                    } else if (!isSameDay(pBooking.startDate, selectedDate) && isSameDay(pBooking.endDate, selectedDate)) {
                        for (let i = 0; i <= Number(pBooking.endPeriod); i += 30) {
                            newAppointedTimes[index].times.push(i);
                        }
                    }
    
                    return newAppointedTimes;
                });
            }
        }
    }, [relevantBookings, selectedDate, selectedInserat]);

    const checkBooked = (inseratId: string, number: string) => {

        //@ts-ignore
        return appointedTimes.some(item => item.inseratId === inseratId && item.times.includes(Number(number)));
    }


    const checkBookedMulti = (inseratId: string, number: string, vehicleId: string) => {
    
        //@ts-ignore
        return appointedTimes.some(item => (item.inseratId === inseratId && item.times.includes(Number(number)) &&
            item.vehicleId.includes(vehicleId)));
    }

    const renderSegments = () => {
        const segments = [];
        for (let hour = 8; hour <= 23; hour++) {
            segments.push(
                <div key={hour} className="dark:bg-[#131313] text-sm flex items-center  dark:border border-[#191919] h-[80px]">
                    <div>
                        <div className="p-2 text-sm w-4/4 h-[40px]">
                            {hour}:00 Uhr
                        </div>
                        <div className="p-2 text-sm w-4/4 dark:text-gray-200/60 h-[40px]">
                            {hour}:30 Uhr
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
                            {checkBooked(inseratId, String(hour * 60)) && (
                                <div className="w-full">

                                    <BookingDayDetailsPopover
                                        // @ts-ignore
                                        thisBooking={relevantBookings.find(booking => 
                                            //@ts-ignore
                                            appointedTimes.find(item => item.inseratId === inseratId
                                            && item.times.includes((hour * 60))))}
                                        foundInserate={foundInserate}
                                    />
                                </div>
                            )}
                            {(!checkBooked(inseratId, String(hour * 60)) && checkBooked(inseratId, String((hour * 60) - 30))) && (
                                <div className="text-xs font-medium gap-x-2 flex">
                                    <CheckIcon className="w-4 h-4 mr-2 text-emerald-600" />
                                    Verfügbar ab {hour}:00 Uhr

                                </div>
                            )}
                        </div>
                        <div className={cn("h-[40px] w-full p-2 font-semibold text-xs border-t border-dotted border-[#191919]",
                            checkBooked(inseratId, String((hour * 60) + 30)) ? " bg-rose-800" : "",
                            checkBooked(inseratId, String((hour * 60) + 60)) ? "" : "rounded-b-lg",
                            checkBooked(inseratId, String((hour * 60))) ? "" : "rounded-t-lg"
                        )}>
                            {checkBooked(inseratId, String((hour * 60) + 30)) && (
                                <div className="w-full">
                                    <BookingDayDetailsPopover
                                        foundInserate={foundInserate}
                                        // @ts-ignore
                                        thisBooking={relevantBookings.find(booking => appointedTimes.find(item => item.inseratId === inseratId && item.times.includes((hour * 60) + 30) && item.bookingIds.includes(booking.id)))}
                                    />
                                </div>
                            )}
                            {(!checkBooked(inseratId, String((hour * 60) + 30)) && checkBooked(inseratId, String((hour * 60)))) && (
                                <div className="flex text-xs font-medium">
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

    const renderAvailabilityMulti = (inseratId: string, vehicleId: string) => {
        const segments = [];
        for (let hour = 8; hour <= 23; hour++) {
            segments.push(
                <div key={`${vehicleId}-${hour}`} className="dark:bg-[#131313] text-sm flex items-center h-[80px] dark:border border-[#191919]">
                    <div className="h-full ml-auto w-full flex flex-col">
                        <div className={cn("h-[40px] w-full p-2",
                            checkBookedMulti(inseratId, String(hour * 60), vehicleId) ? " bg-rose-800" : "",
                            checkBookedMulti(inseratId, String((hour * 60) + 30), vehicleId) ? "" : "rounded-b-lg",
                            checkBookedMulti(inseratId, String((hour * 60) - 30), vehicleId) ? "" : "rounded-t-lg"
                        )}>
                            {checkBookedMulti(inseratId, String(hour * 60), vehicleId) && (
                                <div className="w-full">
                                    <BookingDayDetailsPopover
                                        foundInserate={foundInserate}
                                        thisBooking={relevantBookings.find(booking =>
                                            appointedTimes.find(item =>
                                                //@ts-ignore
                                                item.inseratId === inseratId &&
                                                item.times.includes(hour * 60) &&
                                                item.bookingIds.includes(booking.id) &&
                                                item.vehicleId.includes(vehicleId)
                                            )
                                        )}
                                    />
                                </div>
                            )}
                            {!checkBookedMulti(inseratId, String(hour * 60), vehicleId) &&
                            checkBookedMulti(inseratId, String((hour * 60) - 30), vehicleId) && (
                                <div className="text-xs font-medium gap-x-2 flex">
                                    <CheckIcon className="w-4 h-4 mr-2 text-emerald-600" />
                                    Verfügbar ab {hour}:00 Uhr
                                </div>
                            )}
                        </div>
                        <div className={cn("h-[40px] w-full p-2 font-semibold text-xs border-t border-dotted border-[#191919]",
                            checkBookedMulti(inseratId, String((hour * 60) + 30), vehicleId) ? " bg-rose-800" : "",
                            checkBookedMulti(inseratId, String((hour * 60) + 60), vehicleId) ? "" : "rounded-b-lg",
                            checkBookedMulti(inseratId, String((hour * 60)), vehicleId) ? "" : "rounded-t-lg"
                        )}>
                            {checkBookedMulti(inseratId, String((hour * 60) + 30), vehicleId) && (
                                <div className="w-full">
                                    <BookingDayDetailsPopover
                                        foundInserate={foundInserate}
                                        thisBooking={relevantBookings.find(booking =>
                                            appointedTimes.find(item =>
                                                //@ts-ignore
                                                item.inseratId === inseratId &&
                                                item.times.includes((hour * 60)+30) &&
                                                item.bookingIds.includes(booking.id) &&
                                                item.vehicleId.includes(vehicleId)
                                            )
                                        )}
                                    />
                                </div>
                            )}
                            {!checkBookedMulti(inseratId, String((hour * 60) + 30), vehicleId) &&
                            checkBookedMulti(inseratId, String((hour * 60)), vehicleId) && (
                                <div className="flex text-xs font-medium">
                                    <CheckIcon className="w-4 h-4 mr-2 text-emerald-600" /> Verfügbar ab {hour}:30 Uhr
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
        <div className="w-full">
            <div>
                <div className="flex items-center w-full">
                    <Label className="text-md font-semibold flex items-center gap-x-2 w-full">
                        {selectedInserat &&
                            <div className="font-semibold text-indigo-600 w-1/3 line-clamp-1">
                                {foundInserate.find(inserat => inserat.id === selectedInserat)?.title}
                            </div>
                        } Tagesansicht {selectedDate && (
                            <div >
                                - {format(selectedDate, "dd MMMM yyyy", { locale: de })}
                            </div>
                        )}

                    </Label>
                    
                </div>
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
                            <div className="p-8 text-sm">
                                Uhrzeit
                            </div>
                            <div>
                                {renderSegments()}
                            </div>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <div className={cn("gap-x-16 flex items-center justify-evenly",
                                (foundInserate.length > 1 && !selectedInserat) && "ml-16")}>


                                {selectedInseratData?.multi ? (
                                    // @ts-ignore
                                    selectedInseratData?.vehicles?.map((vehicle) => (
                                        // @ts-ignore
                                        <div className={cn("", selectedInseratData?.vehicles?.length === 1 && "w-full")} key={vehicle.id}>
                                            <div className="font-medium text-sm p-8 w-[240px] text-left overflow-hidden">
                                                <a className="line-clamp-1 break-all hover:underline text-left" href={`/inserat/${inserat.id}`} target="_blank">
                                                    {vehicle?.title}
                                                </a>
                                            </div>
                                            {selectedDate && (
                                                <div>
                                                    {renderAvailabilityMulti(selectedInseratData?.id, vehicle?.id)}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    renderedInserate.map((inserat) => (
                                        <div className={cn("", (selectedInserat || renderedInserate.length === 1) && "w-full")} key={inserat.id}>
                                            <div className="font-medium text-sm p-8 w-[240px] text-left overflow-hidden">
                                                <a className="line-clamp-1 break-all hover:underline text-left" href={`/inserat/${inserat.id}`} target="_blank">
                                                    {inserat.title}
                                                </a>
                                            </div>
                                            {selectedDate && (
                                                <div>
                                                    {renderAvailability(inserat.id)}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}


                            </div>
                            {!selectedDate && (
                                <div className="text-sm font-normal dark:text-gray-200/60 w-full flex justify-center">
                                    Klicke auf ein Datum um die Details einzusehen
                                </div>

                            )}
                            {//@ts-ignore
                            selectedInseratData?.multi && selectedInseratData?.vehicles.length === 0 && (
                                <div className="text-sm font-normal dark:text-gray-200/60 w-full justify-center h-full flex items-center">
                                    Noch keine Fahrzeuge erstellt..
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDayDetails;