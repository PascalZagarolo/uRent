'use client'

import { convertState } from "@/actions/convert-states";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



import { cn } from "@/lib/utils";



import axios from "axios";
import { format } from "date-fns";
import {
    Banknote, CalendarCheck2, CarFront, CarIcon, CaravanIcon, CheckCheckIcon, ConstructionIcon, EyeIcon, FlameIcon, ImageIcon,
    MapPinned, SofaIcon, Star, TractorIcon, TramFront, Truck,
    WeightIcon,
} from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCar, FaGasPump } from "react-icons/fa";
import { GiCarWheel, GiSteeringWheel } from "react-icons/gi";
import { PiEngineFill, PiVanFill } from "react-icons/pi";

import { TbCrane } from "react-icons/tb";
import { CategoryEnumRender, inserat, userTable } from "@/db/schema";
import Link from "next/link";
import { RiCaravanLine } from "react-icons/ri";
import { BsCalendarWeekFill, BsTools } from "react-icons/bs";
import { SiRubygems } from "react-icons/si";
import { BiMoneyWithdraw } from "react-icons/bi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import ProfileBar from "./_inserat-card/profile-bar";

interface InseratCardProps {
    thisInserat: typeof inserat.$inferSelect;
    profileId: string,
    isFaved: boolean,
    currentUser: typeof userTable.$inferSelect;


}

const InseratCard: React.FC<InseratCardProps> = ({
    thisInserat,
    profileId,
    isFaved,
    currentUser

}) => {

    const isOwn = currentUser?.id === thisInserat?.userId;

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

    
    const currentDate = new Date();

    
    const twentyFourHoursAgo = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000));

    
    const firstReleaseDate = new Date(thisInserat.firstRelease);

    
    const olderThan24Hours = firstReleaseDate < twentyFourHoursAgo;

    const onFav = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/profile/${profileId}/favourites`, { inseratId: thisInserat.id })

            setTimeout(() => {
                router.refresh();
            }, 500)
        } catch {
            toast.error("Fehler beim Favorisieren der Anzeige")
        } finally {
            setIsLoading(false);
        }
    }

    const handleTextChange = (event : any) => {
        setText(event.target.value);
    };

    const onRedirect = () => {
        router.push(`/inserat/${thisInserat.id}`)
    }

    const getAddressCity = (address: string): string => {
        const addressParts = address.split(', ');
        return addressParts[addressParts.length - 2]
    };


    const usedCategory : typeof CategoryEnumRender = thisInserat.category;
  

    return (
        <div className={cn(`md:w-[760px] sm:h-[412px] w-full h-full  items-center bg-[#171923]
        mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] border-[#171923] px-2 py-4 rounded-md`,
        thisInserat?.inseratSubscription?.subscriptionType === "ENTERPRISE" && "dark:border-2 border-2 border-indigo-900",
        thisInserat?.inseratSubscription?.subscriptionType === "PREMIUM" && "dark:border-2 border-2 border-indigo-900",
        
        )}>



            <h3 className={cn("flex  font-semibold  ml-2 text-lg hover:cursor-pointer  text-ellipsis  items-center w-full rounded-md mr-2",)} >
                <div className="bg-[#181c28] p-2 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] sm:w-1/10">
                    {
                        {
                            'PKW': <CarFront className=" text-gray-300 h-6 w-6 " />,
                            'LKW': <Truck className=" text-gray-300 h-6 w-6 " />,
                            'TRANSPORT': <PiVanFill className=" text-gray-300 h-6 w-6 " />,
                            'TRAILER': <RiCaravanLine className="text-gray-300 w-6 h-6" />
                            //@ts-ignore
                        }[usedCategory]
                    }
                </div>
                <div className="w-full ml-4 mr-4 text-base font-semibold h-[24px]  text-gray-200 flex items-center ">

                    <a
                        className="hover:underline h-[24px] overflow-hidden w-3/4 sm:truncate
                        break-words text-ellipsis"
                        href={`/inserat/${thisInserat.id}`}
                        target="_blank"
                    >
                        {thisInserat.title}
                    </a>
                    <div className="ml-auto w-1/4">
                        {!olderThan24Hours && (
                            <Badge className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 gap-x-1">
                            Neu <FlameIcon className="w-4 h-4" />
                        </Badge>
                        )}
                    </div>

                </div>
                <div className="ml-auto mr-4 ">

                </div>
                <div className="ml-auto items-center sm:flex hidden sm:mr-4">


                    <Button variant="ghost" onClick={onFav} className="bg-[#171923] 
        border border-[#171923]  hover:none ">
                        <Star className={cn("w-4 h-4", isFaved ? "text-yellow-300" : "text-gray-200")} />
                    </Button>

                </div>

            </h3>

            <div className="flex justify-center h-[200px] items-center  w-full">
                <div className="flex p-4  w-full">
                    <div className="mr-2 sm:w-[80px] ">

                        <div className="sm:block hidden">
                            {
                                {
                                    'PKW':
                                        <div className="space-y-1">
                                            {thisInserat.pkwAttribute?.seats && (
                                                <Badge className="bg-blue-800   drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                  dark:text-gray-100  dark:hover:bg-[#181818]/60">
                                                    <SofaIcon className="h-4 w-4 mr-1" />
                                                    <p className="mr-1 text-blue-200"> {thisInserat.pkwAttribute?.seats} </p> Sitze
                                                </Badge>
                                            )}
                                            {thisInserat.pkwAttribute?.power && (

                                                <Badge className="bg-blue-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                  dark:text-gray-100  dark:hover:bg-[#181818]/60">
                                                    <FaCar className="h-4 w-4 mr-1" />
                                                    <p className="mr-1 text-blue-200"> {thisInserat.pkwAttribute?.power} </p> PS
                                                </Badge>
                                            )}
                                            {thisInserat.pkwAttribute?.freeMiles && (

                                                <Badge className="bg-blue-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                 dark:text-gray-100  dark:hover:bg-[#181818]/60">
                                                    <GiSteeringWheel className="h-4 w-4 mr-1" />
                                                    <p className="mr-1 text-blue-200"> {thisInserat.pkwAttribute?.freeMiles} </p> KM
                                                </Badge>
                                            )}
                                        </div>,
                                    'LKW': <div className="space-y-1">
                                        {thisInserat.lkwAttribute?.loading && (

                                            <Badge className="bg-yellow-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                             dark:text-gray-100 hover:bg-yellow-600">
                                                <TbCrane className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-yellow-800">
                                                    {thisInserat.lkwAttribute?.loading.substring(0, 1)}
                                                    {thisInserat.lkwAttribute?.loading.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {thisInserat.lkwAttribute?.application && (

                                            <Badge className="bg-yellow-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                          dark:text-gray-100 hover:bg-yellow-600 ">
                                                <BsTools className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-yellow-800">
                                                    {thisInserat.lkwAttribute?.application.substring(0, 1)}
                                                    {thisInserat.lkwAttribute?.application.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {thisInserat.lkwAttribute?.drive && (

                                            <Badge className="bg-yellow-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                dark:text-gray-100  hover:bg-yellow-600">
                                                <GiCarWheel className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-yellow-800"> {thisInserat.lkwAttribute?.drive.substring(1)} </p>
                                            </Badge>
                                        )}
                                    </div>,
                                    'TRANSPORT': <div className="space-y-1">
                                        {thisInserat.transportAttribute?.loading && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                         dark:text-gray-100 hover:bg-gray-600">
                                                <TbCrane className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800">
                                                    {thisInserat.transportAttribute?.loading.substring(0, 1)}
                                                    {thisInserat.transportAttribute?.loading.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {thisInserat.transportAttribute?.seats && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-gray-600">

                                                <SofaIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800"> {thisInserat.transportAttribute?.seats} </p> Sitze
                                            </Badge>
                                        )}
                                        {thisInserat.transportAttribute?.fuel && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-gray-600">
                                                <FaGasPump className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800">
                                                    {thisInserat.transportAttribute?.fuel.substring(0, 1)}
                                                    {thisInserat.transportAttribute?.fuel.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                    </div>,
                                    'TRAILER': <div className="space-y-1">
                                        {thisInserat.trailerAttribute?.type && (

                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                     dark:text-gray-100 hover:bg-rose-900  ">
                                                <CaravanIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200">
                                                    {thisInserat.trailerAttribute?.type?.substring(0, 1)}
                                                    {thisInserat.trailerAttribute?.type?.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {thisInserat.trailerAttribute?.loading && (

                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-rose-900">
                                                <TbCrane className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200">
                                                    {thisInserat.trailerAttribute?.loading.substring(0, 1)}
                                                    {thisInserat.trailerAttribute?.loading.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {thisInserat.trailerAttribute?.weightClass && (
                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-rose-900">
                                                <WeightIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200 w-full">
                                                    {thisInserat.trailerAttribute.weightClass / 100}t
                                                </p>
                                            </Badge>
                                        )}
                                    </div>,
                                    //@ts-ignore
                                }[usedCategory]
                            }


                        </div>

                        <div className="mt-1 sm:block hidden">
                            <Badge className="bg-[#171923] flex  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                dark:text-gray-100 dark:bg-[#181818]/95  dark:hover:bg-[#181818]/60
                                ">
                                <EyeIcon className="w-4 h-4 mr-1" /> {thisInserat.views}
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
                        <div className="sm:w-1/2 flex w-full">
                            <div className="w-full">
                                <img
                                    src={thisInserat.images[0]?.url}
                                    
                                    
                                    style={{objectFit: "cover"}}
                                    
                                    className="transform: translate3d(0px, 0px, 0.1px) 
                                    rounded-md hover:cursor-pointer  dark:border-gray-900 h-[160px] 
                                    w-full "
                                    onClick={onRedirect}
                                    alt={thisInserat.title}
                                    loading="lazy"
                                />
                                <div className="text-xs justify-end text-gray-200">
                                    inseriert am:  {format(new Date(thisInserat.createdAt), "dd.MM")}
                                </div>
                            </div>
                            <div className="flex text-xs font-bold text-gray-200">
                                <ImageIcon className="w-4 h-4 mr-1 ml-1" />  {thisInserat.images.length}
                            </div>
                        </div>

                        <div className="ml-4 bg-[#191B27] text-gray-200  border-none  
                        w-1/2 p-2 text-xs sm:mr-2 overflow-hidden sm:h-[172px] h-[130px]" >
                            <div className="h-full overflow-hidden text-xs whitespace-pre-wrap break-words">
                                {thisInserat.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">


                <div className="flex justify-center bg-[#1e2332] p-2  text-gray-100  dark:border-[#1e2332]  
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] dark:bg-[#191B27] items-center">
                    <p className="text-gray-100 font-bold mr-4 flex">
                        <BsCalendarWeekFill className="w-4 h-4 mr-2" />  {thisInserat.annual ? "" : "Zeitraum :"}
                    </p>
                    {thisInserat.annual ? (
                        <p className="font-semibold  text-sm items-center"> Dauerhaftes Inserat </p>
                    ) : (
                        <>
                            <p className="font-semibold text-gray-200">
                                {formatDate(thisInserat?.begin)}
                            </p>
                            <p className="font-bold text-black-800 mr-2 ml-2">
                                -
                            </p>
                            <p className="font-bold text-gray-200">
                                {formatDate(thisInserat?.end)}
                            </p>
                        </>
                    )}
                </div>
                <div>

                    {/* Part2 */}
                    <div className="font-semibold text-gray-900 flex mt-2 items-center w-full">
                        <div className="flex ">
                            <div className="flex  bg-emerald-800 p-2 rounded-md 
                              text-gray-100  px-4 sm:text-sm 
                             text-xs items-center">
                                <div className="sm:mr-2 flex font-bold">

                                    <LiaMoneyBillWaveSolid className="mr-1 sm:block hidden w-4 h-4" />
                                </div>
                                {thisInserat.price} €  {thisInserat.dailyPrice ? (<div className="text-[10px] ml-1 mr-1" > / Tag</div>)
                                    : (<div className="text-[10px] ml-1 mr-1 hidden sm:block" > / Zeitraum</div>)}
                            </div>
                        </div>
                        <div className="ml-auto w-2/3 gap-x-2  sm:w-1/2 flex items-center dark:bg-[#171923] dark:border-[#171923] 
                         bg-[#181c28]  
                        p-2 sm:pl-2 pl-0  text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:truncate text-sm justify-center">
                            <MapPinned className="text-rose-600 sm:mr-2  dark:bg-[#171923] dark:border-none rounded-md w-4 h-4" />
                            <div className={cn("w-1/3 sm:truncate h-[20px] overflow-hidden", !thisInserat.address?.locationString && "w-full flex justify-center")}>
                                {thisInserat.address?.locationString ?
                                    getAddressCity(thisInserat.address?.locationString)
                                    : "Keine Angabe"}
                            </div>


                            {thisInserat.address?.locationString && (
                                <div className="ml-auto gap-x-1 flex text-xs w-3/5 overflow-hidden items-center">
                                    {thisInserat.address?.postalCode + ", "}
                                    <div className="w-2/3 sm:truncate h-[16px]">
                                        {thisInserat.address?.state ? convertState(thisInserat.address?.state) : ""}, Deutschland
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>



                    <ProfileBar
                        thisInserat={thisInserat}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default InseratCard;
