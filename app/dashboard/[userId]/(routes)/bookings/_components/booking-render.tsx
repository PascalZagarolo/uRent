'use client'


import { Button } from "@/components/ui/button";
import { booking } from "@/db/schema";
import { cn } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { CalendarCheck2, CalendarDaysIcon, Edit3, Globe2Icon, SignpostBig, StarHalf, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface BookingDashboardRenderProps {
    thisBooking: typeof booking.$inferSelect;
}

const BookingDashboardRender: React.FC<BookingDashboardRenderProps> = ({
    thisBooking
}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    

    const onDelete = () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/favourite/${thisBooking.id}`);
            setTimeout(() => {
                router.refresh();
            }, 500)
            toast.success("Aus Favouriten entfernt")
        } catch {
            toast.error("Fehler beim Löschen des Inserats")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full dark:bg-[#141414] border dark:border-none rounded-md p-4 mt-2">
            <div className="flex">
            <div className="w-1/4 h-[100px] hover:cursor-pointer" onClick={() => {router.push(`/inserat/${thisBooking[0].inserat.id}`)}}>
                    {thisBooking[0]?.inserat?.images?.length > 0 ? (
                        <Image
                            alt="Inserat-Bild"
                            src={thisBooking[0]?.inserat?.images[0]?.url}
                            width={200}
                            height={100}
                            className="w-full h-full min-h-[100px] min-w-1/4 object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex justify-center items-center dark:bg-[#0F0F0F] text-xs">
                            keine Fotos vorhanden
                        </div>
                    )}
                </div>
                <div className="w-1/4 truncate ml-4 text-sm font-base mr-2">
                    {thisBooking[0]?.inserat?.title} 
                </div>
                <div className="w-1/6 h-[100px]">
                <p className="flex items-center font-normal md:justify-start justify-center">
                        <CalendarCheck2 className="w-4 h-4 md:mr-2 " /> <p className="md:block hidden"> Datum </p>
                    </p>
                    <p className={cn("text-sm  h-[100px] overflow-hidden", thisBooking[0]?.inserat.isPublished ? "dark:text-gray-100 text-gray-800 font-semibold" :
                     "text-gray-100/40")} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                         {format(new Date(thisBooking[0].startDate), "dd.MM.")} - {format(new Date(thisBooking[0].endDate), "dd.MM")}
                         
                    </p>
                    
                </div>
                <div className="md:w-2/6 w-1/6 text-sm dark:text-gray-100/90 text-gray-700 ml-4 font-semibold ">
                    <div>
                        <div className="flex items-center">
                            <Image
                                src={thisBooking[0].inserat?.user?.image || "/placeholder-person.jpg"}
                                alt="Profilbild"
                                className="w-[30px] h-[30px] rounded-full object-cover mr-2"
                                width={40}
                                height={40}
                            />
                            <p className="ml-2 md:block hidden">
                            {thisBooking[0].inserat.user.name}
                            </p>
                        </div>

                    </div>
                </div>
                <div className="justify-center md:w-1/8  h-full gap-y-2">

                    
                            <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#252525] dark:text-gray-100 flex text-xs w-full" >
                                <CalendarDaysIcon className="w-4 h-4 md:mr-2 text-rose-600" />  <p className="md:block hidden">Buchung ansehen</p>
                            </Button>
                        
                </div>
            </div>
        </div>
    );
}

export default BookingDashboardRender;