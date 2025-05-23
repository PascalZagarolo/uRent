'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { booking } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineCallReceived } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";
import { CalendarClock, CalendarRange, ChevronRight, Clock as ClockIcon, Info, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TodayAgendaProps {
  todaysBookings: typeof booking.$inferSelect[] | any[];
  todaysReturns: typeof booking.$inferSelect[] | any[];
}

const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} Uhr`;
};

function useCurrentTimeInMinutes() {
  const [currentTimeInMinutes, setCurrentTimeInMinutes] = useState(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTimeInMinutes(now.getHours() * 60 + now.getMinutes());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return currentTimeInMinutes;
}

const TodayAgenda = ({ todaysBookings, todaysReturns }: TodayAgendaProps) => {
  const currentTimeInMinutes = useCurrentTimeInMinutes();

  const renderBookingCard = (booking: any, type: string, isCompleted: boolean) => (
    <div
      key={booking.id}
      className={cn(
        "relative rounded-lg border dark:border-gray-800 bg-white dark:bg-[#1a1a1a] p-4 mb-4 transition-all duration-300 hover:shadow-md",
        isCompleted ? "opacity-60" : "shadow-sm"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
          type === "ABGABE" 
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
            : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        )}>
          {type === "ABGABE" 
            ? <IoIosShareAlt className="h-5 w-5" /> 
            : <MdOutlineCallReceived className="h-5 w-5" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium dark:text-white text-sm">
                {booking?.name || "Kein Titel"}
                <Badge 
                  variant={booking?.isAvailability ? "destructive" : "secondary"} 
                  className="ml-2 px-1.5 py-0 text-[10px]"
                >
                  {booking?.isAvailability ? "Gesperrt" : "Buchung"}
                </Badge>
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                {booking?.inserat?.title}
                {booking?.inserat?.multi && booking?.vehicle?.title && (
                  <span className="text-xs opacity-75"> ({booking?.vehicle?.title})</span>
                )}
              </p>
            </div>
            
            <div className="flex flex-shrink-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] dark:bg-[#191919] border-none">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg font-semibold dark:text-white">{booking?.name || "Kein Titel"}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{booking?.inserat?.title}</p>
                      {booking?.inserat?.multi && booking?.vehicle?.title && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">Fahrzeug: {booking?.vehicle?.title}</p>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-[#222222] p-3 rounded-md space-y-2">
                      <div className="flex items-center text-sm">
                        <CalendarRange className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {format(new Date(booking?.startDate), "dd.MM.yyyy")} - {format(new Date(booking?.endDate), "dd.MM.yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {formatTime(booking.startPeriod)} - {formatTime(booking.endPeriod)}
                        </span>
                      </div>
                      {booking?.buchungsnummer && (
                        <div className="flex items-center text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300"># {booking?.buchungsnummer}</span>
                        </div>
                      )}
                    </div>

                    {booking?.content && (
                      <div>
                        <h3 className="text-sm font-medium mb-1 dark:text-white">Anmerkungen:</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
                          {booking?.content}
                        </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="mt-2 flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn(
                    "flex items-center text-sm font-medium",
                    isCompleted 
                      ? "text-gray-500 dark:text-gray-500"
                      : type === "ABGABE" ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"
                  )}>
                    <ClockIcon className="h-4 w-4 mr-1.5" />
                    {formatTime(type === "ABGABE" ? booking.startPeriod : booking.endPeriod)}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{type === "ABGABE" ? "Abgabezeit" : "Rückgabezeit"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="ml-4 text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <CalendarRange className="h-3.5 w-3.5 mr-1" />
              {format(new Date(booking?.startDate), "dd.MM")} - {format(new Date(booking?.endDate), "dd.MM")}
            </div>
          </div>
        </div>
      </div>
      
      {isCompleted && (
        <div className="absolute inset-0 bg-gray-100/10 dark:bg-black/10 rounded-lg backdrop-blur-[1px] flex items-center justify-center">
          <Badge variant="outline" className="bg-white/80 dark:bg-black/80">
            Bereits erledigt
          </Badge>
        </div>
      )}
    </div>
  );

  const renderCurrentTime = () => (
    <div className="flex items-center p-2 mb-3 gap-3 bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-300 rounded-md">
      <ClockIcon className="h-4 w-4" />
      <span className="text-sm font-medium">Aktuelle Zeit: {formatTime(currentTimeInMinutes)}</span>
    </div>
  );

  return (
    <div>
      {renderCurrentTime()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-3">
            <h3 className="text-base font-medium dark:text-white">Fahrzeugabgaben</h3>
            <Badge variant="secondary" className="ml-2">
              {todaysBookings.length}
            </Badge>
          </div>
          
          {todaysBookings.length > 0 ? (
            <div>
              {todaysBookings.map((booking) => 
                renderBookingCard(booking, "ABGABE", currentTimeInMinutes > booking.startPeriod)
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border dark:border-gray-800 p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Keine Fahrzeugabgaben für heute geplant</p>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center mb-3">
            <h3 className="text-base font-medium dark:text-white">Fahrzeugrückgaben</h3>
            <Badge variant="secondary" className="ml-2">
              {todaysReturns.length}
            </Badge>
          </div>
          
          {todaysReturns.length > 0 ? (
            <div>
              {todaysReturns.map((booking) => 
                renderBookingCard(booking, "RETURN", currentTimeInMinutes > booking.endPeriod)
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border dark:border-gray-800 p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Keine Fahrzeugrückgaben für heute geplant</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayAgenda;
