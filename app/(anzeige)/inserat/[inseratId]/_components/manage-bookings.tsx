import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Booking, User } from "@prisma/client";
import { DialogTitle } from "@radix-ui/react-dialog";
import { CalendarCheck2, Clock10Icon, Settings2Icon, Trash2 } from "lucide-react";

interface ManageBookingsProps {
    bookings : Booking & { user : User }[]
}

const ManageBookings: React.FC<ManageBookingsProps> = ({
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

    const onManage = () => {
        console.log("delete");
    }

    const onDelete = () => {
        console.log("delete");
    }

    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <div className="mt-4">
                <Button className="flex w-[240px] border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-200">
                   <CalendarCheck2 className="mr-2 h-4 w-4"/> Buchungen verwalten
                </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <h3 className="font-bold flex mb-4">
                        <CalendarCheck2 className="mr-2" /> Buchungen verwalten
                    </h3>
                </DialogTitle>
                <div className="items-center">
                    {bookings.length > 0 ? (
                        bookings.map((booking : Booking & { user : User}) => (
                            <div key={booking.id}>
                                <div className="mt-2 flex items-center border border-gray-300 rounded-md p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]" >
                                    <Clock10Icon className="h-4 w-4 mr-2"/>
                                    
                            <span className="font-semibold text-sm">  {formatDateToDDMM(booking.startDate)} - {formatDateToDDMMYY(booking.endDate)} </span>
                            <p className="text-xs ml-4 font-semibold text-gray-900/50 justify-center">{booking.user.email}</p>
                            <div className="ml-auto flex gap-x-4">
                              <Settings2Icon className="w-6 h-6 hover:cursor-pointer"/>
                              <Trash2 className="text-rose-600 h-6 w-6 hover:cursor-pointer"/>
                            </div>
                          </div>
                            </div>
                          
                        ))
                    ) : (
                        <div >
                                <div className="mt-2 flex items-center rounded-md p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]" >
                                    <Clock10Icon className="h-4 w-4 mr-2"/>
                                    
                            
                            <p className="text-sm ml-4 font-semibold text-gray-900/50 justify-center"> Noch keine Buchung hinzugefügt...</p>
                            
                          </div>
                            </div>
                    )}
                </div>
                
            </DialogContent>
        </Dialog>
     );
}
 
export default ManageBookings;