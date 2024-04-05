'use client';

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { booking } from "@/db/schema";
import { cn } from "@/lib/utils";

import clsx from "clsx";
import { format, isToday } from "date-fns";
import { CalendarSearchIcon, CarIcon, UserIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

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
  
  const isShowing = (id : string, vehicleId? : string) => {
    if(inseratFilter){
        if(vehicleFilter){
          
          return vehicleId === vehicleFilter && id === inseratFilter;
        }
      return id === inseratFilter;
    }
    return true;
  }

  return (


    <div
      key={index}
      className={clsx("dark:bg-[#0F0F0F]  p-4 text-center ", {
        "bg-gray-200": isToday(day),
        "text-emerald-400 font-bold": isToday(day),
        "dark:bg-rose-900 bg-rose-900" : (bookings.length > 0),
      })}
    >
      {format(day, "d")}
      
        
      
    </div>


  );
}

export default CalendarDay;