'use client';

import { Button } from "@/components/ui/button";
import { bookingRequest } from "@/db/schema";

import axios from "axios";
import { format } from "date-fns";

import { BookAIcon, CarFrontIcon, Check, MailCheck, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { inserat } from '../../../../../db/schema';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import findConversation from "@/actions/findConversation";
import { findOrCreateConversation } from "@/actions/conversation/linkConversation";
import BookingRequestDialog from "./booking-request/booking-request-dialog";


interface BookingRequestRenderProps {
    request: typeof bookingRequest.$inferSelect | any;
    currentUserId : string
}

const BookingRequestRender: React.FC<BookingRequestRenderProps> = ({
    request,
    currentUserId
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();


    const onAccept = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/bookingrequest/accept/${request.id}`).then(() => {
                router.refresh();
            })
            toast.success("Anfrage angenommen");



        } catch {
            toast.error("Fehler beim Annehmen der Anfrage")
        } finally {
            setIsLoading(false);
        }
    }

    const onDecline = async () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/bookingrequest/declined/${request.id}`).then(() => {
                router.refresh();
            })
            toast.success("Anfrage abgelehnt");

        } catch {
            toast.error("Fehler beim Ablehnen der Anfrage")
        } finally {
            setIsLoading(false);
        }
    }

    const onContact = async () => {
        try {
            const foundId = await findOrCreateConversation(request.user.id, currentUserId);
            console.log(foundId);
            router.push(`/conversation?conversationId=${foundId}`);
        } catch(e : any){
            toast.error("Fehler beim Kontaktieren des Anfragers")
            console.log(e);
        }
    }

    const convertMinutesToHours = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);   // Calculate the full hours
        const remainingMinutes = minutes % 60;    // Calculate the remaining minutes
    
        // Return the formatted time in "HH:MM Uhr" format
        return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')} Uhr`;
    };

    return (
        
            <div className="dark:bg-[#141414] p-4 mb-4 rounded-md border dark:border-none ">
                <div className="flex w-full truncate font-semibold items-center">
                    <CarFrontIcon className="w-4 h-4 mr-2" />    <p className="w-[200px] truncate">
                        {//@ts-ignore
                            request.inserat?.title}
                    </p>
                    <div className="ml-auto">
                        {/*
                        <Button className=" p-4 mr-2" variant="ghost" size="sm" onClick={onAccept}>
                            <Check className="h-4 w-4 text-emerald-600" />
                        </Button>
                        */}
                        <Button className=" p-4" variant="ghost" size="sm" onClick={onDecline}>
                            <X className="h-4 w-4 text-rose-600" />
                        </Button>
                    </div>
                </div>
                
                    <div className="justify-center flex w-full h-[100px] mt-2">
                        <Image
                            className="min-h-[50px] w-full object-cover flex justify-center"
                            src={//@ts-ignore
                                request?.inserat?.images[0]?.url}
                            alt="Inserat-Bild"
                            width={200}
                            height={50}
                        />
                    </div>
               
                <div className="flex w-full mt-2">

                    <div className="text-sm w-3/5 flex items-center">

                        <div className="mr-2">
                            <Image
                                className="w-[30px] h-[30px] rounded-full"
                                src={//@ts-ignore
                                    request?.user?.image || "/placeholder-person.jpg"}
                                alt="Profilbild"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div>

                            <p className="font-semibold">{//@ts-ignore
                                request.user?.name}</p>
                        </div>

                    </div>
                    <div className="text-sm w-2/5">
                        <p className="text-xs font-semibold">Datum:</p>
                        <div className="flex">
                            <p className="mr-1">{format(new Date(request.startDate), "dd.MM")}</p>
                            -
                            <p className="ml-1">{format(new Date(request.endDate), "dd.MM.yy")}</p>
                        </div>
                        <div className="text-gray-200/80 text-xs">
                            {convertMinutesToHours(request.startPeriod)} - {convertMinutesToHours(request.endPeriod)}
                        </div>
                    </div>
                </div>
                <div className="max-w-full mt-2 text-xs dark:text-gray-100/70 text-gray-700 max-h-[40px] truncate">
                    {request?.content ? request.content : "Keine Nachricht hinzugefügt..."}
                </div>
                <div className="w-full mt-2 flex flex-row items-end space-x-2">
                    <Button className="w-3/4 dark:bg-[#1C1C1C] hover:bg-[#141414] text-gray-200 flex shadow-lg"
                    size="sm"
                        //@ts-ignore
                        onClick={onContact}>
                        <MailCheck className=" h-4 w-4" /> 
                    </Button>
                    <BookingRequestDialog thisBooking={request}/>
                </div>
            </div>
         
                
           
    );
}

export default BookingRequestRender;