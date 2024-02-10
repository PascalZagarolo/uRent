import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Booking } from "@prisma/client";
import { CalendarCheck, CalendarClock } from "lucide-react";

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

    return ( 
        <Popover>
            <PopoverTrigger>
                <CalendarCheck/>
            </PopoverTrigger>
            <PopoverContent side="right">
                <div>
                    <h1 className="flex font-semibold"> Termine </h1>
                    <div className="">
                        {bookings.length > 0 ? (
                            bookings.map((bookings) => (
                                <span className="flex mt-2 border border-gray-300 p-4 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]"
                                key={bookings.id}
                                >
                                    <CalendarClock/>
                                    <p className="ml-2 font-semibold text-sm">{formatDateToDDMMYY(bookings.startDate)} - {formatDateToDDMMYY(bookings.endDate)}</p>
                                </span>
                            ))
                        ) : (
                            <span className="flex mt-2 border border-gray-300 p-4 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] ">
                                    <CalendarClock/>
                                    <p className="ml-2 font-semibold text-gray-900/50 italic text-xs">Noch keine Reservierungen vorhanden</p>
                                </span>
                        )}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
     );
}
 
export default BookingsOverview;