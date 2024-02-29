'use client';

import { Button } from "@/components/ui/button";
import { Booking } from "@prisma/client";
import clsx from "clsx";
import { format, isToday } from "date-fns";
import { CarIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Event {
    date: Date;
    title: string;
  }

interface CalendarDayProps {
    index : number;
    day : Date;
    bookings : Booking[];
}


const CalendarDay: React.FC<CalendarDayProps> = ({
    index,
    day,
    bookings
}) => {

  const searchParams = useSearchParams();

  const inseratFilter = searchParams.get("inseratId");

    return ( 
        
            
                <div
              key={index}
              className={clsx("dark:bg-[#1C1C1C] rounded-md p-4 text-center ", {
                "bg-gray-200": isToday(day),
                "text-emerald-400 font-semibold": isToday(day),
              })}
            >
              {format(day, "d")}
              {bookings?.map((booking) => {
                return (
                 
                    <div
                    key={booking.id}
                    className="  text-gray-900 bg-emerald-500 rounded-md p-2 flex justify-center mt-2"
                  >
                    {inseratFilter ? (
                      <X className="text-gray-900 w-4 h-4"/>
                    ) : (
                      <CarIcon className="text-gray-900 w-4 h-4"/>
                    )}
                  </div>
                 
                );
              })}
            </div>
            
        
     );
}
 
export default CalendarDay;