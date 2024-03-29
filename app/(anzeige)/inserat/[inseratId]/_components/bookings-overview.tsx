import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { booking } from "@/db/schema";

import { CalendarCheck, CalendarClock, CheckCheckIcon, CheckIcon } from "lucide-react";

interface BookingsOverviewProps{
    bookings : typeof booking.$inferSelect[]
}

const BookingsOverview: React.FC<BookingsOverviewProps> = ({
    bookings
}) => {

    function formatDateToDDMMYY(date: Date): string {
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1; 
        const year: number = date.getFullYear() % 100; 
    
       
        const formattedDay: string = (day < 10) ? '0' + day : day.toString();
        const formattedMonth: string = (month < 10) ? '0' + month : month.toString();
    
        
        const formattedYear: string = (year < 10) ? '0' + year : year.toString();
    
        return `${formattedDay}.${formattedMonth}.${formattedYear}`;
    }

    function formatDateToDDMM(date: Date): string {
        const day: number = date.getDate();
        const month: number = date.getMonth() + 1; 
        const year: number = date.getFullYear() % 100; 
    
       
        const formattedDay: string = (day < 10) ? '0' + day : day.toString();
        const formattedMonth: string = (month < 10) ? '0' + month : month.toString();
    
        
        const formattedYear: string = (year < 10) ? '0' + year : year.toString();
    
        return `${formattedDay}.${formattedMonth}`;
    }

    return ( 
        <Popover>
            <PopoverTrigger className="hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
            <CalendarCheck/>
            </PopoverTrigger>
            <PopoverContent side="right" className="dark:bg-[#0F0F0F] border-none">
                <div>
                    <h1 className="flex font-semibold mb-2 "> Termine ({bookings.length}) </h1>
                    <div className="max-h-[240px] overflow-y-auto no-scrollbar">
                        <div className="">
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                               
                                    <span 
                                        className="flex mt-2  p-4 dark:bg-[#1a1a1a] rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"
                                        key={`${booking.id}`} 
                                    >
                                        <CalendarClock />
                                        <div className="ml-2 font-semibold text-sm drop-shadow-none flex">
                                            {formatDateToDDMM(booking.startDate)} - {formatDateToDDMMYY(booking.endDate)} <CheckIcon className="ml-1 text-emerald-600" />
                                        </div>
                                    </span>
                               
                            ))
                            
                            
                        ) : (
                            <span className="flex mt-2  p-4 rounded-md dark:bg-[#1a1a1a] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] ">
                                    <CalendarClock/>
                                    <p className="ml-2 font-semibold text-gray-900/50 italic text-xs dark:text-gray-100">
                                        Noch keine Reservierungen vorhanden</p>
                                </span>
                        )}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
     );
}
 
export default BookingsOverview;