'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Images, Inserat, User } from "@prisma/client";
import axios from "axios";
import { Banknote, CalendarCheck2, CarFront, Check, CheckCheckIcon, EyeIcon, LocateFixedIcon, MapPinIcon, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratCardMobileProps {
    inserat: Inserat & { images: Images[]; user: User };
    profileId: string,
    isFaved: boolean,
    owned: boolean,

}

const InseratCardMobile: React.FC<InseratCardMobileProps> = ({
    inserat,
    profileId,
    isFaved,
    owned
}) => {

    const formatDate = (inputDate: Date): string => {
        const day = inputDate.getDate().toString().padStart(2, '0');
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const onFav = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/profile/${profileId}/favourites`, { inseratId: inserat.id })

            setTimeout(() => {
                router.refresh();
            }, 500)
        } catch {
            toast.error("Fehler beim Favorisieren der Anzeige")
        } finally {
            setIsLoading(false);
        }
    }

    const onRedirect = () => {
        router.push(`/inserat/${inserat.id}`)
    }

    return (
        <div className="   rounded-md  items-center   bg-[#ffffff] border-2 border-white mb-8 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <h3 className={cn("flex  font-semibold  ml-2 text-lg hover:cursor-pointer text-ellipsis  items-center  rounded-md mr-2",)} >
                <div className="bg-[#181c28] p-2 rounded-md border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                <CarFront className=" text-gray-100 h-6 w-6 " /> 
                </div>
                <div className="px-2 py-1 mt-1 rounded-md  ">
                <div className="ml-4 font-bold text-[#0d0f15] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] truncate overflow-hidden text-medium w-[210px] h-[40px]
                 hover:cursor-pointer hover:underline" onClick={onRedirect}> {inserat.title} </div>
                </div>
                <div className="ml-auto items-center flex ">
                    
                    <p className="">
                        <Button variant="ghost" onClick={onFav}>
                            <Star className={cn(isFaved ? "text-yellow-300" : "text-black")} />
                        </Button>
                    </p>
                </div>

            </h3>
            
            <div className="flex justify-center h-[200px] items-center  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  w-full">
                <div className="flex mr-auto ml-2">
                <div className="mr-4 w-[80px]">
                    <div>
                        <Badge className="bg-[#2c3246] border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                            4-Sitzer
                        </Badge>
                    </div>
                    <div className="mt-2">
                        <Badge className="bg-[#242a39] flex border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                            <EyeIcon className="w-4 h-4 mr-1"/> {inserat.views}
                        </Badge>
                    </div>
                    <div className="mt-2">
                        <Badge className="bg-emerald-600 border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                            <CheckCheckIcon className="w-4 h-4"/> vorhanden
                        </Badge>
                    </div>
                </div>
                <img
                src={inserat.images[0].url}
                width={220}
                height={260}
                className="rounded-md border-2 border-gray-400 hover:cursor-pointer"
                onClick={onRedirect}
                />
                
                
                </div>
                
                
            </div>

            <div className="ml-2 ">
                
                <div className="flex  bg-[#1e2332] p-2 rounded-md text-gray-100 mr-4 border-gray-300 border-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    <p className="text-gray-100 font-bold mr-4 flex">
                        <CalendarCheck2 className="mr-2" />  Zeitraum :
                    </p>
                    <p className="font-semibold text-gray-200">
                        {formatDate(inserat.begin)}
                    </p>
                    <p className="font-bold text-black-800 mr-2 ml-2">
                        -
                    </p>
                    <p className="font-bold text-gray-200">
                        {formatDate(inserat.end)}
                    </p>
                </div>

                <div className="font-semibold text-gray-900 flex mt-2 items-center">
                    {inserat.alreadyOwned ? (
                        <div>
                            {owned ? (
                                <p className="mr-2 flex font-bold">
                                    <Check
                                        className="mr-2 text-emerald-600" />
                                    Im Besitz
                                </p>
                            ) : (
                                <p className="mr-2 flex font-bold">
                                    <X
                                        className="mr-2 text-rose-600" />
                                    Bereits vergriffen
                                </p>
                            )}
                        </div>

                    ) : (
                        <div className="flex">
                            {owned ? (
                                <p className="mr-2 flex font-bold">
                                    <Check
                                        className="mr-2 text-emerald-600" />
                                    Im Besitz
                                </p>
                            ) : (
                                <div className="flex bg-emerald-600 p-2 rounded-md border-gray-300 border-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-gray-200">
                                    <p className="mr-2 flex font-bold">
                                        <Banknote
                                            className="mr-2 bg-gray-100 p-0.5 rounded-md border-gray-300 border-2 text-gray-900" />
                                        Preis :
                                    </p>
                                    {inserat.price} €
                                </div>
                            )}
                        </div>
                    )}










                    <div className="ml-auto mr-4 flex items-center bg-[#181c28] border-2 border-gray-300 p-2 rounded-lg text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                        <MapPinIcon className="text-rose-600 mr-2 bg-gray-200 rounded-md border-gray-300 border-2" /> Mömer <p className="text-gray-300 text-xs ml-2">(187 Km)</p>
                    </div>
                </div>
                <div className="w-full mt-2">

                    <div className="rounded-md bg-[#1b1e2d] border-2 border-gray-100 position:absolute mr-2">
                        <div className="flex  items-center border border-black rounded-md">
                            <Image
                                className="rounded-full ml-2 mt-2 mb-2 border border-gray-400 "
                                src={inserat.user?.image || "/placeholder-person.jpg"}
                                height={40}
                                width={40}
                                alt="User-Bild"
                            />
                            <Link href={`/profile/${inserat.userId}`}>
                                <p className="ml-4 font-semibold text-[#dbddf2] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.6)]">
                                    {inserat.user?.name}
                                </p>
                            </Link>

                            <div className="ml-auto mr-2">
                                <Button className="bg-[#222637] border border-white font-semibold" onClick={() => { router.push(`/inserat/${inserat.id}`)}}>
                                    Besichtigen
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    );
}

export default InseratCardMobile;