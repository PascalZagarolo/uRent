'use client'

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { booking } from "@/db/schema";

interface BookingDayDetailsPopoverProps {
    thisBooking : typeof booking.$inferSelect;
    usedBookingId : string;
}

const BookingDayDetailsPopover : React.FC<BookingDayDetailsPopoverProps> = ({
    thisBooking
}) => {
    console.log(thisBooking)
    return ( 
        <Popover>
            <PopoverTrigger className="w-full h-full bg-rose-800 text-rose-800">
                X
            </PopoverTrigger>
            <PopoverContent className="dark:bg-[#191919] dark:border-none">
                <div>
                    <div>
                        <h3>
                            {thisBooking?.inserat?.title}
                        </h3>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
     );
}
 
export default BookingDayDetailsPopover;