import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { booking } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ShareIcon } from "lucide-react";
import { FaShareAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineCallReceived } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";

interface TodayAgendaProps {
    todaysBookings: typeof booking.$inferSelect[] | any[];
    todaysReturns: typeof booking.$inferSelect[] | any[];
}

const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} Uhr`;
};

const renderFittingBookings = (booking: any, type: string) => {
    return (
        <div key={booking.id} 
        className={cn("relative w-full flex flex-row rounded-md h-full bg-[#0F0F0F] ",
            booking.isAvailability ? "border-rose-800" : "border-indigo-800"
        )}>
    {/* Share Icon positioned in a circle on the upper left */}
    <div className={cn(`absolute top-[-12px] left-[-12px]  border-2 shadow-lg border-gray-200  
    rounded-full p-2 flex justify-center items-center`, type === "ABGABE" ? "bg-[#0F0F0F]" : "bg-emerald-600")}>
        {type === "ABGABE" ? (
            <IoIosShareAlt className="text-white w-4 h-4" />
        ) : (
            <MdOutlineCallReceived  className="text-white w-4 h-4" />
        )}
    </div>
    
    <div className={cn("w-1/12 rounded-l-md", booking.isAvailability ? "bg-rose-800" : "bg-indigo-800")} />
    <div className="w-11/12 pl-4 py-2">
        <div className="text-sm font-bold underline flex flex-row items-center">
            {type === "ABGABE" ? formatTime(booking.startPeriod) : formatTime(booking.endPeriod)}
            <div className="justify-end ml-auto pr-2">
                {renderDialog(booking)}
            </div>
        </div>
        <div className={cn("font-medium mt-2", !booking?.name && "text-gray-200/60")}>
            {booking?.name ? booking?.name : "Kein Titel"}
        </div>
        <div className="text-sm text-gray-200/60">
            {format(new Date(booking?.startDate), "dd.MM")} - {format(new Date(booking?.endDate), "dd.MM")}
        </div>
    </div>
</div>
    )
}

const renderDialog = (booking: any) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <RiInformationLine className="w-4 h-4 inline-block hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="border-none dark:bg-[#191919]">
                <div>
                    <div className="text-lg font-semibold">
                        {booking?.name}
                    </div>
                    <div className="flex flex-row items-center text-sm">
                        <span className={cn("text-gray-200 text-sm ", !booking?.buchungsnummer && "text-gray-200/60")}>
                            {booking?.buchungsnummer ? booking?.buchungsnummer : "Keine eigene Buchungsnummer"}
                        </span>
                    </div>
                    <div className="text-sm text-gray-200/60">
                        {format(new Date(booking?.startDate), "dd.MM")} - {format(new Date(booking?.endDate), "dd.MM")}
                    </div>
                    <div className="text-sm text-gray-200/60">
                        {formatTime(booking.startPeriod)} - {formatTime(booking.endPeriod)}
                    </div>

                    <div className={cn("mt-4", !booking?.content && "text-gray-200/60")}>
                        {booking?.content ? booking?.content : "Keine Beschreibung vorhanden.."}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

const TodayAgenda = ({ todaysBookings, todaysReturns }: TodayAgendaProps) => {
    return (
        <div className="mb-8">
            <div className="text-xl font-semibold">
                Heutige Termine
            </div>
            <div className="mt-4 w-full flex flex-row  space-x-8">
                <div className="w-1/2">
                    <div className="text-sm font-semibold">
                        Fahrzeugabgaben ({todaysBookings.length})
                    </div>
                    <div className="space-y-4 w-full mt-4 flex flex-col">
                        {
                            todaysBookings.length > 0 ? (
                                todaysBookings.map((booking) => renderFittingBookings(booking, "ABGABE"))
                            ) : (
                                <div className="text-gray-200/60">
                                    Keine Abgaben vorgemerkt..
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="text-sm font-semibold">
                        Fahrzeugrückgaben ({todaysReturns.length})
                    </div>
                    <div className="space-y-4 w-full mt-4 flex flex-col">
                        {
                            todaysReturns.length > 0 ? (
                                todaysReturns.map((booking) => renderFittingBookings(booking, "RETURN"))
                            ) : (
                                <div className="text-gray-200/60">
                                    Keine Rückgaben vorgemerkt..
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TodayAgenda;