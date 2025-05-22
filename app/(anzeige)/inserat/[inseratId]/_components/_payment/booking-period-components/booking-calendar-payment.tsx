'use client';


import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    startOfMonth,
} from "date-fns";
import {  ArrowLeftCircleIcon, ArrowRightCircleIcon, SquareIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";

import { de } from 'date-fns/locale';

import { booking, inserat } from "@/db/schema";
import { FaSquare } from "react-icons/fa6";
import { isSameDay } from 'date-fns';
import CalendarDayPayment from "./calendar-day-payment";


const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];



interface EventCalendarProps {
    thisInserat: typeof inserat.$inferSelect,
    receivedBookings: typeof booking.$inferSelect[],
    onSelectRange?: (start: Date | null, end: Date | null) => void
}

const BookingCalendarPayment = ({ receivedBookings, thisInserat, onSelectRange }: EventCalendarProps) => {

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

    const startingDayIndex = (getDay(firstDayOfMonth) + 6) % 7;

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
            while (currentDate <= endDate || isSameDay(currentDate, endDate)) {
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
        <div className="w-full max-w-2xl mx-auto p-4 bg-white/90 dark:bg-[#181a22]/90 rounded-2xl shadow-lg border border-indigo-100 dark:border-[#23263a]/60 h-[500px]">
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
            <div className="grid grid-cols-7 gap-2 bg-indigo-50/60 dark:bg-[#23263a]/40 rounded-xl p-2">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="font-bold text-center py-2 text-indigo-700 dark:text-indigo-200 text-sm tracking-wide">
                        {day}
                    </div>
                ))}
                {Array.from({ length: startingDayIndex }).map((_, index) => (
                    <div
                        key={`empty-${index}`}
                        className="p-2 text-center bg-transparent"
                    />
                ))}
                {daysInMonth.map((day, index) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const todaysEvents = eventsByDate[dateKey] || [];
                    return (
                        <div key={index} className="">
                            <CalendarDayPayment 
                                index={index}
                                day={day}
                                bookings={todaysEvents}
                                isMulti={false}
                                vehicles={undefined}
                                onSelectRange={onSelectRange}
                            />
                        </div>
                    );  
                })}
            </div>
           
        </div>
    );
};

export default BookingCalendarPayment;