'use client';

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Booking, Inserat, User } from "@prisma/client";
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
  bookings: Booking & { inserat: Inserat, user: User }[];
}


const CalendarDay: React.FC<CalendarDayProps> = ({
  index,
  day,
  bookings
}) => {

  const searchParams = useSearchParams();

  const inseratFilter = searchParams.get("inseratId");
  const router = useRouter();
  return (


    <div
      key={index}
      className={clsx("dark:bg-[#1C1C1C] rounded-md p-4 text-center ", {
        "bg-gray-200": isToday(day),
        "text-emerald-400 font-semibold": isToday(day),
      })}
    >
      {format(day, "d")}
      {bookings?.map((booking: Booking & { inserat: Inserat, user: User }) => {
        return (

          <div
            key={booking.id}
            className="   bg-blue-600 rounded-md p-2 flex justify-center mt-2"
          >
            {inseratFilter ? (
              <X className="text-gray-900 w-4 h-4" />
            ) : (
              <HoverCard>
                <HoverCardTrigger><CarIcon className="text-gray-200 w-4 h-4" /></HoverCardTrigger>
                <HoverCardContent className="dark:bg-[#1C1C1C] border-none">
                  <h3 className="font-semibold flex justify-start">
                    {booking.inserat.title}
                  </h3>
                  <div className="flex items-center justify-start hover:underline hover:cursor-pointer" onClick={() => {router.push(`/profile/${booking.userId}`)}}>
                    <UserIcon className="h-4 w-4 mr-2" /> {booking?.user?.name} 
                    <div className="ml-auto">
                    <Image 
                    alt="Mieter-Bild"
                    src={booking?.user?.image || "/placeholder-person.jpg"}
                    width={100}
                    height={100}
                    className="w-[32px] h-[32px] rounded-full"
                    />
                    </div>
                  </div>
                  <div className="flex items-center justify-start">
                  <CalendarSearchIcon className="h-4 w-4 mr-2" />{format(new Date(booking.startDate), "dd.MM")} - {format(new Date(booking.endDate), "dd.MM")}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>

        );
      })}
    </div>


  );
}

export default CalendarDay;