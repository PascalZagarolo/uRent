'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { InserateImagesAndAttributes } from "@/types/types";

import { Images, Inserat, PkwAttribute, User } from "@prisma/client";
import axios from "axios";
import { Banknote, CalendarCheck2, CarFront, CaravanIcon, Check, CheckCheckIcon, ConstructionIcon, EyeIcon, LocateFixedIcon, MapPinIcon, RockingChair, SofaIcon, Star, TractorIcon, TramFront, Truck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratCardProps {
    inserat: InserateImagesAndAttributes;
    profileId: string,
    isFaved: boolean,
    

}

const InseratCard: React.FC<InseratCardProps> = ({
    inserat,
    profileId,
    isFaved,
    
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

    const getAddressCity = (address: string): string => {
        const addressParts = address.split(', ');
        if (addressParts.length >= 2) {
            return addressParts[1]; 
        } 
    };

    return (
        <div className="sm:w-[750px] sm:h-[420px] w-[400px] h-[380px]   rounded-md  items-center dark:bg-[#171923]
          bg-[#ffffff] border-2 border-white mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:border-none p-2">
            <h3 className={cn("flex  font-semibold  ml-2 text-lg hover:cursor-pointer text-ellipsis  items-center  rounded-md mr-2",)} >
                <div className="bg-[#181c28] p-2 rounded-md border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    {
                        {
                            'PKW': <CarFront className=" text-gray-100 h-6 w-6 " />,
                            'LKW': <Truck className=" text-gray-100 h-6 w-6 " />,
                            'LAND': <TractorIcon className=" text-gray-100 h-6 w-6 " />,
                            'BAU': <ConstructionIcon className=" text-gray-100 h-6 w-6 " />,
                            'TRANSPORT': <TramFront className=" text-gray-100 h-6 w-6 " />,
                            'CARAVAN': <CaravanIcon className=" text-gray-100 h-6 w-6 " />,
                            'TRAILOR': <CaravanIcon className=" text-gray-100 h-6 w-6 " />
                        }[inserat.category]
                    }
                </div>
                <div className="px-2 py-1 mt-1 rounded-md  ">
                    <div className="ml-4 font-bold text-[#0d0f15] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] truncate overflow-hidden text-medium w-[210px] h-[40px]
                 hover:cursor-pointer hover:underline dark:text-gray-100 " onClick={onRedirect}> {inserat.title} </div>
                </div>
                <div className="ml-auto items-center flex ">

                    <p className="">
                        <Button variant="ghost" onClick={onFav} className="dark:bg-[#171923] 
                        dark:border dark:border-[#171923]  dark:hover:none">
                            <Star className={cn(isFaved ? "text-yellow-300" : "text-black")} />
                        </Button>
                    </p>
                </div>

            </h3>

            <div className="flex justify-center h-[200px] items-center  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  w-full">
                <div className="flex p-4  w-full">
                    <div className="mr-4 w-[80px]">

                        <div className="">
                            {
                                {
                                    'PKW': inserat.pkwAttribute?.sitze && (
                                        <Badge className="bg-[#2c3246] border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                             dark:bg-[#181818]/95 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-[#181818]/60">
                                                <SofaIcon className="h-4 w-4 mr-1"/>
                                        <p className="mr-1 text-blue-200"> {inserat.pkwAttribute?.sitze} </p> Sitze
                                    </Badge>
                                    ),
                                    
                                }[inserat.category]
                            }


                        </div>

                        <div className="mt-1">
                            <Badge className="bg-[#242a39] flex border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                            dark:text-gray-100 dark:bg-[#181818]/95 dark:border-gray-700 dark:hover:bg-[#181818]/60
                            ">
                                <EyeIcon className="w-4 h-4 mr-1" /> {inserat.views}
                            </Badge>
                        </div>
                        <div className="mt-2">
                            <Badge className="bg-emerald-600 border-2 border-gray-300 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                            dark:bg-emerald-800 dark:text-gray-100 dark:border-gray-900 dark:hover:bg-emerald-700
                            ">
                                <CheckCheckIcon className="w-4 h-4" /> vorhanden
                            </Badge>
                        </div>
                    </div>
                    <div className="flex w-full">
                    <div className="w-1/2">
                    <Image
                        src={inserat.images[0].url}
                        width={220}
                        height={240}
                        className="rounded-md border-2 border-gray-400 hover:cursor-pointer dark:border-gray-900 max-h-[180px]"
                        onClick={onRedirect}
                        alt={inserat.title}
                    />
                    </div>
                    <div className="ml-4 dark:bg-[#191B27] bg-gray-200 w-1/2 p-4 text-xs rounded-md mr-2 overflow-hidden" >
                        {inserat.description}
                    </div>
                    </div>
                </div>
            </div>
            <div className="ml-2 ">
                <div className="flex justify-center bg-[#1e2332] p-2 rounded-md text-gray-100 mr-4 dark:border-[#1e2332] border-gray-300 border-2 
                drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:bg-[#191B27]">
                    <p className="text-gray-100 font-bold mr-4 flex">
                        <CalendarCheck2 className="mr-2" />  {inserat.annual ? "" : "Zeitraum :"}
                    </p>
                    {inserat.annual ? (
                        <p className="font-semibold  text-sm items-center"> Datumsunabhängig verfügbar </p>
                    ) : (
                        <>
                            <p className="font-semibold text-gray-200">
                                {formatDate(inserat.begin)}
                            </p>
                            <p className="font-bold text-black-800 mr-2 ml-2">
                                -
                            </p>
                            <p className="font-bold text-gray-200">
                                {formatDate(inserat.end)}
                            </p>
                        </>
                    )}
                </div>
                <div>
                <div className="font-semibold text-gray-900 flex mt-2 items-center">
                    <div className="flex">
                        <div className="flex dark:bg-emerald-800 bg-emerald-600 p-2 rounded-md border-gray-300 border-2
                         drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-gray-200 dark:border-emerald-800 px-4">
                            <div className="mr-2 flex font-bold">
                                
                                <Banknote className="mr-1" />
                            </div>
                            {inserat.price} €  {inserat.annual && (<div className="text-[10px] ml-1 mr-1" > / Tag</div>)} 
                        </div>
                    </div>
                    <div className="ml-auto w-[200px] mr-4 flex items-center dark:bg-[#171923] dark:border-[#171923]  bg-[#181c28] border-2 border-gray-300 
                    p-2 rounded-lg text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] truncate text-sm">
                        <MapPinIcon className="text-rose-600 mr-2 bg-gray-200 dark:bg-[#171923] dark:border-none rounded-md border-gray-300 border-2" /> 
                         {inserat.address?.locationString ? getAddressCity(inserat.address?.locationString) : "Keine Angabe"}
                        <p className="text-gray-300 text-xs ml-2">(187 Km)</p>
                    </div>
                    
                </div>
                <div className="w-full mt-2">

                    <div className="rounded-md bg-[#1b1e2d] w-full position:absolute mr-2 dark:bg-[#13141c] dark:border-none">
                        <div className="flex  items-center   rounded-md">
                            <Image
                                className="rounded-full ml-2 mt-2 mb-2 border border-gray-400 object-fit  w-[40px] h-[40px]"
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
                                <Button className="bg-[#222637] border border-white font-semibold dark:bg-[#171923] dark:text-gray-100 dark:hover:bg-[#181818]/60"
                                    onClick={() => { router.push(`/inserat/${inserat.id}`) }}>
                                    Besichtigen
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div >




        </div >
    );
}

export default InseratCard;
