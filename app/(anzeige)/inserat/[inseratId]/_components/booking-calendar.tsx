'use client';


import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    startOfMonth,
} from "date-fns";
import {  ArrowLeftCircleIcon, ArrowRightCircleIcon, SquareIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";

import { de } from 'date-fns/locale';
import CalendarDay from "./booking-day";
import { booking, inserat } from "@/db/schema";
import { FaSquare } from "react-icons/fa6";

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];



interface EventCalendarProps {
    thisInserat: typeof inserat.$inferSelect,
    receivedBookings: typeof booking.$inferSelect[]
}

const BookingCalendar = ({ receivedBookings, thisInserat }: EventCalendarProps) => {

    const [currentFilter, setCurrentFilter] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const [currentMonth, setCurrentMonth] = useState(0);

    const pathName = usePathname();

    const router = useRouter();

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

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

    const eventsByDate = useMemo(() => {
        return receivedBookings?.reduce((acc: { [key: string]: typeof booking.$inferSelect[] }, pBooking : typeof booking.$inferSelect) => {
            const startDate = new Date(pBooking.startDate);
            const endDate = new Date(pBooking.endDate);

            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const dateKey = format(currentDate, "yyyy-MM-dd");
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }

                acc[dateKey].push(pBooking);

                currentDate.setDate(currentDate.getDate() + 1);
            }

            return acc;
        }, {});
    }, [receivedBookings]);

    

    return (
        <div className="container mx-auto p-4 border dark:border-none h-[500px]">        
            <div className="mb-4 flex items-center">
                <Button onClick={decreaseMonth} className="" variant="ghost">
                    <ArrowLeftCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                </Button>
                <h2 className="text-center font-semibold w-[160px]">{format(currentDate, "MMMM yyyy", { locale : de })}</h2>
                <Button onClick={increaseMonth} className="" variant="ghost">
                    <ArrowRightCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                </Button>
                <div className="ml-auto"> 
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2 ">
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
                            className="  p-2 text-center dark:bg-[#171717]"
                        />
                    );
                })}
                {daysInMonth.map((day, index) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const todaysEvents = eventsByDate[dateKey] || [];
                    return (
                        <div key={index} className="">
                            <CalendarDay
                                index={index}
                                day={day}
                                key={dateKey}
                                bookings={todaysEvents}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="mt-2 text-xs dark:text-gray-200/60">
                *Klicke auf Tage um ihre vollständige Verfügbarkeit zu sehen.
            </div>
            <div className="mt-2 space-y-2">
                <h1 className="flex text-xs dark:text-gray-200/80 text-gray-700/70 gap-x-2">
                <SquareIcon className="w-4 h-4 text-indigo-800 bg-indigo-800" /> Teilweise Belegte Tage   
                </h1>
                <h1 className="flex text-xs dark:text-gray-200/80 text-gray-700/70 gap-x-2">
                <SquareIcon className="w-4 h-4 text-rose-800 bg-rose-800" /> Vollständig Belegte Tage   
                </h1>
            </div>
        </div>
    );
};

export default BookingCalendar;