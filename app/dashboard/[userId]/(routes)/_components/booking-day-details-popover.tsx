'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { booking, inserat } from "@/db/schema";
import { format } from "date-fns";
import { Calendar, Clock10 } from "lucide-react";
import EditBooking from "../manage/_components/edit-booking";
import DeleteBooking from "../manage/_components/delete-booking";

interface BookingDayDetailsPopoverProps {
    thisBooking : typeof booking.$inferSelect;
    foundInserate : typeof inserat.$inferSelect[];
    usedBookingId : string;
}

const BookingDayDetailsPopover : React.FC<BookingDayDetailsPopoverProps> = ({
    thisBooking,
    foundInserate
}) => {
    
    const convertMinutesToHours = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(remainingMinutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    };

    return ( 
        <Popover>
            <PopoverTrigger className="w-full h-full bg-rose-800 text-rose-800">
                X
            </PopoverTrigger>
            <PopoverContent className="dark:bg-[#191919] dark:border-none">
                <div>
                    <div className="w-full justify-end flex gap-x-2">
                        <div>
                            <EditBooking 
                            foundInserate={foundInserate}
                            thisBooking={thisBooking}
                            />
                        </div>
                        <div>
                            <DeleteBooking 
                            bookingId={thisBooking.id}
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm 1">
                            {// @ts-ignore
                            thisBooking?.inserat?.title}
                        </h3>
                    </div>
                    {thisBooking?.name && (
                        <div className="mt-2 text-xs font-medium">
                        {thisBooking?.name}
                    </div>
                    )}
                    <div className="flex items-center text-xs mt-2 gap-x-2">
                        <Calendar className="w-4 h-4" /> 
                        <div>
                            {format(new Date(thisBooking.startDate), "dd.MM.yyyy")} - {format(new Date(thisBooking.endDate), "dd.MM.yyyy")}
                        </div>
                    </div>
                    <div className="flex items-center text-xs mt-2 gap-x-2">
                        <Clock10 className="w-4 h-4" /> 
                        <div>
                           {// @ts-ignore
                           convertMinutesToHours(thisBooking.startPeriod)}Uhr - {convertMinutesToHours(thisBooking.endPeriod)}Uhr
                        </div>
                    </div>
                    <div className="text-xs dark:text-gray-200/90 mt-2">
                        {thisBooking.content ? thisBooking.content : "Keine Notiz angegeben"}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
     );
}
 
export default BookingDayDetailsPopover;