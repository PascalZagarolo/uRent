'use client'

import { convertState } from "@/actions/convert-states";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



import { cn } from "@/lib/utils";



import axios from "axios";
import { format } from "date-fns";
import {
     CarFront,  CaravanIcon, CheckCheckIcon,  EyeIcon, FlameIcon, ImageIcon,
    MapPinned, SofaIcon, Star,  Truck,
    WeightIcon,
} from "lucide-react";


import { useRouter } from "next/navigation";
import { cache, useState } from "react";
import toast from "react-hot-toast";
import { FaCar, FaGasPump, FaShippingFast } from "react-icons/fa";
import { GiCarWheel, GiSteeringWheel } from "react-icons/gi";
import { PiVanFill } from "react-icons/pi";

import { TbCrane, TbLocationDiscount } from "react-icons/tb";
import { CategoryEnumRender, inserat, userTable } from "@/db/schema";

import { RiCaravanLine } from "react-icons/ri";
import { BsCalendarWeekFill, BsTools } from "react-icons/bs";


import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import ProfileBar from "./_inserat-card/profile-bar";
import Image from "next/image";
import { GrLocation, GrMapLocation } from "react-icons/gr";
import { IoMdOpen } from "react-icons/io";


interface InseratCardProps {
    thisInserat: typeof inserat.$inferSelect;
    profileId: string,
    
    currentUser: typeof userTable.$inferSelect;


}

const InseratCard: React.FC<InseratCardProps> = ({
    thisInserat,
    profileId,
    
    currentUser

}) => {

    const Colors = {
        BLUE: "border-blue-800",
        RED: "border-rose-800",
        GREEN: "border-emerald-600",
        YELLOW: "border-yellow-600",
        PURPLE: "border-indigo-600",
        ORANGE: "border-orange-600",
        VIOLET: "border-violet-900",
        WHITE: "border-gray-300",
        BLACK: "border-black",
    };

    const isFaved = currentUser?.favourites?.some((fav) => fav.inseratId === thisInserat.id);

    const isOwn = currentUser?.id === thisInserat?.userId;

    const formattedViews = Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
      }).format(thisInserat.views);

    const formatDate = (inputDate: Date): string => {
        const day = inputDate?.getDate().toString().padStart(2, '0');
        const month = (inputDate?.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    const usedImage = thisInserat?.images.reduce((lowest, image) => {
        return (lowest.position < image.position) ? lowest : image;
      })

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

    const onFav = async () => {
        try {
            setIsLoading(true);
            await axios.patch(`/api/profile/${profileId}/favourites`, { inseratId: thisInserat.id })
                .then(() => {
                    router.refresh();
                    toast.success("Anzeige zu Favouriten hinzugefügt")
                })

            
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
    
        const checkString = addressParts[addressParts.length - 2];

        if(checkString === "" || checkString === " " || !checkString) {
            return addressParts[addressParts.length - 1]
        } else {
            return addressParts[addressParts.length - 2]
        }

        
    };


    const usedCategory : typeof CategoryEnumRender = thisInserat.category;
  

    return (
        <div className={cn(`md:w-[760px] sm:h-[412px] w-full h-full  items-center bg-[#171923]
        mt-4  border-[#171923]  pt-4 rounded-md`, thisInserat?.isHighlighted && "dark:border-2 border-2 ",
        thisInserat?.color ? Colors[thisInserat?.color] : "border-blue-800",
        
        
        )}>



            <h3 className={cn("flex   font-semibold   text-lg hover:cursor-pointer  text-ellipsis  items-center w-full rounded-md px-2",)} >
                <div className="bg-[#181c28] p-2 rounded-md  sm:w-1/10">
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
                        className="hover:underline h-[24px] overflow-hidden w-3/4 sm:line-clamp-1
                        break-words text-ellipsis"
                        href={`/inserat/${thisInserat.id}`}
                        target="_blank"
                    >
                        {thisInserat.title}
                    </a>
                    <div className="ml-auto ">
                        {!olderThan24Hours && (
                            <Badge className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 gap-x-1">
                            Neu <FlameIcon className="w-4 h-4" />
                        </Badge>
                        )}
                    </div>

                </div>
                
                <div className="ml-auto items-center sm:flex hidden ">


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
                                        {//@ts-ignore
                                        thisInserat.lkwAttribute?.drive && (

                                            <Badge className="bg-yellow-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                                dark:text-gray-100  hover:bg-yellow-600">
                                                <GiCarWheel className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-yellow-800"> {thisInserat.lkwAttribute?.drive.substring(1)} </p>
                                            </Badge>
                                        )}
                                    </div>,
                                    'TRANSPORT': <div className="space-y-1">
                                        {//@ts-ignore
                                        thisInserat.transportAttribute?.loading && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                         dark:text-gray-100 hover:bg-gray-600">
                                                <TbCrane className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800">
                                                    {//@ts-ignore
                                                    thisInserat.transportAttribute?.loading.substring(0, 1)}
                                                    {//@ts-ignore
                                                    thisInserat.transportAttribute?.loading.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {//@ts-ignore
                                        thisInserat.transportAttribute?.seats && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-gray-600">

                                                <SofaIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800"> {thisInserat.transportAttribute?.seats} </p> Sitze
                                            </Badge>
                                        )}
                                        {//@ts-ignore
                                        thisInserat.transportAttribute?.fuel && (

                                            <Badge className="bg-gray-500  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-gray-600">
                                                <FaGasPump className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-gray-800">
                                                    {//@ts-ignore
                                                    thisInserat.transportAttribute?.fuel.substring(0, 1)}
                                                    {//@ts-ignore
                                                    thisInserat.transportAttribute?.fuel.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                    </div>,
                                    'TRAILER': <div className="space-y-1">
                                        {//@ts-ignore
                                        thisInserat.trailerAttribute?.type && (

                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                     dark:text-gray-100 hover:bg-rose-900  ">
                                                <CaravanIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200">
                                                    {//@ts-ignore
                                                    thisInserat.trailerAttribute?.type?.substring(0, 1)}
                                                    {//@ts-ignore
                                                    thisInserat.trailerAttribute?.type?.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {//@ts-ignore
                                        thisInserat.trailerAttribute?.loading && (

                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-rose-900">
                                                <TbCrane className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200">
                                                    {//@ts-ignore
                                                    thisInserat.trailerAttribute?.loading.substring(0, 1)}
                                                    {//@ts-ignore
                                                    thisInserat.trailerAttribute?.loading.substring(1).toLowerCase()}
                                                </p>
                                            </Badge>
                                        )}
                                        {//@ts-ignore
                                        thisInserat.trailerAttribute?.weightClass && (
                                            <Badge className="bg-rose-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
                                            dark:text-gray-100 hover:bg-rose-900">
                                                <WeightIcon className="h-4 w-4 mr-1" />
                                                <p className="mr-1 text-rose-200 w-full">
                                                    {//@ts-ignore
                                                    thisInserat.trailerAttribute.weightClass / 100}t
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
                                <EyeIcon className="w-4 h-4 mr-1" /> {formattedViews}
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
                                    src={usedImage?.url}
                                    
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


                <div className="flex justify-center bg-[#1e2332] p-2 text-xs  text-gray-200 font-semibold  dark:border-[#1e2332]  
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] dark:bg-[#191B27] items-center gap-x-2">
                    
                            <div className={cn("w-1/2 sm:truncate flex items-center text-sm h-[24px] overflow-hidden", //@ts-ignore
                             !thisInserat.address?.locationString && "w-full flex justify-center ")}>
                                <div>
                                <GrLocation  className="text-rose-600 w-4 h-4 mr-2"  />
                                </div>
                                {//@ts-ignore
                                thisInserat.address?.locationString ? //@ts-ignore
                                    getAddressCity(thisInserat.address?.locationString) 
                                    : "Keine Angabe"}
                            </div>


                            {//@ts-ignore
                            thisInserat.address?.locationString && (
                                <div className="ml-auto gap-x-1 flex text-xs w-1/2 overflow-hidden items-center">
                                    {//@ts-ignore
                                    thisInserat.address?.postalCode + ", "}
                                    <div className="w-2/3 sm:truncate h-[16px]">
                                        {//@ts-ignore
                                        thisInserat.address?.state ? convertState(thisInserat.address?.state) : ""}, Deutschland
                                    </div>
                                </div>
                            )}

                            
                                
                </div>
                <div>

                    {/* Part2 */}
                    <div className="font-semibold text-gray-900 flex mt-2 items-center w-full">
                        <div className="flex ">
                            <div className="flex border-none  bg-emerald-800 p-2 rounded-r-md 
                              text-gray-200  px-4 sm:text-sm 
                             text-xs items-center">
                                <div className="sm:mr-2 flex font-bold">

                                    <LiaMoneyBillWaveSolid className="mr-1 sm:block hidden w-4 h-4" />
                                </div>
                                {thisInserat.price} €  {thisInserat.dailyPrice ? (<div className="text-[10px] ml-1 mr-1" > / Tag</div>)
                                    : (<div className="text-[10px] ml-1 mr-1 hidden sm:block" > / Zeitraum</div>)}
                            </div>
                        </div>
                        <a className="ml-auto w-2/3 gap-x-2 hover:underline  sm:w-1/2 flex items-center dark:[#171923] dark:border-[#171923] 
                         bg-[#181c28]  
                        p-2 sm:pl-2 pl-0 sm:rounded-l-md text-gray-100 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)] 
                        sm:truncate text-sm justify-center"
                        target="_blank"
                        href={`/inserat/${thisInserat.id}`}
                        >
                           <IoMdOpen className="w-4 h-4 mr-2"  /> Verfügbarkeitskalender anschauen 
                        </a>
                    </div>



                    <div className="h-full bg-blue-800">
                    <ProfileBar
                        thisInserat={thisInserat}
                        currentUser={currentUser}
                    />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default InseratCard;
