import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { booking, inserat } from "@/db/schema";

import { CalendarCheck, CalendarClock, CheckCheckIcon, CheckIcon } from "lucide-react";
import BookingCalendar from "./booking-calendar";
import { FaCalendarCheck, FaRegCalendarCheck } from "react-icons/fa6";


interface BookingsOverviewProps{
    receivedBookings : typeof booking.$inferSelect[];
    thisInserat : typeof inserat.$inferSelect;
}

const BookingsOverview: React.FC<BookingsOverviewProps> = ({
    receivedBookings,
    thisInserat
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
        <Dialog>
            <DialogTrigger className="hover:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
            <CalendarCheck/>
            </DialogTrigger>
            <DialogContent  className="dark:bg-[#0F0F0F] border-none">
                <div>
                    <h1 className="flex font-semibold mb-2 ">
                    <FaCalendarCheck className="w-4 h-4 mr-2 hidden dark:block" />
                    <FaRegCalendarCheck  className="w-4 h-4 mr-2 block dark:hidden"/>
                         Verfügbarkeit prüfen</h1>
                    <div className=" overflow-y-auto no-scrollbar">
                        
                        <BookingCalendar 
                        thisInserat={thisInserat}
                        receivedBookings={receivedBookings}
                        />
                       
                    
                    </div>
                </div>
            </DialogContent>
        </Dialog>
     );
}
 
export default BookingsOverview;