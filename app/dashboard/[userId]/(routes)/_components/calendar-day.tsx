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
import EditAvailability from "../manage/_components/edit-availability";

interface Event {
  date: Date;
  title: string;

}

interface CalendarDayProps {
  index: number;
  day: Date;
  bookings: typeof booking.$inferSelect[] | any;
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
        setSelectedDateParent?.(day);
        setRelevantBookingsParent?.(bookings);
        selectDateParent?.(day);
      }}
      key={index}
      className={clsx("dark:bg-[#101010] h-full p-4 rounded-lg transition-all cursor-pointer text-center", {
        "bg-gray-100": isToday(day),
        "text-orange-600 font-bold": isToday(day),
        "shadow-lg border-[#131313] border": isSelected,
        "hover:bg-[#202020]": !isSelected,
      })}
    >
      <div className={cn("text-lg text-gray-300", 
      isSelected && "text-gray-200 font-extrabold",
      isToday(day) && !isSelected && "text-indigo-600 font-bold"
      )}>
        {format(day, "d")}
      </div>
      {bookings?.map((pBooking) => {
        return (
          <>
            {(isShowing(pBooking.inseratId, pBooking?.vehicleId)) &&
              <div
                key={pBooking.id}
                className={cn(
                  "rounded-md py-2 sm:px-4 mt-3 text-white flex justify-between items-center bg-gradient-to-r",
                  pBooking.isAvailability ? "from-rose-600 to-rose-800" : "from-indigo-600 to-indigo-800"
                )}
                onClick={(e) => e.stopPropagation()}
              >
                <Popover>
                  <PopoverTrigger>
                    <div className="w-full">
                      <div className="sm:flex justify-between items-center">
                        <div className="flex items-center sm:space-x-2 text-sm font-medium ">
                          
                          <span className={cn("line-clamp break-all sm:block hidden", !pBooking.name && "text-gray-200/60")}>{pBooking.name || "Keine Angaben"}</span>
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg max-w-sm">
                    <>
                      {pBooking.isAvailability ? (
                        <div className="text-xs">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">Als nicht verfügbar markiert</span>
                            <div className="flex gap-2">
                              <EditAvailability foundInserate={foundInserate} thisBooking={pBooking} />
                              <DeleteBooking bookingId={pBooking.id} />
                            </div>
                          </div>
                          <div className="text-sm">
                            <span>{format(new Date(pBooking.startDate), "dd.MM")} - {format(new Date(pBooking.endDate), "dd.MM")}</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-lg">{pBooking.inserat?.title || "Buchung"}</span>
                            <div className="flex gap-2">
                              <EditBooking foundInserate={foundInserate} thisBooking={pBooking} />
                              <DeleteBooking bookingId={pBooking.id} />
                            </div>
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {pBooking.name}
                          </div>
                          {pBooking.userId && (
                            <div className="flex items-center space-x-2 mt-3 text-sm">
                              <UserIcon className="w-4 h-4" />
                              <span onClick={() => router.push(`/profile/${booking.userId}`)} className="hover:underline cursor-pointer">
                                {pBooking.user?.name}
                              </span>
                              <Image
                                alt="Mieter-Bild"
                                src={pBooking.user?.image || "/placeholder-person.jpg"}
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full"
                              />
                            </div>
                          )}
                          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <CalendarSearchIcon className="w-4 h-4 mr-1" />
                            {format(new Date(pBooking.startDate), "dd.MM")} - {format(new Date(pBooking.endDate), "dd.MM")}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock3Icon className="w-4 h-4 mr-1" />
                            {convertIntoTime(pBooking.startPeriod)} - {convertIntoTime(pBooking.endPeriod)}
                          </div>
                        </>
                      )}
                    </>
                  </PopoverContent>
                </Popover>
              </div>
            }
          </>
        );
      })}
    </div>


  );
}

export default CalendarDay;