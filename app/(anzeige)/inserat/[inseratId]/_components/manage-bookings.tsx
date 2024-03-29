'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";


import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import { CalendarCheck2, Clock10Icon, Settings2Icon, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import EditBookingDialog from "./edit-booking-dialog";

import { booking } from "@/db/schema";

interface ManageBookingsProps {
    bookings : typeof booking.$inferSelect[]
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

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onManage = () => {
        console.log("delete");
    }

    const onDelete = (bookingId : string) => {
        try {
            setIsLoading(true);
            axios.delete(`/api/booking/delete/${bookingId}`);
            toast.success("Buchung erfolgreich gelöscht");
            setTimeout(() => {
                router.refresh();
            })
        } catch {
            toast.error("Fehler beim Löschen der Buchung")
        } finally {
            setIsLoading(false);
        }
    }

    

    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <div className="mt-4">
                <Button className="flex w-full sm:w-[240px] border border-gray-900 bg-white text-gray-900 hover:bg-gray-200">
                   <CalendarCheck2 className="mr-2 h-4 w-4"/> Buchungen verwalten
                </Button>
                </div>
            </DialogTrigger>
            <DialogContent className="dark:bg-[#0F0F0F] border-none">
                <DialogTitle>
                    <h3 className="font-bold flex mb-4">
                        <CalendarCheck2 className="mr-2" /> Buchungen verwalten
                    </h3>
                </DialogTitle>
                <div className="items-center">
                    {bookings.length > 0 ? (
                        bookings.map((pBooking) => (
                            <div key={pBooking.id} className="dark:bg-[#0a0a0a] ">
                                <div className="mt-2 flex items-center border border-none rounded-md p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]" >
                                    <Clock10Icon className="h-4 w-4 mr-2"/>
                                    
                            <span className="font-semibold text-sm">  {formatDateToDDMM(pBooking.startDate)} - {formatDateToDDMMYY(pBooking.endDate)} </span>
                            <p className="text-xs ml-4 font-semibold text-gray-900/50 justify-center dark:text-gray-100/70">
                                
                                { //@ts-ignore
                                pBooking?.user.email
                                }</p>
                            <div className="ml-auto flex gap-x-4">
                              <EditBookingDialog thisBooking = {pBooking} />
                              <Dialog>
                                <DialogTrigger>
                                <Trash2 className="text-rose-600 h-6 w-6 hover:cursor-pointer"/>
                                </DialogTrigger>
                                <DialogContent className="dark:bg-[#0a0a0a] border-none ">
                                    <DialogHeader>
                                        <h3 className="font-bold flex"><X/>Buchung löschen</h3>
                                    </DialogHeader>
                                    <DialogDescription className="text-xs font-semibold italic text-gray-900/50 dark:text-gray-100/70">
                                        gelöschte Buchungen können nicht wiederhergestellt werden
                                    </DialogDescription>
                                    <div className="ml-auto flex space-x-2">
                                        <DialogTrigger>
                                        <Button className="bg-rose-600 hover:bg-rose-500 dark:text-gray-100" onClick={() => 
                                            {onDelete(pBooking.id)}}>
                                            Buchung löschen
                                            </Button>
                                        </DialogTrigger>
                                        <DialogTrigger>
                                        <Button variant="ghost" className=" dark:bg-[#000000] dark:hover:bg-[#0a0a0a] dark:border-gray-100">
                                            Abbrechen
                                            </Button>
                                        </DialogTrigger>
                                    </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                            </div>
                          
                        ))
                    ) : (
                        <div >
                                <div className="mt-2 flex items-center rounded-md p-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]" >
                                    <Clock10Icon className="h-4 w-4 mr-2"/>                    
                            <p className="text-sm ml-4 font-semibold text-gray-900/50 dark:text-gray-100/70 justify-center"> Noch keine Buchung hinzugefügt...</p>
                          </div>
                            </div>
                    )}
                </div>
                
            </DialogContent>
        </Dialog>
     );
}
 
export default ManageBookings;