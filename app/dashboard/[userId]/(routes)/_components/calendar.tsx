'use client';


import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    startOfMonth,
} from "date-fns";
import {  ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CalendarDay from "./calendar-day";
import { Button } from "@/components/ui/button";


import { booking,  inserat } from "@/db/schema";
import { de } from 'date-fns/locale';

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];



interface EventCalendarProps {
    everyInserat: typeof inserat.$inferSelect[],
    bookings: typeof booking.$inferSelect[]
}

const EventCalendar = ({ bookings, everyInserat }: EventCalendarProps) => {

    
    const [currentDate, setCurrentDate] = useState(new Date());
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    
    
    

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
        return bookings?.reduce((acc: { [key: string]: typeof booking.$inferSelect[] }, pBooking : typeof booking.$inferSelect) => {
            const startDate = new Date(pBooking.startDate);
            const endDate = new Date(pBooking.endDate);

            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                console.log(currentDate, pBooking)
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
        <div className="container mx-auto p-4 border dark:border-none">
            <div className="mb-4 flex items-center">
                <Button onClick={decreaseMonth} className="" variant="ghost">
                    <ArrowLeftCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                </Button>
                <h2 className="text-center font-semibold w-[160px]">{format(currentDate, "MMMM yyyy", { locale : de })}</h2>
                <Button onClick={increaseMonth} className="" variant="ghost">
                    <ArrowRightCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                </Button>
                
            </div>
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
                            className="  p-2 text-center dark:bg-[#202020]"
                        />
                    );
                })}
                {daysInMonth.map((day, index) => {
                    const dateKey = format(day, "dd-MM-yyyy");
                    const todaysEvents = eventsByDate[dateKey] || [];
                    
                    return (
                        <div key={index} className="">
                            <CalendarDay
                                index={index}
                                day={day}
                                key={dateKey}
                                bookings={todaysEvents}
                                foundInserate={everyInserat}
                            />

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventCalendar;