'use client';


import {
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isSameDay,
    startOfMonth,
    startOfWeek,
} from "date-fns";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useMemo, useState } from "react";
import CalendarDay from "./calendar-day";
import { Button } from "@/components/ui/button";


import { booking, inserat } from "@/db/schema";
import { de } from 'date-fns/locale';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MdCalendarMonth, MdOutlineViewWeek } from "react-icons/md";
import { isBefore } from 'date-fns';

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];



interface EventCalendarProps {
    everyInserat: typeof inserat.$inferSelect[],
    bookings: typeof booking.$inferSelect[],
    setSelectedDateParent?: (date: Date) => void
    setRelevantBookingsParent?: (bookings: typeof booking.$inferSelect[]) => void;
    selectedInserat?: string;
}

const EventCalendar = ({ bookings, everyInserat, setSelectedDateParent, setRelevantBookingsParent, selectedInserat }: EventCalendarProps) => {


    const [currentDate, setCurrentDate] = useState(new Date());
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const firstDayOfWeek = startOfWeek(currentDate);
    const lastDayOfWeek = endOfWeek(currentDate);
    const [selectedCalendarType, setSelecteCalendarType] = useState("week");

    const [selectedDate, setSelectedDate] = useState<Date>(null);


    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    const daysInWeek = eachDayOfInterval({
        start: firstDayOfWeek,
        end: lastDayOfWeek,
    })

    const startingDayIndex = getDay(firstDayOfMonth);

    const increaseMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const decreaseMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const increaseWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentDate(newDate);
    }

    const decreaseWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentDate(newDate);
    }



    const eventsByDate = useMemo(() => {
        return bookings?.reduce((acc: { [key: string]: typeof booking.$inferSelect[] }, pBooking: typeof booking.$inferSelect) => {
            const startDate = new Date(pBooking.startDate);
            const endDate = new Date(pBooking.endDate);

            const currentDate = new Date(startDate);
            while (isBefore(currentDate, endDate) || isSameDay(currentDate, endDate)) {

                const dateKey = format(currentDate, "dd-MM-yyyy");
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }

                acc[dateKey].push(pBooking);

                currentDate.setDate(currentDate.getDate() + 1);
            }

            return acc;
        }, {});
    }, [bookings]);



    return (
        <div className="sm:container mx-auto w-full sm:p-4 border dark:border-none sm:mt-0 mt-4">
            <div className="mb-4 sm:flex items-center">
                {selectedCalendarType === "month" ? (
                    <div className="flex items-center">
                        <Button onClick={decreaseMonth} className="dark:bg-[#0F0F0F]" variant="ghost">
                            <ArrowLeftCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                        </Button>
                        <h2 className="text-center font-semibold w-[160px] ">{format(currentDate, "MMMM yyyy", { locale: de })}</h2>
                        <Button onClick={increaseMonth} className="dark:bg-[#0F0F0F]" variant="ghost">
                            <ArrowRightCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center">
                        <Button onClick={decreaseWeek} className="dark:bg-[#0F0F0F]" variant="ghost">
                            <ArrowLeftCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                        </Button>
                        <h2 className="text-center font-semibold w-[160px] ">{format(currentDate, "MMMM yyyy", { locale: de })}</h2>
                        <Button onClick={increaseWeek} className="dark:bg-[#0F0F0F]" variant="ghost">
                            <ArrowRightCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                        </Button>
                    </div>
                )}

                <div className="sm:ml-auto ">
                    <div className="w-full mt-2 sm:mt-0">
                        <Button size="sm" variant="ghost"
                            onClick={() => setSelecteCalendarType("month")}
                            className={cn("text-gray-200/60 hover:text-gray-200/90 rounded-none rounded-l-md w-1/2",
                                selectedCalendarType === "month" && "bg-[#0F0F0F] hover:bg-[#131313] text-gray-200 hover:text-gray-300")}
                        >
                            <MdCalendarMonth className="w-4 h-4 mr-2" />   Monatsansicht
                        </Button>
                        <Button size="sm" variant="ghost"
                            onClick={() => setSelecteCalendarType("week")}
                            className={cn("text-gray-200/60 hover:text-gray-200/90 rounded-none rounded-r-md w-1/2",
                                selectedCalendarType === "week" && "bg-[#0F0F0F] hover:bg-[#131313] text-gray-200 hover:text-gray-300")}
                        >
                            <MdOutlineViewWeek className="w-4 h-4 mr-2" /> Wochenansicht
                        </Button>
                    </div>
                </div>
            </div>
            {selectedCalendarType === "month" && (
                <div className="grid grid-cols-7 gap-2">
                    {WEEKDAYS.map((day) => {
                        return (
                            <div key={day} className="font-bold text-center bg-gray-200 dark:bg-[#0F0F0F]">
                                {day}
                            </div>
                        );
                    })}
                    {Array.from({ length: startingDayIndex }).map((_, index) => {
                        return (
                            <div
                                key={`empty-${index}`}
                                className="  p-2 text-center "
                            />
                        );
                    })}
                    {daysInMonth.map((day, index) => {
                        const dateKey = format(day, "dd-MM-yyyy");
                        const todaysEvents = eventsByDate[dateKey] || [];

                        return (
                            <div key={index} className="h-full">
                                <CalendarDay
                                    index={index}
                                    day={day}
                                    key={dateKey}
                                    bookings={todaysEvents}
                                    selectedDate={selectedDate}
                                    selectDateParent={setSelectedDate}
                                    setSelectedDateParent={setSelectedDateParent}
                                    setRelevantBookingsParent={setRelevantBookingsParent}
                                    foundInserate={everyInserat}
                                    selectedInserat={selectedInserat ? selectedInserat : null}
                                />

                            </div>
                        );
                    })}
                </div>
            )}
            {selectedCalendarType === "week" && (
                <div className="grid grid-cols-7 sm:gap-2 gap-1">
                    {WEEKDAYS.map((day) => {
                        return (
                            <div key={day} className="font-bold text-center bg-gray-200 dark:bg-[#0F0F0F]">
                                {day}
                            </div>
                        );
                    })}
                    {daysInWeek.map((day, index) => {
                        const dateKey = format(day, "dd-MM-yyyy");
                        const todaysEvents = eventsByDate[dateKey] || [];

                        return (
                            <div key={index} className="h-[420px]">
                                
                                <CalendarDay
                                    index={index}
                                    day={day}
                                    key={dateKey}
                                    bookings={todaysEvents}
                                    selectedDate={selectedDate}
                                    selectDateParent={setSelectedDate}
                                    setSelectedDateParent={setSelectedDateParent}
                                    setRelevantBookingsParent={setRelevantBookingsParent}
                                    foundInserate={everyInserat}
                                    selectedInserat={selectedInserat ? selectedInserat : null}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default EventCalendar;