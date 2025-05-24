'use client';

import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
    addDays,
    subDays,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import CalendarDay from "./calendar-day";
import { Button } from "@/components/ui/button";
import { booking, inserat } from "@/db/schema";
import { de } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

interface EventCalendarProps {
    everyInserat: typeof inserat.$inferSelect[],
    bookings: typeof booking.$inferSelect[],
    setSelectedDateParent?: (date: Date) => void
    setRelevantBookingsParent?: (bookings: typeof booking.$inferSelect[]) => void;
    selectedInserat?: string;
    calendarView?: string;
    selectedDate?: Date;
}

const EventCalendar = ({ 
    bookings, 
    everyInserat, 
    setSelectedDateParent, 
    setRelevantBookingsParent, 
    selectedInserat,
    calendarView = "week",
    selectedDate = new Date()
}: EventCalendarProps) => {
    // State
    const initialDate = useMemo(() => selectedDate || new Date(), []);
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [view, setView] = useState(calendarView);

    // Update current date when selectedDate changes
    useEffect(() => {
        if (selectedDate && !isSameDay(selectedDate, currentDate)) {
            setCurrentDate(selectedDate);
        }
    }, [selectedDate, currentDate]);
    
    // Calendar calculations
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const startDay = startOfWeek(currentDate, { weekStartsOn: 1 }); // Week starts on Monday
    const endDay = endOfWeek(currentDate, { weekStartsOn: 1 });

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    const daysInWeek = eachDayOfInterval({
        start: startDay,
        end: endDay,
    });
    
    // For the month view, include days from previous and next months
    const calendarDays = useMemo(() => {
        const start = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
        const end = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    }, [firstDayOfMonth, lastDayOfMonth]);

    // Navigation functions
    const navigate = (direction: 'prev' | 'next') => {
        if (view === 'day') {
            setCurrentDate(direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1));
        } else if (view === 'week') {
            setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
        } else if (view === 'month') {
            setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
        }
    };

    // Group bookings by date for efficient lookup
    const eventsByDate = useMemo(() => {
        const eventMap = {};

        bookings?.forEach((event) => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            
            // For each day between start and end date (inclusive)
            const daysInterval = eachDayOfInterval({
                start: startDate,
                end: endDate,
            });
            
            daysInterval.forEach(day => {
                const dateKey = format(day, "dd-MM-yyyy");
                if (!eventMap[dateKey]) {
                    eventMap[dateKey] = [];
                }
                eventMap[dateKey].push(event);
            });
        });

        return eventMap;
    }, [bookings]);

    // Handle date selection
    const handleDateSelect = (date: Date) => {
        // Only update if the date is different to avoid unnecessary re-renders
        if (!isSameDay(date, currentDate)) {
            setCurrentDate(date);
            
            if (setSelectedDateParent) {
                setSelectedDateParent(date);
            }
            
            const dateKey = format(date, "dd-MM-yyyy");
            const todaysEvents = eventsByDate[dateKey] || [];
            
            if (setRelevantBookingsParent) {
                setRelevantBookingsParent(todaysEvents);
            }
        }
    };
    
    // Go to today
    const goToToday = () => {
        const today = new Date();
        
        // Only update if we're not already on today
        if (!isSameDay(currentDate, today)) {
            handleDateSelect(today);
        }
    };

    return (
        <div className="space-y-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate('prev')}
                        className="dark:border-gray-800 dark:bg-[#151515] dark:hover:bg-[#202020]"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <h2 className="text-base font-medium min-w-32 text-center">
                        {view === 'day' && format(currentDate, "d. MMMM yyyy", { locale: de })}
                        {view === 'week' && (
                            <>
                                {format(startDay, "d. MMM", { locale: de })} – {format(endDay, "d. MMM yyyy", { locale: de })}
                            </>
                        )}
                        {view === 'month' && format(currentDate, "MMMM yyyy", { locale: de })}
                    </h2>
                    
                    <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate('next')}
                        className="dark:border-gray-800 dark:bg-[#151515] dark:hover:bg-[#202020]"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="flex items-center gap-2">
                    <Select 
                        value={view} 
                        onValueChange={setView}
                    >
                        <SelectTrigger className="w-[130px] dark:border-gray-800 dark:bg-[#151515]">
                            <SelectValue placeholder="Ansicht" />
                        </SelectTrigger>
                        <SelectContent className="dark:border-gray-800 dark:bg-[#151515]">
                            <SelectItem value="day">Tag</SelectItem>
                            <SelectItem value="week">Woche</SelectItem>
                            <SelectItem value="month">Monat</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Button 
                        variant="outline" 
                        size="sm"
                        onClick={goToToday}
                        className="dark:border-gray-800 dark:bg-[#151515] dark:hover:bg-[#202020]"
                    >
                        Heute
                    </Button>
                </div>
            </div>

            {/* Day View */}
            {view === "day" && (
                <div className="border rounded-lg dark:border-gray-800 overflow-hidden">
                    <div className="bg-gray-50 dark:bg-[#151515] p-3 text-center border-b dark:border-gray-800">
                        <div className="font-medium">
                            {format(currentDate, "EEEE", { locale: de })}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {format(currentDate, "d. MMMM yyyy", { locale: de })}
                        </div>
                    </div>
                    <div className="h-[600px] overflow-y-auto">
                        <CalendarDay
                            index={0}
                            day={currentDate}
                            bookings={eventsByDate[format(currentDate, "dd-MM-yyyy")] || []}
                            selectedDate={currentDate}
                            selectDateParent={handleDateSelect}
                            setSelectedDateParent={setSelectedDateParent}
                            setRelevantBookingsParent={setRelevantBookingsParent}
                            foundInserate={everyInserat}
                            selectedInserat={selectedInserat}
                        />
                    </div>
                </div>
            )}

            {/* Week View */}
            {view === "week" && (
                <div className="border rounded-lg dark:border-gray-800 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
                        {daysInWeek.map((day, index) => (
                            <div 
                                key={`header-${index}`} 
                                className={cn(
                                    "py-2.5 px-1 text-center bg-gray-50 dark:bg-[#151515]",
                                    isToday(day) && "bg-blue-50 dark:bg-blue-900/10"
                                )}
                            >
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {format(day, "E", { locale: de })}
                                </div>
                                <div className={cn(
                                    "mt-1 font-medium text-sm flex justify-center",
                                    isToday(day) && "text-blue-600 dark:text-blue-400"
                                )}>
                                    {format(day, "d")}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px h-[650px] overflow-y-auto bg-gray-200 dark:bg-gray-800">
                        {daysInWeek.map((day, index) => {
                            const dateKey = format(day, "dd-MM-yyyy");
                            const todaysEvents = eventsByDate[dateKey] || [];
                            const isCurrentDay = isSameDay(day, currentDate);

                            return (
                                <div 
                                    key={`day-${index}`} 
                                    className={cn(
                                        "h-full bg-white dark:bg-[#191919]",
                                        isToday(day) && "bg-blue-50 dark:bg-blue-900/5",
                                        isCurrentDay && "ring-2 ring-inset ring-blue-500 dark:ring-blue-600"
                                    )}
                                >
                                    <CalendarDay
                                        index={index}
                                        day={day}
                                        bookings={todaysEvents}
                                        selectedDate={currentDate}
                                        selectDateParent={handleDateSelect}
                                        setSelectedDateParent={setSelectedDateParent}
                                        setRelevantBookingsParent={setRelevantBookingsParent}
                                        foundInserate={everyInserat}
                                        selectedInserat={selectedInserat}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Month View */}
            {view === "month" && (
                <div className="border rounded-lg dark:border-gray-800 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
                        {WEEKDAYS.map((day) => (
                            <div key={day} className="py-2.5 text-center bg-gray-50 dark:bg-[#151515] text-sm font-medium">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
                        {calendarDays.map((day, index) => {
                            const dateKey = format(day, "dd-MM-yyyy");
                            const todaysEvents = eventsByDate[dateKey] || [];
                            const isCurrentMonth = isSameMonth(day, currentDate);
                            const isDaySelected = isSameDay(day, currentDate);
                            const dayIsToday = isToday(day);

                            return (
                                <div 
                                    key={`month-day-${index}`} 
                                    className={cn(
                                        "min-h-[110px] relative",
                                        isCurrentMonth ? "bg-white dark:bg-[#191919]" : "bg-gray-50 dark:bg-[#131313] text-gray-400 dark:text-gray-600",
                                        dayIsToday && "bg-blue-50 dark:bg-blue-900/5",
                                        isDaySelected && "ring-2 ring-inset ring-blue-500 dark:ring-blue-600"
                                    )}
                                    onClick={() => handleDateSelect(day)}
                                >
                                    <div className="p-1.5">
                                        <span 
                                            className={cn(
                                                "flex items-center justify-center w-7 h-7 text-sm rounded-full",
                                                dayIsToday ? "bg-blue-500 dark:bg-blue-600 text-white" : 
                                                (isCurrentMonth ? "hover:bg-gray-100 dark:hover:bg-gray-800" : "")
                                            )}
                                        >
                                            {format(day, "d")}
                                        </span>
                                    </div>
                                    
                                    <div className="px-1 pt-1 pb-1 space-y-1 max-h-[80px] overflow-hidden">
                                        {todaysEvents.slice(0, 3).map((event, idx) => (
                                            <div 
                                                key={`event-${idx}`} 
                                                className={cn(
                                                    "text-xs px-1.5 py-0.5 rounded truncate",
                                                    event.isAvailability 
                                                        ? "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300" 
                                                        : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                                                )}
                                            >
                                                {event.name || (event.isAvailability ? "Nicht verfügbar" : "Buchung")}
                                            </div>
                                        ))}
                                        {todaysEvents.length > 3 && (
                                            <div className="text-xs text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-0.5 rounded">
                                                +{todaysEvents.length - 3} mehr
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventCalendar;