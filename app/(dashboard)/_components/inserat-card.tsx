'use client'

import { convertState } from "@/actions/convert-states";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



import { cn } from "@/lib/utils";
import { InserateImagesAndAttributes } from "@/types/types";

import { User } from "@prisma/client";

import axios from "axios";
import { format } from "date-fns";
import {
    Banknote, CalendarCheck2, CarFront, CaravanIcon, CheckCheckIcon, ConstructionIcon, EyeIcon, ImageIcon,
    MapPinned, SofaIcon, Star, TractorIcon, TramFront, Truck,
    WeightIcon,
} from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCar, FaGasPump } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { PiEngineFill, PiVanFill } from "react-icons/pi";
import ProfileBar from "./inserat-card/profile-bar";
import { TbCrane } from "react-icons/tb";

interface InseratCardProps {
    inserat: InserateImagesAndAttributes;
    profileId: string,
    isFaved: boolean,
    currentUser: User;


}

const InseratCard: React.FC<InseratCardProps> = ({
    inserat,
    profileId,
    isFaved,
    currentUser

}) => {

    const isOwn = currentUser?.id === inserat.userId;

    const formatDate = (inputDate: Date): string => {
        const day = inputDate?.getDate().toString().padStart(2, '0');
        const month = (inputDate?.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [text, setText] = useState(
        "Betreff: Anfrage bezüglich Mietwagen\n\n" +
        "Sehr geehrte Damen und Herren,\n\n" +
        `Nach eingehender Prüfung Ihres Mietangebots bin ich sehr interessiert an dem genannten Fahrzeug.
         Gerne würde ich weitere Details zu den Konditionen besprechen und das Fahrzeug persönlich in Augenschein nehmen.\n\n` +
        "Mit freundlichen Grüßen,\n" +
        (currentUser?.name ? currentUser?.name + " " : "[Dein Name] ") +
        "Meine Kontaktdaten : \n\n" +
        "E-Mail : " + (currentUser?.email ? currentUser?.email : "[Deine E-Mail Addresse]") + "\n"

    );


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

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const onRedirect = () => {
        router.push(`/inserat/${inserat.id}`)
    }

    const getAddressCity = (address: string): string => {
        const addressParts = address.split(', ');
        return addressParts[addressParts.length - 2]
    };





    return (
        <div className="sm:w-[760px] sm:h-[420px] w-full h-full rounded-md  items-center dark:bg-[#171923]
          bg-[#ffffff]  mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:border-none p-2 ">



            <h3 className={cn("flex  font-semibold  ml-2 text-lg hover:cursor-pointer text-ellipsis  items-center w-full rounded-md mr-2",)} >
                <div className="bg-[#181c28] p-2 rounded-md  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] w-1/10">
                    {
                        {
                            'PKW': <CarFront className=" text-gray-100 h-6 w-6 " />,
                            'LKW': <Truck className=" text-gray-100 h-6 w-6 " />,
                            'TRANSPORT': <PiVanFill className=" text-gray-100 h-6 w-6 " />,
                            'TRAILOR': <CaravanIcon className=" text-gray-100 h-6 w-6 " />
                        }[inserat.category]
                    }
                </div>
                <div className="px-2 py-1 mt-1 rounded-md w-1/2">
                    <div className="ml-4 font-bold text-[#0d0f15] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] truncate overflow-hidden text-medium w-full h-[40px]
                     hover:cursor-pointer hover:underline dark:text-gray-100 " onClick={onRedirect}> {inserat.title} </div>
                </div>
                {inserat?.multi && (
                    <span className="p-4 text-xs text-gray-100 border-white border-dashed border bg-[#191B27] rounded-md flex items-center">
                        {
                            {
                                'PKW': <CarFront className=" text-gray-100 h-4 w-4 mr-2" />,
                                'LKW': <Truck className=" text-gray-100 h-4 w-4 mr-2" />,
                                'TRANSPORT': <PiVanFill className=" text-gray-100 h-4 w-4 mr-2" />,
                                'TRAILOR': <CaravanIcon className=" text-gray-100 h-4 w-4 mr-2" />
                            }[inserat.category]
                        }

                        Noch <p className=" font-black px-1 ">{inserat?.amount}</p> verfügbar
                    </span>
                )}
                <div className="ml-auto items-center sm:flex hidden">


                    <Button variant="ghost" onClick={onFav} className="dark:bg-[#171923] 
                            dark:border dark:border-[#171923]  dark:hover:none">
                        <Star className={cn(isFaved ? "text-yellow-300" : "text-black")} />
                    </Button>

                </div>

            </h3>

            <div className="flex justify-center h-[200px] items-center   w-full">
                <div className="flex p-4  w-full">
                    <div className="mr-4 sm:w-[80px]">

                        <div className="sm:block hidden">
                            {
                                {
                                    'PKW':
                                        <div className="space-y-1">
                                            {inserat.pkwAttribute?.seats && (
                                                <Badge className="bg-blue-800   drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                  dark:text-gray-100  dark:hover:bg-[#181818]/60">
                                                    <SofaIcon className="h-4 w-4 mr-1" />
                                                    <p className="mr-1 text-blue-200"> {inserat.pkwAttribute?.seats} </p> Sitze
                                                </Badge>
                                            )}
                                            {inserat.pkwAttribute?.power && (

                                                <Badge className="bg-blue-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                  dark:text-gray-100  dark:hover:bg-[#181818]/60">
                                                    <FaCar className="h-4 w-4 mr-1" />
                                                    <p className="mr-1 text-blue-200"> {inserat.pkwAttribute?.power} </p> PS
                                                </Badge>
                                            )}
                                            {inserat.pkwAttribute?.freeMiles && (

                                                <Badge className="bg-blue-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                 dark:text-gray-100  dark:hover:bg-[#181818]/60">
                                                    <GiSteeringWheel className="h-4 w-4 mr-1" />
                                                    <p className="mr-1 text-blue-200"> {inserat.pkwAttribute?.freeMiles} </p> KM
                                                </Badge>
                                            )}
                                        </div>,
                                    'LKW': <div className="space-y-1">
                                        {inserat.lkwAttribute?.loading && (

                                            <Badge className="bg-yellow-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                             dark:text-gray-100 hover:bg-yellow-600">
                                                <PiEngineFill className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-yellow-800">
                                                    {inserat.lkwAttribute?.loading.substring(0, 1)}
                                                    {inserat.lkwAttribute?.loading.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {inserat.lkwAttribute?.application && (

                                            <Badge className="bg-yellow-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                          dark:text-gray-100 hover:bg-yellow-600 ">
                                                <PiEngineFill className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-yellow-800">
                                                    {inserat.lkwAttribute?.application.substring(0, 1)}
                                                    {inserat.lkwAttribute?.application.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {inserat.lkwAttribute?.drive && (

                                            <Badge className="bg-yellow-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                dark:text-gray-100  hover:bg-yellow-600">
                                                <PiEngineFill className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-yellow-800"> {inserat.lkwAttribute?.drive.substring(1)} </p>
                                            </Badge>
                                        )}
                                    </div>,
                                    'TRANSPORT': <div className="space-y-1">
                                        {inserat.transportAttribute?.loading && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                         dark:text-gray-100 hover:bg-gray-600">
                                                <TbCrane className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800">
                                                    {inserat.transportAttribute?.loading.substring(0, 1)}
                                                    {inserat.transportAttribute?.loading.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {inserat.transportAttribute?.seats && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-gray-600">

                                                <SofaIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800"> {inserat.pkwAttribute?.seats} </p> Sitze
                                            </Badge>
                                        )}
                                        {inserat.transportAttribute?.fuel && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-gray-600">
                                                <FaGasPump className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800">
                                                    {inserat.transportAttribute?.fuel.substring(0, 1)}
                                                    {inserat.transportAttribute?.fuel.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                    </div>,
                                    'TRAILOR': <div className="space-y-1">
                                        {inserat.trailerAttribute?.type && (

                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                     dark:text-gray-100 hover:bg-rose-900  ">
                                                <CaravanIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200">
                                                    {inserat.trailerAttribute?.type?.substring(0, 1)}
                                                    {inserat.trailerAttribute?.type?.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {inserat.trailerAttribute?.loading && (

                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-rose-900">
                                                <TbCrane className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200">
                                                    {inserat.trailerAttribute?.loading.substring(0, 1)}
                                                    {inserat.trailerAttribute?.loading.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {inserat.trailerAttribute?.weightClass && (

                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-rose-900">
                                                <WeightIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200 w-full">
                                                 bis {inserat.trailerAttribute.weightClass / 100}t
                                                </p>
                                            </Badge>
                                        )}
                                    </div>,

                                }[inserat.category]
                            }


                        </div>

                        <div className="mt-1 sm:block hidden">
                            <Badge className="bg-[#242a39] flex  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                dark:text-gray-100 dark:bg-[#181818]/95  dark:hover:bg-[#181818]/60
                                ">
                                <EyeIcon className="w-4 h-4 mr-1" /> {inserat.views}
                            </Badge>
                        </div>
                        <div className="mt-2 sm:block hidden">
                            <Badge className="bg-emerald-600  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                dark:bg-emerald-800 dark:text-gray-100  dark:hover:bg-emerald-700
                                ">
                                <CheckCheckIcon className="w-4 h-4" /> verfügbar
                            </Badge>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className="sm:w-1/2 flex">
                            <div className="">
                                <Image
                                    src={inserat.images[0].url}
                                    
                                    width={220}
                                    height={240}
                                    className="rounded-md hover:cursor-pointer dark:border-gray-900 max-h-[180px] full"
                                    onClick={onRedirect}
                                    alt={inserat.title}
                                />
                                <div className="text-xs font-semibold">
                                    inseriert am:  {format(new Date(inserat.createdAt), "dd.MM")}
                                </div>
                            </div>
                            <div className="flex text-xs font-bold">
                                <ImageIcon className="w-4 h-4 mr-1 ml-1" />  {inserat.images.length}
                            </div>
                        </div>

                        <div className="ml-4 dark:bg-[#191B27] bg-gray-100/20 w-1/2 p-4 text-xs rounded-md mr-2 overflow-hidden h-[160px]" >
                            {inserat.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className=" ">
                <div className="flex justify-center bg-[#1e2332] p-2 rounded-md text-gray-100  dark:border-[#1e2332]  
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
                            <div className="flex dark:bg-emerald-800 bg-emerald-600 p-2 rounded-md 
                             drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-gray-200 dark:border-emerald-800 px-4 sm:text-sm text-xs items-center">
                                <div className="mr-2 flex font-bold">

                                    <Banknote className="mr-1 sm:block hidden" />
                                </div>
                                {inserat.price} €  {inserat.annual && (<div className="text-[10px] ml-1 mr-1" > / Tag</div>)}
                            </div>
                        </div>
                        <div className="ml-auto w-2/3  sm:w-1/2 flex items-center dark:bg-[#171923] dark:border-[#171923]  bg-[#181c28] 0 
                        p-2 sm:pl-2 pl-0 rounded-lg text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] truncate text-sm justify-center">
                            <MapPinned className="text-rose-600 mr-2  dark:bg-[#171923] dark:border-none rounded-md w-4 h-4" />
                            <div className={cn("w-1/3 truncate", !inserat.address?.locationString && "w-full flex justify-center")}>
                                {inserat.address?.locationString ?
                                    getAddressCity(inserat.address?.locationString)
                                    : "Keine Angabe"}
                            </div>
                            {inserat.address?.locationString && (
                                <div className="text-gray-100 w-1/3 sm:w-2/3 text-xs ml-2 sm:ml-auto  flex">{inserat.address?.postalCode + " "}
                                    <p className=" truncate ml-1 sm:max-w-[160px] mr-1"> {inserat.address?.state ? convertState(inserat.address?.state) + "," : ""} </p>DE</div>
                            )}
                        </div>

                    </div>
                    <ProfileBar
                        inserat={inserat}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default InseratCard;
