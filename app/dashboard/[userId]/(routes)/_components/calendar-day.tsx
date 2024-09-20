'use client';

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { booking, inserat } from "@/db/schema";
import { cn } from "@/lib/utils";

import clsx from "clsx";
import { format, isSameDay, isToday } from "date-fns";
import { CalendarSearchIcon, CarIcon, Clock3Icon, UserIcon, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteBooking from "../manage/_components/delete-booking";
import EditBooking from "../manage/_components/edit-booking";
import { GiHouseKeys, GiShakingHands } from "react-icons/gi";
import { CgUnavailable } from "react-icons/cg";
import CalenderDayDetail from "./calender-day-detail";
import { useState } from "react";

interface Event {
  date: Date;
  title: string;

}

interface CalendarDayProps {
  index: number;
  day: Date;
  bookings: typeof booking.$inferSelect[];
  foundInserate: typeof inserat.$inferSelect[];
  selectedDate? : Date,
  selectDateParent? : (date : Date) => void;
  setSelectedDateParent? : (date : Date) => void;
  setRelevantBookingsParent? : (bookings : typeof booking.$inferSelect[]) => void;
  selectedInserat? : string;
}


const CalendarDay: React.FC<CalendarDayProps> = ({
  index,
  day,
  bookings,
  foundInserate,
  selectDateParent,
  setSelectedDateParent,
  setRelevantBookingsParent,
  selectedDate,
  selectedInserat
}) => {

  

  const searchParams = useSearchParams();

  const inseratFilter = selectedInserat;
  const vehicleFilter = null;
  

  const [isUnavailable, setIsUnavailable] = useState(false);
  const isSelected = isSameDay(day, selectedDate);


  const router = useRouter();

  const isShowing = (id: string, vehicleId?: string) => {
    if (inseratFilter) {
      if (vehicleFilter) {

        return vehicleId === vehicleFilter && id === inseratFilter;
      }
      return id === inseratFilter;
    } else {
      return true;
    }

  }

  const convertIntoTime = (time) => {
    // Calculate hours and minutes
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
  
    // Format hours and minutes to be two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
  
    // Combine formatted hours and minutes with "Uhr"
    const formattedTime = `${formattedHours}:${formattedMinutes} Uhr`;
  
    return formattedTime;
  };

  return (


    <div
    onClick={() => {
      setSelectedDateParent(day);
      setRelevantBookingsParent(bookings);
      selectDateParent(day);
      }}
      key={index}
      className={clsx("dark:bg-[#0F0F0F] h-full p-4 text-center ", {
        "bg-gray-200": isToday(day),
        "text-emerald-400 font-semibold": isToday(day),
      })}
    >
      <div className={cn("hover:cursor-pointer", isSelected && "text-indigo-800 font-bold")} 
      onClick={() => {
        setSelectedDateParent(day);
        setRelevantBookingsParent(bookings);
        selectDateParent(day);
        }}>
        {format(day, "d")}
      </div>
      {bookings?.map((pBooking) => {
        return (

          <>
            {(isShowing(pBooking.inseratId, pBooking?.vehicleId)) &&
              <div
                key={pBooking.id}
                className={cn("bg-indigo-800 rounded-md py-2  flex justify-center mt-2",
                  pBooking.isAvailability && "bg-rose-800")}
                onClick={(e) => e.stopPropagation()}
              >
                {inseratFilter ? (
                  <X className="text-gray-900 w-4 h-4" />
                ) : (
                  <Popover>
                    <PopoverTrigger>
                      <div className="">
                        <div className="flex justify-center">
                        
                        </div>
                        <div className="flex p-2 justify-start w-full ">
                        <div className="text-xs  w-full  line-clamp-1 break-all">
                          
                          {pBooking?.name}
                          
                        </div>
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="dark:bg-[#1C1C1C] border-none">
                      <>
                        {pBooking.isAvailability ? (
                          <div className="text-xs">
                            <h1 className="flex w-full items-center py-1 justify-end gap-x-4">
                            <DeleteBooking
                                bookingId={pBooking.id}
                              />
                            </h1>
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
                            <h1 className="flex w-full items-center py-1 justify-end gap-x-4">
                              <EditBooking
                                foundInserate={foundInserate}
                                thisBooking={pBooking}
                              />
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
                                onClick={() => { router.push(`/profile/${booking.userId}`) }}>
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
                            <div className="flex items-center justify-start text-sm">
                              <CalendarSearchIcon className="h-4 w-4 mr-2" />
                              {format(new Date(pBooking.startDate), "dd.MM")} - {format(new Date(pBooking.endDate), "dd.MM")}
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock3Icon className="w-4 h-4 mr-2" /> {convertIntoTime(pBooking.startPeriod)} - {convertIntoTime(pBooking.endPeriod)}
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