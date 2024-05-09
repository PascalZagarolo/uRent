'use client';

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { booking } from "@/db/schema";
import { cn } from "@/lib/utils";

import clsx from "clsx";
import { format, isToday } from "date-fns";

import { useRouter, useSearchParams } from "next/navigation";
import CalenderDayDetail from '../../../../dashboard/[userId]/(routes)/_components/calender-day-detail';
import { useEffect, useState } from "react";


interface Event {
  date: Date;
  title: string;
}

interface CalendarDayProps {
  index: number;
  day: Date;
  bookings: typeof booking.$inferSelect[];
}


const CalendarDay: React.FC<CalendarDayProps> = ({
  index,
  day,
  bookings
}) => {

  const searchParams = useSearchParams();

  const inseratFilter = searchParams.get("inseratId");
  const vehicleFilter = searchParams.get("vehicleId");
  const router = useRouter();

  const [isCompletelyUnaivalable, setIsCompletelyUnaivalable] = useState(false);

  const isShowing = (id: string, vehicleId?: string) => {
    if (inseratFilter) {
      if (vehicleFilter) {

        return vehicleId === vehicleFilter && id === inseratFilter;
      }
      return id === inseratFilter;
    }
    return true;
  }

  

  return (
    <>
      

      <div
        key={index}
        className={clsx("dark:bg-[#0F0F0F]  p-4 text-center rounded-md", {
          "bg-gray-200": isToday(day),
          "font-black": isToday(day),
          "dark:bg-rose-800 bg-rose-800": isCompletelyUnaivalable,
          "dark:bg-indigo-800 bg-indigo-500": (bookings.length > 0) && !isCompletelyUnaivalable,
        })}
      >
        {isCompletelyUnaivalable ? ( 
<>{format(new Date(day), "d")}</>
        ) : (
<CalenderDayDetail 
        day_date={day}
        affectedBookings={bookings}
        setCompletelyUnaivalable={setIsCompletelyUnaivalable}
        />
        )}



      </div>
    </>

  );
}

export default CalendarDay;