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
    CarFront, CarFrontIcon, CarIcon, CaravanIcon, CheckCheckIcon, CheckIcon, EyeIcon, FlameIcon, ImageIcon,
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
import { MdExpandMore } from "react-icons/md";
import { IoChevronUpOutline } from "react-icons/io5";
import { Label } from "@/components/ui/label";


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



    console.log(thisInserat?.images)




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


        <div className={cn(`md:w-[760px] sm:h-[370px] w-full h-full  items-center bg-[#1a1d28] mt-4 rounded-md
          border-[#171923]  pt-2 rounded-b-md`, thisInserat?.isHighlighted && "border-indigo-800 border-2 ",
            thisInserat?.color ? Colors[thisInserat?.color] : "border-blue-800",


        )}>




            <div className="sm:hidden block px-4 mt-2">
            <a
                className="hover:underline  font-semibold text-base  overflow-hidden w-12/12  sm:line-clamp-1 break-all"
                href={`/inserat/${thisInserat.id}`}
                target="_blank"
            >
                {thisInserat.title}
            </a>
            </div>
            <div className="flex justify-center h-[200px] items-center  w-full">
                <div className="flex p-4  w-full">

                    <div className="flex w-full">
                        <div className="sm:w-1/2 flex w-full relative">
                            <div className="w-full">
                                <img
                                    src={thisInserat?.images[0]?.url}
                                    style={{ objectFit: "cover" }}
                                    className="rounded-lg hover:cursor-pointer dark:border-gray-900 h-[160px] w-full"
                                    onClick={onRedirect}
                                    alt={thisInserat.title}
                                    loading="lazy"
                                />

                                {/* Image Counter in the Top-Right Corner */}
                                <div className="absolute font-semibold flex flex-row items-center top-2 right-2 bg-black bg-opacity-70 text-gray-200 text-xs px-2 py-1 rounded">
                                    <ImageIcon
                                        className="w-4 h-4 mr-2 text-gray-200/80"
                                    />
                                    (1/{thisInserat?.images?.length})
                                </div>
                            </div>
                        </div>

                        <div className="ml-4 text-gray-200/80 border-none flex-col  w-1/2 text-xs sm:mr-2 sm:flex hidden relative overflow-hidden">
                            <h3 className={cn("flex flex-row  font-semibold   text-lg hover:cursor-pointer  text-ellipsis  items-center w-full rounded-md ",)} >

                                <div className="w-full  mr-4 text-base font-bold h-[32px]  text-white  flex items-center ">

                                    <a
                                        className="hover:underline h-[24px] overflow-hidden w-12/12  sm:line-clamp-1 break-all"
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
                            <div className="line-clamp-6 whitespace-pre-wrap text-xs pr-2  mt-4">
                                {thisInserat.description}
                            </div>
                            {/* Optional "Read More" Link */}

                            <a href={`/inserat/${thisInserat?.id}`}
                                target="_blank"

                                className="text-indigo-600 cursor-pointer text-xs underline mt-2 flex flex-row items-center">
                                Mehr erfahren <MdExpandMore className="w-4 h-4 " />
                            </a>

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
                                    <CalendarCheckIcon className={cn(
                                        "w-4 h-4 mr-2 text-gray-200",
                                        (thisInserat?.isHighlighted && thisInserat?.color === "WHITE") && "text-gray-800"
                                    )} />
                                </div>
                                <span className={cn("sm:text-sm text-xs",
                                    (thisInserat?.isHighlighted && thisInserat?.color === "WHITE") && "text-gray-800"
                                )}>
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
