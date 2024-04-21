'use client';

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { booking } from "@/db/schema";
import { cn } from "@/lib/utils";

import clsx from "clsx";
import { format, isToday } from "date-fns";
import { CalendarSearchIcon, CarIcon, UserIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteBooking from "../manage/_components/delete-booking";

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
        "text-emerald-400 font-semibold": isToday(day),
      })}
    >
      {format(day, "d")}
      {bookings?.map((pBooking) => {
        return (

          <>
          {isShowing(pBooking.inseratId, pBooking?.vehicleId) && 
          <div
          key={pBooking.id}
          className={cn("bg-blue-600 rounded-md py-2  flex justify-center mt-2",
                          pBooking.isAvailability && "bg-rose-700")}
        >
          {inseratFilter ? (
            <X className="text-gray-900 w-4 h-4" />
          ) : (
            <Popover>
              <PopoverTrigger><CarIcon className="text-gray-200 w-4 h-4" /></PopoverTrigger>
              <PopoverContent className="dark:bg-[#1C1C1C] border-none">
                <>
                {pBooking.isAvailability ? (
                  <div className="text-xs flex justify-start">
                    <div>
                    <div className="flex justify-start text-sm font-semibold">
                    <X className="w-4 h-4 mr-2" />{format(new Date(pBooking.startDate), "dd.MM")} - {format(new Date(pBooking.endDate), "dd.MM")}
                    </div>
                    Als nicht verfügbar markiert
                    <div className="flex justify-start mt-2 font-semibold">
                      {pBooking.content ? (
                        pBooking.content
                      ) : (
                        "Keine Notiz angegeben"
                      )}
                    </div>
                    </div>
                  </div>
                ) : (
                  <>
                  <h1 className="flex w-full items-center py-1 justify-end">
                    <DeleteBooking
                    bookingId={pBooking.id}
                    />
                  </h1>
                  <h3 className="font-semibold flex justify-start">
                    
                  {//@ts-ignore
                  pBooking.inserat.title}
                </h3>
                <div className="text-sm text-gray-200/70">
                  {pBooking.name}
                </div>
                {pBooking.userId && (
                  <div className="flex items-center justify-start hover:underline hover:cursor-pointer" 
                  onClick={() => {router.push(`/profile/${booking.userId}`)}}>
                    <UserIcon className="h-4 w-4 mr-2" /> {//@ts-ignore
                    pBooking?.user?.name} 
                    <div className="ml-auto">
                    <Image 
                    alt="Mieter-Bild"
                    src={//@ts-ignore
                      pBooking?.user?.image || "/placeholder-person.jpg"}
                    width={100}
                    height={100}
                    className="w-[32px] h-[32px] rounded-full"
                    />
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-start">
                <CalendarSearchIcon className="h-4 w-4 mr-2" />
                {format(new Date(pBooking.startDate), "dd.MM")} - {format(new Date(pBooking.endDate), "dd.MM")}
                </div>
                  </>
                )}
                </>
              </PopoverContent>
            </Popover>
          )}
        </div>
          }
          </>
            
          

        );
      })}
    </div>


  );
}

export default CalendarDay;