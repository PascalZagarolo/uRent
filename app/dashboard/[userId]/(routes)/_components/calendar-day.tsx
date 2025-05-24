'use client';

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { booking, inserat } from "@/db/schema";
import { cn } from "@/lib/utils";

import clsx from "clsx";
import { format, isSameDay, isToday, parseISO } from "date-fns";
import { CalendarSearchIcon, CarIcon, Clock3Icon, UserIcon, X, CalendarIcon, ClockIcon, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import DeleteBooking from "../manage/_components/delete-booking";
import EditBooking from "../manage/_components/edit-booking";
import { GiHouseKeys, GiShakingHands } from "react-icons/gi";
import { CgUnavailable } from "react-icons/cg";
import CalenderDayDetail from "./calender-day-detail";
import { useState } from "react";
import EditAvailability from "../manage/_components/edit-availability";
import { de } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  isDayView?: boolean;
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
  selectedInserat,
  isDayView = false
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

  const handleClick = () => {
    if (!selectedDate || !isSameDay(day, selectedDate)) {
      setSelectedDateParent?.(day);
      setRelevantBookingsParent?.(bookings);
      selectDateParent?.(day);
    }
  };

  // Calculate time slots for day view
  const timeSlots = [];
  if (isDayView) {
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
  }

  // Find events for each time slot
  const getEventsForTimeSlot = (timeSlot: string) => {
    const [hours, minutes] = timeSlot.split(':').map(Number);
    const timeInMinutes = hours * 60 + minutes;
    
    return bookings.filter(booking => {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      const startPeriod = Number(booking.startPeriod);
      const endPeriod = Number(booking.endPeriod);
      
      // If booking starts and ends on the same day
      if (isSameDay(startDate, day) && isSameDay(endDate, day)) {
        return timeInMinutes >= startPeriod && timeInMinutes < endPeriod;
      }
      
      // If booking starts on this day
      if (isSameDay(startDate, day)) {
        return timeInMinutes >= startPeriod;
      }
      
      // If booking ends on this day
      if (isSameDay(endDate, day)) {
        return timeInMinutes < endPeriod;
      }
      
      // If booking spans across this day
      if (startDate < day && endDate > day) {
        return true;
      }
      
      return false;
    });
  };

  // Find inserat details for a booking
  const getInseratDetails = (inseratId: string) => {
    return foundInserate.find(inserat => inserat.id === inseratId);
  };

  if (isDayView) {
    return (
      <div className="w-full h-full">
        <div className="divide-y dark:divide-gray-800">
          {timeSlots.map((timeSlot, idx) => {
            const events = getEventsForTimeSlot(timeSlot);
            const isHalfHour = timeSlot.endsWith('30');
            
            return (
              <div 
                key={timeSlot} 
                className={cn(
                  "flex items-start py-2 px-3",
                  isHalfHour ? "bg-gray-50 dark:bg-[#151515]" : ""
                )}
              >
                <div className="w-12 text-xs text-gray-500 dark:text-gray-400 pt-1.5 select-none">
                  {timeSlot}
                </div>
                <div className="flex-1 min-h-[40px] pl-3">
                  {events.length > 0 && (
                    <div className="space-y-2">
                      {events.map((event, eventIdx) => {
                        const inserat = getInseratDetails(event.inseratId);
                        
                        return (
                          <Card 
                            key={`${event.id}-${eventIdx}`} 
                            className={cn(
                              "p-2 relative",
                              event.isAvailability 
                                ? "bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800" 
                                : "bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800"
                            )}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium text-sm">
                                  {event.name || (event.isAvailability ? "Nicht verfügbar" : "Buchung")}
                                </div>
                                <div className="text-xs flex items-center gap-1 mt-1 text-gray-700 dark:text-gray-300">
                                  <CarIcon className="h-3 w-3" />
                                  {inserat?.title || "Unbekanntes Inserat"}
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="text-xs flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                    <ClockIcon className="h-3 w-3" />
                                    {Math.floor(Number(event.startPeriod) / 60)}:
                                    {(Number(event.startPeriod) % 60).toString().padStart(2, "0")} - 
                                    {Math.floor(Number(event.endPeriod) / 60)}:
                                    {(Number(event.endPeriod) % 60).toString().padStart(2, "0")}
                                  </div>
                                </div>
                              </div>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[160px] dark:bg-[#151515] dark:border-gray-800">
                                  <DropdownMenuItem onClick={() => {
                                    if (event.inseratId) {
                                      router.push(`/dashboard/${event.userId}/manage?inseratId=${event.inseratId}`);
                                    }
                                  }} className="cursor-pointer">
                                    <CarIcon className="h-4 w-4 mr-2" />
                                    <span>Details</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <EditBooking 
                                      thisBooking={event} 
                                      foundInserate={foundInserate} 
                                    />
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem asChild className="text-red-600 dark:text-red-400">
                                    <DeleteBooking bookingId={event.id} />
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
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
      <div className="flex flex-col">
      {bookings?.map((pBooking) => {
        return (
          <>
            {(isShowing(pBooking.inseratId, pBooking?.vehicleId)) &&
             
                <Popover>
                  <PopoverTrigger>
                  <div
                key={pBooking.id}
                className={cn(
                  "rounded-md py-2 sm:px-2 text-left mt-3 text-white flex justify-between items-center bg-gradient-to-r",
                  pBooking.isAvailability ? "from-rose-600 to-rose-800" : "from-indigo-600 to-indigo-800"
                )}
                
              >
                    <div className="w-full">
                      <div className="sm:flex justify-between items-center">
                        <div className="flex items-center sm:space-x-2 text-xs font-medium ">
                          
                          <span className={cn("line-clamp break-all sm:block hidden text-left", !pBooking.name && "text-gray-200/60")}>{pBooking.name || "Keine Angaben"}</span>
                        </div>
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
              
            }
          </>
        );
      })}
      </div>
    </div>
  );
}

export default CalendarDay;