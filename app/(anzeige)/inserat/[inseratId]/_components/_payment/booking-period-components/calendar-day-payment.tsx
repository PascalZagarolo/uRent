'use client';


import { booking, vehicle } from "@/db/schema";


import clsx from "clsx";
import { format, isToday } from "date-fns";


import { useState } from "react";
import CalendarDayDetailPayment from "./calendar-day-detail-payment";


interface Event {
  date: Date;
  title: string;
  
}

interface CalendarDayProps {
  index: number;
  day: Date;
  bookings: typeof booking.$inferSelect[];
  isMulti ?: boolean;
  vehicles ?: typeof vehicle.$inferSelect[];
  onSelectRange?: (start: Date | null, end: Date | null) => void;
}


const CalendarDayPayment: React.FC<CalendarDayProps> = ({
  index,
  day,
  bookings,
  isMulti,
  vehicles,
  onSelectRange
}) => {





  const [isCompletelyUnaivalable, setIsCompletelyUnaivalable] = useState(false);
  const [isPartiallyUnaivalable, setIsPartiallyUnaivalable] = useState(false);




  

  return (
    <>


      <div
        key={index}
        className={clsx(
          "flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 mx-auto my-1 rounded-xl text-center cursor-pointer transition-all duration-150 border border-transparent",
          {
            // Unavailable: strong rose background
            "bg-rose-100 dark:bg-rose-900/80 text-rose-700 dark:text-rose-200 font-bold border-rose-200 dark:border-rose-800": isCompletelyUnaivalable,
            // Partially unavailable: soft indigo background
            "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-200 font-bold border-indigo-200 dark:border-indigo-800": isPartiallyUnaivalable && !isCompletelyUnaivalable,
            // Today: ring
            "ring-2 ring-indigo-400 border-indigo-300 dark:ring-indigo-700 dark:border-indigo-700": isToday(day) && !isCompletelyUnaivalable && !isPartiallyUnaivalable,
            // Default: soft white/gray
            "bg-white/90 dark:bg-[#23263a] text-gray-700 dark:text-gray-200": !isCompletelyUnaivalable && !isPartiallyUnaivalable && !isToday(day),
            // Hover effect
            "hover:shadow-lg hover:bg-indigo-50 dark:hover:bg-indigo-800/40": !isCompletelyUnaivalable,
            // Selected: strong ring
            // (If you want a selected state, add a prop and style here)
          }
        )}
      >
        {isCompletelyUnaivalable ? (
          <span className="text-xs font-bold">{format(new Date(day), "d")}</span>
        ) : (
          <span className="flex items-center justify-center w-full h-full">
            <CalendarDayDetailPayment
              day_date={day}
              affectedBookings={bookings}
              setCompletelyUnaivalable={setIsCompletelyUnaivalable}
              setIsPartiallyUnaivalable={setIsPartiallyUnaivalable}
              isMulti={isMulti}
              vehicles={vehicles}
              onSelectRange={onSelectRange}
            />
          </span>
        )}



      </div>
    </>

  );
}

export default CalendarDayPayment;