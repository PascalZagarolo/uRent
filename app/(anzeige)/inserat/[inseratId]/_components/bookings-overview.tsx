import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Booking } from "@prisma/client";
import { CalendarCheck, CalendarClock, CheckCheckIcon, CheckIcon } from "lucide-react";

interface BookingsOverviewProps{
    bookings : Booking[]
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
            <PopoverTrigger>
                <CalendarCheck/>
            </PopoverTrigger>
            <PopoverContent side="right">
                <div>
                    <h1 className="flex font-semibold mb-2"> Termine ({bookings.length}) </h1>
                    <div className="h-[240px] overflow-y-auto no-scrollbar ">
                        <div className="">
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                [...Array(4)].map((_, index) => (
                                    <span 
                                        className="flex mt-2 border border-gray-300 p-4 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"
                                        key={`${booking.id}_${index}`} // Making sure the key is unique
                                    >
                                        <CalendarClock />
                                        <div className="ml-2 font-semibold text-sm drop-shadow-none flex">
                                            {formatDateToDDMM(booking.startDate)} - {formatDateToDDMMYY(booking.endDate)} <CheckIcon className="ml-1 text-emerald-600" />
                                        </div>
                                    </span>
                                ))
                            ))
                            
                            
                        ) : (
                            <span className="flex mt-2 border border-gray-300 p-4 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] ">
                                    <CalendarClock/>
                                    <p className="ml-2 font-semibold text-gray-900/50 italic text-xs">Noch keine Reservierungen vorhanden</p>
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