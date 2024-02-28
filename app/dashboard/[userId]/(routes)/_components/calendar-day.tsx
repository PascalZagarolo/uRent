import { Button } from "@/components/ui/button";
import { Booking } from "@prisma/client";
import clsx from "clsx";
import { format, isToday } from "date-fns";
import { CarIcon } from "lucide-react";

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
                    className="  text-gray-900 flex justify-center mt-2"
                  >
                    <CarIcon className="text-gray-100 w-6 h-6"/>
                  </div>
                 
                );
              })}
            </div>
            
        
     );
}
 
export default CalendarDay;