'use client'

import { Label } from "@/components/ui/label";
import { booking, inserat } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Share1Icon } from "@radix-ui/react-icons";
import { format, isSameDay, set } from 'date-fns';
import { de, fi } from "date-fns/locale";
import { CheckIcon, LinkIcon, Share2Icon } from "lucide-react";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import BookingDayDetailsPopover from "./booking-day-details-popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { vehicle } from '../../../../../db/schema';
import { ScrollArea } from "@/components/ui/scroll-area";
import { PiArrowLineLeftBold, PiArrowLineRightBold } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface BookingDayDetailsProps {
    selectedDate: Date;
    relevantBookings: typeof booking.$inferSelect[];
    foundInserate: typeof inserat.$inferSelect[];
    selectedInserat: string;
    selectedInseratData: typeof inserat.$inferSelect;
    renderedInserate: any[];

}

const BookingDayDetails: React.FC<BookingDayDetailsProps> = ({
    selectedDate,
    relevantBookings,
    foundInserate,
    selectedInserat,
    selectedInseratData,
    renderedInserate
}) => {

    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3);

    const [appointedTimes, setAppointedTimes] = useState<{ [key: string]: any[] }[]>([]);
    const [usedBookings, setUsedBookings] = useState(relevantBookings);
    const [renderingInserate, setRenderingInserate] = useState(renderedInserate.slice(startIndex, endIndex));
    const [filteredAppointedDay, setFilteredAppointedDay] = useState(false);

    let foundBooking : any;


    useMemo(() => {

        let filteredI;
        
        if(filteredAppointedDay) {
            filteredI = renderedInserate.filter((inserat) => {
                const bookedTimes = appointedTimes.find(item => item.inseratId === inserat.id)?.times;
                if (bookedTimes) {
                    return bookedTimes.length > 0;
                }
            
            })
            //! Include Pagination on filtered Inserate
            
            setRenderingInserate(filteredI.slice(startIndex, endIndex));
        } else {
            const usedList = renderedInserate.slice(startIndex, endIndex);
           
            setRenderingInserate(usedList);
        }

        
    }, [renderedInserate, startIndex, endIndex, selectedDate, filteredAppointedDay, foundInserate, appointedTimes])



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
                                                item.times.includes((hour * 60) + 30) &&
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
                    <Label className="text-md font-semibold flex items-center max-w-full gap-x-2 ">
                        {selectedInserat &&
                            <div className="font-semibold text-indigo-600 max-w-1/3 line-clamp-1">
                                {foundInserate.find(inserat => inserat.id === selectedInserat)?.title}
                            </div>
                        } Tagesansicht {selectedDate && (
                            <div className="">
                                {format(selectedDate, "dd MMMM yyyy", { locale: de })}
                            </div>
                        )}

                    </Label>
                    {renderedInserate.length > 3 && !selectedInserat && (

                        <div className="ml-auto flex justify-end gap-x-2 items-center">
                            <div>
                                <Button size="sm" variant="ghost"
                                    disabled={startIndex === 0}
                                    onClick={() => {
                                        
                                        setStartIndex(startIndex - 3 >= 0 ? startIndex - 3 : 0);
                                        setEndIndex(startIndex - 3 > 0 ? endIndex - 3 : 3);
                                    }}>
                                    <PiArrowLineLeftBold className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="w-full">
                                Seite {startIndex / 3 + 1} 
                            </div>
                            <div>
                                <Button size="sm" variant="ghost"
                                    disabled={endIndex === renderedInserate.length}
                                    onClick={() => {
                                        setEndIndex(endIndex + 3 <= renderedInserate.length - 1 ? endIndex + 3 : renderedInserate.length);
                                        setStartIndex(startIndex + 3 <= renderedInserate.length ? startIndex + 3 : renderedInserate.length);

                                    }}>
                                    <PiArrowLineRightBold className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>


                    )}
                </div>
                <div className="text-xs dark:text-gray-200/60 flex items-center">
                    Detaillierte Tagesansicht für den {selectedDate && (
                        <>
                            {format(selectedDate, "dd MMMM yyyy", { locale: de })}
                        </>
                    )}
                    <div className="ml-auto text-gray-200 gap-x-2 flex items-center text-xs">
                        <Checkbox 
                        checked={filteredAppointedDay}
                        onCheckedChange={(e) => {
                            setFilteredAppointedDay(e as boolean)
                            setStartIndex(0);
                            setEndIndex(3);
                        }}
                        />
                        <div className="hover:underline hover:cursor-pointer"
                        onClick={() => setFilteredAppointedDay(!filteredAppointedDay)}
                        >
                            Nur Inserate mit Buchungen anzeigen
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 w-full ">

                <div className="mt-4 dark:bg-[#0F0F0F] rounded-md h-[720px] overflow-y-scroll ">
                    <div className="w-full flex ">

                        <div className="w-1/4">
                            <div className="p-8 text-sm">
                                Uhrzeit
                            </div>
                            <div>
                                {renderSegments()}
                            </div>
                        </div>

                        <div className="w-full overflow-x-hidden">
                            <div className={cn(" flex items-center justify-evenly")
                            }>


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
                                    renderingInserate.map((inserat) => (
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
                                <div className="text-sm font-normal dark:text-gray-200/60 w-full flex justify-center mt-32">
                                    Klicke auf ein Datum um die Details einzusehen
                                </div>

                            )}
                            {//@ts-ignore
                                selectedInseratData?.multi && selectedInseratData?.vehicles.length === 0 && (
                                    <div className="text-sm font-normal dark:text-gray-200/60 w-full justify-center h-full flex items-center">
                                        Noch keine Fahrzeuge erstellt..
                                    </div>
                                )}
                            {(renderingInserate.length === 0 && !selectedDate) && (
                                <div className="flex justify-center text-sm text-gray-200/60 mt-32">
                                    Keine passenden Inserate vorhanden..
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