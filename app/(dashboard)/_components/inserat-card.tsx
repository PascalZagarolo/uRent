'use client'

import { convertState } from "@/actions/convert-states";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



import { cn } from "@/lib/utils";



import axios from "axios";
import { format } from "date-fns";
import {
    Calendar,
    CalendarCheckIcon,
    CarFront, CarFrontIcon, CarIcon, CaravanIcon, CheckCheckIcon, EyeIcon, FlameIcon, ImageIcon,
    MapPinned, SofaIcon, Star, Truck,
    WeightIcon,
} from "lucide-react";


import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCar, FaGasPump, FaShippingFast } from "react-icons/fa";
import { GiCarWheel, GiSteeringWheel } from "react-icons/gi";
import { PiVanFill } from "react-icons/pi";

import { TbCrane, TbLocationDiscount } from "react-icons/tb";
import { CategoryEnumRender, inserat, userTable } from "@/db/schema";

import { RiCaravanLine } from "react-icons/ri";
import { BsTools } from "react-icons/bs";


import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import ProfileBar from "./_inserat-card/profile-bar";
import Image from "next/image";
import { GrLocation, GrMapLocation } from "react-icons/gr";
import { IoMdOpen } from "react-icons/io";
import { useOpenAvailabilityOnPageLoad } from "@/store";
import { HighlightColorsBackground } from "@/hooks/inserat-card/useHighlightColors";


interface InseratCardProps {
    thisInserat: typeof inserat.$inferSelect | any;
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

            if (currentUser) {
                await axios.patch(`/api/profile/${profileId}/favourites`, { inseratId: thisInserat.id })
                    .then(() => {
                        router.refresh();
                        toast.success("Anzeige zu Favouriten hinzugefügt")
                    })
            } else {
                router.push("/login")
            }



        } catch {
            toast.error("Fehler beim Favorisieren der Anzeige")
        } finally {
            setIsLoading(false);
        }
    }

    const handleTextChange = (event: any) => {
        setText(event.target.value);
    };

    const onRedirect = () => {
        router.push(`/inserat/${thisInserat.id}`)
    }


    const shortedAddress = thisInserat?.address?.locationString?.split(", Deutschland")[0];

    const usedCategory: typeof CategoryEnumRender = thisInserat.category;

    const { changeOpenOnPageLoad } = useOpenAvailabilityOnPageLoad();

    //thisInserat?.color ? HighlightColorsBackground[thisInserat?.color]

    return (
        
           
            <div className={cn(`md:w-[760px] sm:h-[428px] w-full h-full  items-center bg-[#1a1d28] mt-4
          border-[#171923]  pt-2 rounded-b-md`, thisInserat?.isHighlighted && "border-indigo-800 border-2 ",
                thisInserat?.color ? Colors[thisInserat?.color] : "border-blue-800",


            )}>



                <h3 className={cn("flex flex-row   font-semibold   text-lg hover:cursor-pointer  text-ellipsis  items-center w-full rounded-md px-2 ",)} >
                    <div className={cn("shadow-lg py-4 px-2.5 rounded-md  sm:w-1/10 ")}>
                        {
                            {
                                'PKW': <CarFront className=" text-gray-200 h-6 w-6 " />,
                                'LKW': <Truck className=" text-gray-300 h-6 w-6 " />,
                                'TRANSPORT': <PiVanFill className=" text-gray-300 h-6 w-6 " />,
                                'TRAILER': <RiCaravanLine className="text-gray-300 w-6 h-6" />
                                //@ts-ignore
                            }[usedCategory]
                        }
                    </div>
                    <div className="w-full ml-4 mr-4 text-base font-semibold h-[32px]  text-gray-200 flex items-center ">

                        <a
                            className="hover:underline h-[24px] overflow-hidden w-3/4  sm:line-clamp-1 break-all"
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
                    {currentUser?.id !== thisInserat?.userId && (
                        <div className="ml-auto items-center sm:flex hidden ">
                            <Button variant="ghost" onClick={onFav} className="
          hover:none ">
                                <Star className={cn("w-4 h-4", isFaved ? "text-yellow-300" : "text-gray-200")} />
                            </Button>
                        </div>
                    )}


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
                            {/* 
                        <div className="mt-1 sm:block hidden">
                            <Badge className="bg-[#171923] flex  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                                dark:text-gray-100 dark:bg-[#181818]/95  dark:hover:bg-[#181818]/60
                                ">
                                <EyeIcon className="w-4 h-4 mr-1" /> {formattedViews}
                            </Badge>
                        </div> */}
                            <div className="mt-1 sm:block hidden">
                                <Badge className="bg-emerald-800  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.0)]
                                dark:bg-emerald-800 dark:text-gray-200  dark:hover:bg-emerald-700
                                ">
                                    <CheckCheckIcon className="w-4 h-4 mr-1" /> verfügbar
                                </Badge>
                            </div>

                        </div>
                        <div className="flex w-full">
                            <div className="sm:w-1/2 flex w-full">
                                <div className="w-full">
                                    <img
                                        src={usedImage?.url}

                                        style={{ objectFit: "cover" }}

                                        className="transform: translate3d(0px, 0px, 0.1px) 
                                    rounded-md hover:cursor-pointer  dark:border-gray-900 h-[160px] 
                                    w-full "
                                        onClick={onRedirect}
                                        alt={thisInserat.title}
                                        loading="lazy"
                                    />
                                    <div className="text-xs justify-end text-gray-200/60 mt-1">
                                        veröffentlicht  {format(new Date(thisInserat.firstRelease), "dd.MM")}
                                    </div>
                                </div>
                                <div className="flex text-xs font-bold text-gray-200">
                                    <ImageIcon className="w-4 h-4 mr-1 ml-1" />  {thisInserat.images.length}
                                </div>
                            </div>

                            <div className="ml-4  text-gray-200/80  border-none  
                        w-1/2 p-2 text-xs sm:mr-2 overflow-hidden sm:h-[180px] h-[130px] sm:block hidden" >
                                <div className="h-full overflow-hidden text-xs  whitespace-pre-wrap break-words">
                                    {thisInserat.description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">


                    <div className="flex items-center   p-3  text-gray-200 text-sm 
                font-semibold   space-x-2 transition-transform border-[#161923] ">
                        {/* Icon Section */}
                        <div className="flex items-center justify-center  rounded-md">
                            <GrLocation className="w-4 h-4  text-rose-800" />
                        </div>

                        {/* Address Section */}
                        <div className="flex flex-col flex-grow">
                            <div className="flex items-center gap-x-2 text-sm w-full">

                                <span className="text-gray-200 flex-shrink-0">{thisInserat?.address?.postalCode}</span>


                                <span className="text-gray-200/80"> | </span>


                                <span className="text-gray-200 font-medium line-clamp-1 flex-grow break-all">
                                    {shortedAddress}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* Part2 */}
                        <div className="font-semibold text-gray-900 flex mt-2 items-center w-full ">
                            <div className="flex ">
                                <div className="flex border-none   p-2 rounded-r-md 
                              text-gray-200  px-4 text-base 
                              items-center ">

                                    {thisInserat.price} €  <div className="text-[10px] ml-1 mr-1" > / Tag</div>
                                       
                                </div>
                            </div>
                            <a className={cn(`ml-auto  gap-x-2 hover:underline  w-1/2 flex items-center dark:[#171923] dark:border-[#171923] 
                          shadow-lg
                        p-2 sm:pl-2 pl-0 rounded-l-md text-gray-300 
                         sm:truncate text-sm justify-center hover:cursor-pointer bg-indigo-800`, 
                        thisInserat?.color ? HighlightColorsBackground[thisInserat?.color] : "bg-indigo-800"
                        )}
                                target="_blank"
                                onClick={() => {
                                    changeOpenOnPageLoad(true)
                                    router.push(`/inserat/${thisInserat.id}`)
                                }}

                            >
                                <div className="flex flex-row px-2 items-center ">
                                    <div>
                                        <CalendarCheckIcon className="w-4 h-4 mr-2" />
                                    </div>
                                    <span className="sm:text-base text-xs">
                                        Verfügbarkeit prüfen
                                    </span>
                                </div>
                            </a>
                        </div>



                        <div className="h-full  rounded-b-md">
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
