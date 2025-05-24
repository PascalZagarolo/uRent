'use client'

import { Label } from "@/components/ui/label";
import { booking, inserat } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format, isSameDay, isToday } from 'date-fns';
import { de } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, FileClock, Filter } from "lucide-react";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BookingDayDetailsPopover from "./booking-day-details-popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AppointedTimeItem {
    inseratId: string;
    bookingIds: string[];
    vehicleId: string[];
    times: number[];
}

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
    const containerRef = useRef(null);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(3);
    const [appointedTimes, setAppointedTimes] = useState<AppointedTimeItem[]>([]);
    const [renderingInserate, setRenderingInserate] = useState(renderedInserate.slice(startIndex, endIndex));
    const [filteredAppointedDay, setFilteredAppointedDay] = useState(false);
    const [timeRange, setTimeRange] = useState<"all" | "business" | "morning" | "afternoon" | "evening">("business");

    // Determine time range hours
    const timeRanges = {
        all: { start: 0, end: 24 },
        business: { start: 8, end: 20 },
        morning: { start: 6, end: 12 },
        afternoon: { start: 12, end: 18 },
        evening: { start: 18, end: 23 }
    };

    const { start: startHour, end: endHour } = timeRanges[timeRange];

    // Check if time slot is booked
    const isTimeSlotBooked = useCallback((inseratId: string, timeMinutes: number) => {
        return appointedTimes.some(item => 
            item.inseratId === inseratId && 
            item.times.includes(timeMinutes)
        );
    }, [appointedTimes]);

    // Check if time slot is booked for multi-vehicle inserat
    const isTimeSlotBookedMulti = useCallback((inseratId: string, timeMinutes: number, vehicleId: string) => {
        return appointedTimes.some(item => 
            item.inseratId === inseratId && 
            item.times.includes(timeMinutes) &&
            item.vehicleId.includes(vehicleId)
        );
    }, [appointedTimes]);

    // Find booking for a specific time slot
    const findBookingForTimeSlot = useCallback((inseratId: string, timeMinutes: number, vehicleId?: string) => {
        const relevantAppointedTime = appointedTimes.find(item => 
            item.inseratId === inseratId && 
            item.times.includes(timeMinutes) &&
            (vehicleId ? item.vehicleId.includes(vehicleId) : true)
        );
        
        if (!relevantAppointedTime) return null;
        
        return relevantBookings.find(booking => 
            relevantAppointedTime.bookingIds.includes(booking.id)
        );
    }, [appointedTimes, relevantBookings]);

    // Filter inserate based on bookings
    useMemo(() => {
        if (filteredAppointedDay) {
            const filteredInserate = renderedInserate.filter(inserat => {
                const hasBookings = appointedTimes.some(item => 
                    item.inseratId === inserat.id && item.times.length > 0
                );
                return hasBookings;
            });
            setRenderingInserate(filteredInserate.slice(startIndex, Math.min(startIndex + 3, filteredInserate.length)));
        } else {
            setRenderingInserate(renderedInserate.slice(startIndex, Math.min(startIndex + 3, renderedInserate.length)));
        }
    }, [renderedInserate, startIndex, filteredAppointedDay, appointedTimes]);

    // Process bookings to get appointed times
    useMemo(() => {
        setAppointedTimes([]);
        
        if (!relevantBookings || relevantBookings.length === 0) return;

        const newAppointedTimes: AppointedTimeItem[] = [];

        relevantBookings.forEach(booking => {
            const bookingStartDate = new Date(booking.startDate);
            const bookingEndDate = new Date(booking.endDate);
            const startPeriod = Number(booking.startPeriod);
            const endPeriod = Number(booking.endPeriod);

            // Find or create entry for this inserat
            let inseratEntry = newAppointedTimes.find(item => item.inseratId === booking.inseratId);
            if (!inseratEntry) {
                inseratEntry = {
                    inseratId: booking.inseratId,
                    bookingIds: [],
                    vehicleId: [],
                    times: []
                };
                newAppointedTimes.push(inseratEntry);
            }

            // Add booking id
            if (!inseratEntry.bookingIds.includes(booking.id)) {
                inseratEntry.bookingIds.push(booking.id);
            }

            // Add vehicle id if present
            if (booking.vehicleId && !inseratEntry.vehicleId.includes(booking.vehicleId)) {
                inseratEntry.vehicleId.push(booking.vehicleId);
            }

            // Calculate times to mark as booked
            if (selectedDate) {
                let startTime = 0;
                let endTime = 24 * 60; // End of day in minutes

                // Adjust start/end times if booking starts/ends on selected date
                if (isSameDay(bookingStartDate, selectedDate)) {
                    startTime = startPeriod;
                }
                if (isSameDay(bookingEndDate, selectedDate)) {
                    endTime = endPeriod;
                }

                // Add all time slots in 30-minute increments
                for (let time = startTime; time < endTime; time += 30) {
                    if (!inseratEntry.times.includes(time)) {
                        inseratEntry.times.push(time);
                    }
                }
            }
        });

        setAppointedTimes(newAppointedTimes);
    }, [relevantBookings, selectedDate]);

    // Format time for display
    const formatTime = (hour: number, minute: number = 0) => {
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    };

    // Generate time slots for display
    const renderTimeSlots = () => {
        const timeSlots = [];
        
        for (let hour = startHour; hour < endHour; hour++) {
            timeSlots.push(
                <div key={`time-${hour}`} className="flex items-center h-12 sticky left-0 bg-[#0F0F0F] z-10">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 pl-4">
                        <Clock className="h-3.5 w-3.5 text-gray-500" />
                        <span>{formatTime(hour, 0)}</span>
                    </div>
                </div>
            );
            
            timeSlots.push(
                <div key={`time-${hour}-30`} className="flex items-center h-12 sticky left-0 bg-[#0F0F0F] z-10">
                    <div className="flex items-center space-x-2 text-sm text-gray-500 opacity-60 pl-4">
                        <span className="pl-5">{formatTime(hour, 30)}</span>
                    </div>
                </div>
            );
        }
        
        return timeSlots;
    };

    // Render time grid for an inserat
    const renderTimeGrid = (inseratId: string, vehicleId?: string) => {
        const cells = [];
        
        for (let hour = startHour; hour < endHour; hour++) {
            // Full hour slot
            const timeInMinutes = hour * 60;
            const isBooked = vehicleId 
                ? isTimeSlotBookedMulti(inseratId, timeInMinutes, vehicleId)
                : isTimeSlotBooked(inseratId, timeInMinutes);
            
            const booking = findBookingForTimeSlot(inseratId, timeInMinutes, vehicleId);
            
            cells.push(
                <div 
                    key={`grid-${hour}`} 
                    className={cn(
                        "h-12 relative group transition-colors",
                        isBooked 
                            ? "bg-gradient-to-r from-[#1A0A0A] to-[#1D0D0D]" 
                            : "bg-transparent hover:bg-[#111111]/50"
                    )}
                >
                    {isBooked && booking && (
                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="absolute inset-0 p-2 cursor-pointer">
                                        <BookingDayDetailsPopover
                                            thisBooking={booking}
                                            foundInserate={foundInserate}
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
                                    <div className="text-xs">
                                        <p className="font-medium">{booking.name || "Buchung"}</p>
                                        <p className="text-gray-400">
                                            {formatTime(Math.floor(Number(booking.startPeriod)/60), Number(booking.startPeriod)%60)} - 
                                            {formatTime(Math.floor(Number(booking.endPeriod)/60), Number(booking.endPeriod)%60)}
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    
                    {!isBooked && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-xs py-1 px-2.5 text-gray-400 rounded-sm bg-[#141414]/90">
                                {formatTime(hour, 0)}
                            </div>
                        </div>
                    )}
                </div>
            );
            
            // Half hour slot
            const halfHourTime = timeInMinutes + 30;
            const isHalfHourBooked = vehicleId 
                ? isTimeSlotBookedMulti(inseratId, halfHourTime, vehicleId)
                : isTimeSlotBooked(inseratId, halfHourTime);
            
            const halfHourBooking = findBookingForTimeSlot(inseratId, halfHourTime, vehicleId);
            
            cells.push(
                <div 
                    key={`grid-${hour}-30`} 
                    className={cn(
                        "h-12 relative group transition-colors",
                        isHalfHourBooked 
                            ? "bg-gradient-to-r from-[#1A0A0A] to-[#1D0D0D]" 
                            : "bg-transparent hover:bg-[#111111]/50"
                    )}
                >
                    {isHalfHourBooked && halfHourBooking && (
                        <TooltipProvider delayDuration={200}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="absolute inset-0 p-2 cursor-pointer">
                                        <BookingDayDetailsPopover
                                            thisBooking={halfHourBooking}
                                            foundInserate={foundInserate}
                                        />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-[#1A1A1A] border-[#2A2A2A] text-white">
                                    <div className="text-xs">
                                        <p className="font-medium">{halfHourBooking.name || "Buchung"}</p>
                                        <p className="text-gray-400">
                                            {formatTime(Math.floor(Number(halfHourBooking.startPeriod)/60), Number(halfHourBooking.startPeriod)%60)} - 
                                            {formatTime(Math.floor(Number(halfHourBooking.endPeriod)/60), Number(halfHourBooking.endPeriod)%60)}
                                        </p>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    
                    {!isHalfHourBooked && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-xs py-1 px-2.5 text-gray-400 rounded-sm bg-[#141414]/90">
                                {formatTime(hour, 30)}
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        
        return cells;
    };

    if (!selectedDate) {
        return (
            <Card className="bg-[#0F0F0F] border-0 shadow-none rounded-xl">
                <CardContent className="py-12">
                    <div className="flex flex-col items-center justify-center text-center p-8 space-y-5">
                        <div className="h-24 w-24 rounded-full bg-gradient-to-b from-[#171717] to-[#111111] flex items-center justify-center">
                            <CalendarIcon className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium">Wähle ein Datum aus</h3>
                        <p className="text-gray-400 max-w-md">
                            Klicke auf ein Datum im Kalender, um die Verfügbarkeiten und Buchungen für diesen Tag anzuzeigen.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-6 overflow-hidden bg-[#0F0F0F] border-0 shadow-none rounded-xl">
            <CardHeader className="pt-6 pb-6 bg-gradient-to-b from-[#0F0F0F] to-[#0D0D0D]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="flex flex-col">
                        <div className="flex items-center flex-wrap gap-2.5">
                            <div className="flex items-center bg-gradient-to-r from-[#131313] to-[#111111] px-3 py-1.5 rounded-full">
                                <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                                <span className="text-sm font-medium">{format(selectedDate, "EEEE", { locale: de })}</span>
                            </div>
                            <CardTitle className="text-lg">
                                {format(selectedDate, "d. MMMM yyyy", { locale: de })}
                            </CardTitle>
                            {isToday(selectedDate) && (
                                <Badge variant="secondary" className="bg-gradient-to-r from-[#1a1a1a] to-[#242424] border-0">
                                    Heute
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1.5">
                            Verfügbarkeiten und Buchungen im Tagesüberblick
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 items-center justify-end">
                        <div className="flex items-center bg-[#131313]/80 px-3 py-1.5 rounded-full">
                            <Checkbox
                                id="filter-bookings"
                                checked={filteredAppointedDay}
                                onCheckedChange={(checked) => {
                                    setFilteredAppointedDay(!!checked);
                                    setStartIndex(0);
                                }}
                                className="border-gray-700 data-[state=checked]:bg-gray-700 data-[state=checked]:border-gray-600 mr-2 h-4 w-4"
                            />
                            <Label 
                                htmlFor="filter-bookings" 
                                className="text-sm cursor-pointer text-gray-300"
                            >
                                Nur mit Buchungen
                            </Label>
                        </div>
                        
                        <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                            <SelectTrigger className="w-[160px] text-sm h-9 bg-[#131313]/80 border-0 rounded-full shadow-sm">
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                    <SelectValue placeholder="Zeitraum" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-[#131313] border-0 rounded-lg">
                                <SelectItem value="all">Ganzer Tag</SelectItem>
                                <SelectItem value="business">Geschäftszeiten</SelectItem>
                                <SelectItem value="morning">Morgen (6-12)</SelectItem>
                                <SelectItem value="afternoon">Nachmittag (12-18)</SelectItem>
                                <SelectItem value="evening">Abend (18-23)</SelectItem>
                            </SelectContent>
                        </Select>
                        
                        {renderedInserate.length > 3 && !selectedInserat && (
                            <div className="flex items-center bg-[#131313]/80 rounded-full px-2 py-1">
                                <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0 rounded-full flex items-center justify-center hover:bg-[#1a1a1a]/80 mr-1"
                                    disabled={startIndex === 0}
                                    onClick={() => {
                                        setStartIndex(Math.max(0, startIndex - 3));
                                    }}
                                    aria-label="Vorherige Seite"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center px-1">
                                    <span className="text-sm font-medium text-white min-w-8 text-center">
                                        {Math.floor(startIndex / 3) + 1}
                                    </span>
                                    <span className="text-gray-500 mx-1">/</span>
                                    <span className="text-sm text-gray-400 min-w-8 text-center">
                                        {Math.ceil(renderedInserate.length / 3)}
                                    </span>
                                </div>
                                <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="h-8 w-8 p-0 rounded-full flex items-center justify-center hover:bg-[#1a1a1a]/80 ml-1"
                                    disabled={startIndex + 3 >= renderedInserate.length}
                                    onClick={() => {
                                        setStartIndex(Math.min(renderedInserate.length - 3, startIndex + 3));
                                    }}
                                    aria-label="Nächste Seite"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="p-0">
                <div className="h-[520px] overflow-auto hide-scrollbar">
                    <div className="min-w-[800px] relative">
                        <div className="flex">
                            {/* Time column */}
                            <div className="w-[110px] bg-[#0D0D0D]">
                                <div className="h-14 flex items-center px-5 font-medium text-sm opacity-60">
                                    Zeit
                                </div>
                                {renderTimeSlots()}
                            </div>
                            
                            {/* Horizontal time marker lines - rendered once across all columns */}
                            <div className="absolute left-[110px] right-0 top-14 bottom-0 pointer-events-none z-0">
                                {Array.from({ length: (endHour - startHour) * 2 }).map((_, i) => (
                                    <div 
                                        key={`line-${i}`} 
                                        className={cn(
                                            "absolute left-0 right-0 h-[1px] bg-[#121212]",
                                            i % 2 === 0 && "bg-[#141414]" // Full hour gets slightly darker line
                                        )}
                                        style={{ top: `${i * 12}px` }}
                                    />
                                ))}
                            </div>
                            
                            {/* Inserat columns */}
                            {renderingInserate.length > 0 ? (
                                <>
                                    {selectedInseratData?.multi ? (
                                        // Multi-vehicle inserat
                                        selectedInseratData?.vehicles?.length > 0 ? (
                                            selectedInseratData.vehicles.map((vehicle: any, index) => (
                                                <div 
                                                    key={vehicle.id} 
                                                    className={cn(
                                                        "flex-1 min-w-[220px]",
                                                        index > 0 && "border-l border-[#0F0F0F]"
                                                    )}
                                                >
                                                    <div className="h-14 flex items-center px-5 font-medium text-sm truncate bg-[#0D0D0D]">
                                                        {vehicle.title}
                                                    </div>
                                                    {renderTimeGrid(selectedInseratData.id, vehicle.id)}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex-1 flex items-center justify-center p-14">
                                                <div className="text-center">
                                                    <FileClock className="h-14 w-14 text-gray-600 mx-auto mb-4 opacity-40" />
                                                    <h3 className="text-lg font-medium mb-2">Keine Fahrzeuge verfügbar</h3>
                                                    <p className="text-sm text-gray-500 max-w-md">
                                                        Dieses Inserat hat noch keine Fahrzeuge. Füge Fahrzeuge hinzu, um Verfügbarkeiten zu verwalten.
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        // Regular inserat
                                        renderingInserate.map((inserat, index) => (
                                            <div 
                                                key={inserat.id} 
                                                className={cn(
                                                    "flex-1 min-w-[220px]",
                                                    index > 0 && "border-l border-[#0F0F0F]"
                                                )}
                                            >
                                                <div className="h-14 flex items-center px-5 font-medium text-sm truncate bg-[#0D0D0D]">
                                                    <a 
                                                        href={`/inserat/${inserat.id}`} 
                                                        target="_blank" 
                                                        className="hover:underline truncate max-w-full"
                                                    >
                                                        {inserat.title}
                                                    </a>
                                                </div>
                                                {renderTimeGrid(inserat.id)}
                                            </div>
                                        ))
                                    )}
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center p-14">
                                    <div className="text-center">
                                        <Filter className="h-14 w-14 text-gray-600 mx-auto mb-5 opacity-40" />
                                        <h3 className="text-lg font-medium mb-3">Keine Inserate gefunden</h3>
                                        <p className="text-sm text-gray-500 max-w-md">
                                            {filteredAppointedDay 
                                                ? "Es gibt keine Inserate mit Buchungen an diesem Tag. Deaktiviere den Filter, um alle Inserate anzuzeigen."
                                                : "Es konnten keine passenden Inserate gefunden werden."}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-b from-[#0D0D0D] to-[#0F0F0F] p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-5 text-xs text-gray-500">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-gradient-to-r from-[#1A0A0A] to-[#1D0D0D] rounded-sm mr-2"></div>
                            <span>Gebucht/Nicht verfügbar</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-transparent border border-[#1a1a1a] rounded-sm mr-2"></div>
                            <span>Verfügbar</span>
                        </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                        Hover über einen Zeitslot für mehr Details
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default BookingDayDetails;