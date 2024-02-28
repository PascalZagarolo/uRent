'use client';


import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isToday,
    setMonth,
    startOfMonth,
} from "date-fns";
import { ArrowLeft, ArrowLeftCircleIcon, ArrowLeftFromLine, ArrowLeftSquare, ArrowRightCircleIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CalendarDay from "./calendar-day";
import { Button } from "@/components/ui/button";
import { Booking, Inserat } from "@prisma/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";

const WEEKDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];



interface EventCalendarProps {
    inserate: Inserat[],
    bookings: Booking[]
}

const EventCalendar = ({ bookings, inserate }: EventCalendarProps) => {

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
        return bookings.reduce((acc: { [key: string]: Booking[] }, booking) => {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);

            const currentDate = new Date(startDate);
            while (currentDate <= endDate) {
                const dateKey = format(currentDate, "yyyy-MM-dd");
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }

                acc[dateKey].push(booking);

                currentDate.setDate(currentDate.getDate() + 1);
            }

            return acc;
        }, {});
    }, [bookings]);

    useEffect(() => {
        const url = qs.stringifyUrl({
            url : pathName,
            query : {
                inseratId : currentFilter
            }
        } , { skipEmptyString : true, skipNull : true})
        router.push(url)
    },[currentFilter])

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex items-center">
                <Button onClick={decreaseMonth} className="" variant="ghost">
                    <ArrowLeftCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                </Button>

                <h2 className="text-center font-semibold w-[160px]">{format(currentDate, "MMMM yyyy")}</h2>
                <Button onClick={increaseMonth} className="" variant="ghost">
                    <ArrowRightCircleIcon className="w-4 h-4  hover:cursor-pointer" />
                </Button>


                <div className="ml-auto">
                    <Select onValueChange={(e) => {setCurrentFilter(e)}}>
                        <SelectTrigger className="dark:bg-[#0f0f0f] border-none w-[200px] truncate" onSelect={(e) => { console.log(e) }}>
                            <SelectValue onSelect={(e) => { console.log(e) }} placeholder="Nach Inserat filtern" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#0f0f0f] border-none">
                            {inserate.map((inserat, index) => (
                                <SelectItem key={index} value={inserat.id}>
                                    {inserat.title} 
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {WEEKDAYS.map((day) => {
                    return (
                        <div key={day} className="font-bold text-center ">
                            {day}
                        </div>
                    );
                })}
                {Array.from({ length: startingDayIndex }).map((_, index) => {
                    return (
                        <div
                            key={`empty-${index}`}
                            className=" rounded-md p-2 text-center "
                        />
                    );
                })}
                {daysInMonth.map((day, index) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const todaysEvents = eventsByDate[dateKey] || [];
                    return (
                        <div>
                            <CalendarDay
                                index={index}
                                day={day}
                                //@ts-ignore
                                bookings={todaysEvents}
                            />

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventCalendar;