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


interface BookingRequestRenderProps {
    request: typeof bookingRequest.$inferSelect;
}

const BookingRequestRender: React.FC<BookingRequestRenderProps> = ({
    request
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

    return (
        <Dialog>
            <div className="dark:bg-[#141414] p-4 mb-4 rounded-md border dark:border-none ">
                <div className="flex w-full truncate font-semibold items-center">
                    <CarFrontIcon className="w-4 h-4 mr-2" />    <p className="w-[200px] truncate">
                        {//@ts-ignore
                            request.inserat?.title}
                    </p>
                    <div className="ml-auto">
                        <Button className=" p-4 mr-2" variant="ghost" size="sm" onClick={onAccept}>
                            <Check className="h-4 w-4 text-emerald-600" />
                        </Button>
                        <Button className=" p-4" variant="ghost" size="sm" onClick={onDecline}>
                            <X className="h-4 w-4 text-rose-600" />
                        </Button>
                    </div>
                </div>
                <DialogTrigger>
                    <div className="justify-center flex w-full h-[100px] mt-2">
                        <Image
                            className="min-h-[50px] min-w-[300px] object-cover flex justify-center"
                            src={//@ts-ignore
                                request.inserat?.images[0]?.url}
                            alt="Inserat-Bild"
                            width={200}
                            height={50}
                        />
                    </div>
                </DialogTrigger>
                <div className="flex w-full mt-2">

                    <div className="text-sm w-3/5 flex items-center">

                        <div className="mr-2">
                            <Image
                                className="w-[30px] h-[30px] rounded-full"
                                src={//@ts-ignore
                                    request.user.image || "/placeholder-person.jpg"}
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
                    </div>
                </div>
                <div className="max-w-full mt-2 text-xs dark:text-gray-100/70 text-gray-700 max-h-[40px] truncate">
                    {request?.content ? request.content : "Keine Nachricht hinzugefügt..."}
                </div>
                <div className="w-full mt-2">
                    <Button className="w-full dark:bg-[#1C1C1C] hover:bg-[#141414] text-gray-200 flex"
                        //@ts-ignore
                        onClick={() => { router.push(`/conversation/${request.user.id}`) }}>
                        <MailCheck className="mr-2 h-4 w-4" /> Anfragensteller kontaktieren
                    </Button>
                </div>
            </div>
            <DialogContent className="dark:bg-[#141414] dark:border-none">
                <div>
                    <div>
                        <h3 className="text-lg font-semibold flex items-center">
                          <BookAIcon className="w-4 h-4 mr-2" />  Buchungen verwalten
                        </h3>
                        <div className="w-full flex items-center mt-8">
                            <div className="w-2/4 overflow-hidden text-ellipsis h-[28px] text-md font-medium" >
                                {//@ts-ignore
                                request?.inserat?.title}
                            </div>
                            <div className="ml-auto flex justify-end">
                                <Button className=" p-4 mr-2" variant="ghost" size="sm" onClick={onAccept}>
                                    <Check className="h-4 w-4 text-emerald-600" />
                                </Button>
                                <Button className=" p-4" variant="ghost" size="sm" onClick={onDecline}>
                                    <X className="h-4 w-4 text-rose-600" />
                                </Button>
                            </div>
                        </div>
                        <div className="justify-center flex w-full h-[132px] mt-2">
                        <Image
                            className=" w-full object-cover flex justify-center"
                            src={//@ts-ignore
                                request.inserat?.images[0]?.url}
                            alt="Inserat-Bild"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="flex w-full mt-2">

                    <div className="text-sm w-3/5 flex items-center">

                        <div className="mr-2">
                            <Image
                                className="w-[30px] h-[30px] rounded-full"
                                src={//@ts-ignore
                                    request.user.image || "/placeholder-person.jpg"}
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
                    </div>
                </div>
                    <div className="mt-2">
                        <p className="text-sm">
                            Weitere Informationen :
                        </p>
                    <div className="max-w-full  text-sm dark:text-gray-100/70 text-gray-700 ">
                    {request?.content ? request.content : "Keine Nachricht hinzugefügt..."}
                </div>
                <div className="w-full mt-2">
                    <Button className="w-full dark:bg-[#1C1C1C] hover:bg-[#141414] text-gray-200 flex"
                        //@ts-ignore
                        onClick={() => { router.push(`/conversation/${request.user.id}`) }}>
                        <MailCheck className="mr-2 h-4 w-4" /> Anfragensteller kontaktieren
                    </Button>
                </div>
                    </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BookingRequestRender;