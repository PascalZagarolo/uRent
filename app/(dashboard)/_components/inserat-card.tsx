'use client'

import { convertState } from "@/actions/convert-states";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



import { cn } from "@/lib/utils";



import axios from "axios";
import { format } from "date-fns";
import {
    BookmarkIcon,
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

    // Get category display name
    const getCategoryName = () => {
        switch(thisInserat.category) {
            case 'TRUCK':
                return 'Lkw';
            case 'TRANSPORT':
                return 'Transporter';
            case 'CAR':
                return 'Pkw';
            case 'TRAILER':
                return 'Anhänger';
            default:
                return thisInserat.category;
        }
    };

    // Get category icon
    const getCategoryIcon = () => {
        switch(thisInserat.category) {
            case 'TRUCK':
                return <Truck className="w-3.5 h-3.5 mr-1.5" />;
            case 'TRANSPORT':
                return <PiVanFill className="w-3.5 h-3.5 mr-1.5" />;
            case 'CAR':
                return <FaCar className="w-3.5 h-3.5 mr-1.5" />;
            case 'TRAILER':
                return <TbCrane className="w-3.5 h-3.5 mr-1.5" />;
            case 'CARAVAN':
                return <RiCaravanLine className="w-3.5 h-3.5 mr-1.5" />;
            case 'TOOLS':
                return <BsTools className="w-3.5 h-3.5 mr-1.5" />;
            default:
                return <CarFrontIcon className="w-3.5 h-3.5 mr-1.5" />;
        }
    };

    //thisInserat?.color ? HighlightColorsBackground[thisInserat?.color]

    return (
        <div className={cn(`md:w-[760px] sm:h-[370px] w-full h-full bg-[#1a1d28] mb-4 rounded-md overflow-hidden shadow-lg`,
            thisInserat?.isHighlighted && "border-indigo-800 border-2",
            thisInserat?.color ? Colors[thisInserat?.color] : "border-blue-800",
        )}>
            {/* Mobile Title - Only visible on small screens */}
            <div className="sm:hidden block px-4 py-4">
                <a className="hover:underline font-semibold text-base overflow-hidden w-full line-clamp-1 break-all text-white"
                    href={`/inserat/${thisInserat.id}`}
                    target="_blank">
                    {thisInserat.title} 
                </a>
            </div>

            {/* Main Content Area */}
            <div className="flex w-full h-[200px]">
                {/* Image Container - Takes full width on mobile, half on larger screens */}
                <div className="sm:w-1/2 w-full h-full relative overflow-hidden">
                    <div className="absolute inset-0 w-full h-full">
                        <img
                            src={thisInserat?.images[0]?.url}
                            alt={thisInserat.title}
                            className="h-full w-full object-cover hover:cursor-pointer transform transition-transform duration-700 hover:scale-[1.03]"
                            style={{ 
                                objectPosition: 'center',
                                imageRendering: 'auto'
                            }}
                            onClick={onRedirect}
                            loading="eager"
                        />
                    </div>

                    {/* Subtle overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50 pointer-events-none"></div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 z-10">
                        <Badge className="bg-black opacity-80 backdrop-blur-sm text-white px-3 py-1 border border-indigo-500/30 flex items-center gap-0.5 font-medium shadow-md">
                            {getCategoryIcon()}
                            {getCategoryName()}
                        </Badge>
                    </div>

                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-gray-200" />
                        <span>{thisInserat?.images?.length}</span>
                    </div>

                    {/* New Badge */}
                    {!olderThan24Hours && (
                        <div className="absolute top-2 right-2">
                            <Badge className="bg-indigo-700 text-white gap-x-1 px-2 py-1">
                                Neu <FlameIcon className="w-3.5 h-3.5" />
                            </Badge>
                        </div>
                    )}
                </div>

                {/* Description Container - Hidden on mobile */}
                <div className="w-1/2 h-full p-4 border-l border-[#252838]/40 text-white sm:flex hidden flex-col justify-between">
                    <div className="flex flex-col h-full">
                        {/* Title and Favorite Section */}
                        <div className="flex justify-between items-start mb-2">
                            <a className="hover:underline font-semibold text-base line-clamp-1 mr-2"
                                href={`/inserat/${thisInserat.id}`}
                                target="_blank">
                                {thisInserat.title}
                            </a>
                            
                            {currentUser?.id !== thisInserat?.userId && (
                                <Button variant="ghost" onClick={onFav} className="p-0 h-8 w-8 rounded-full hover:bg-gray-800/40 flex-shrink-0">
                                    <BookmarkIcon className={cn("w-[18px] h-[18px]", isFaved ? "text-indigo-800 fill-indigo-800" : "text-gray-300")} />
                                </Button>
                            )}
                        </div>
                        
                        {/* Key Attributes */}
                       
                        
                        {/* Description Text - Shortened */}
                        <div className="line-clamp-5 text-xs text-gray-300/90 pr-1 overflow-hidden whitespace-pre-wrap mb-2">
                            {thisInserat.description}
                        </div>
                        
                        {/* Read More Link */}
                        <a href={`/inserat/${thisInserat?.id}`}
                            target="_blank"
                            className="text-indigo-400 hover:text-indigo-300 text-xs mt-auto flex items-center self-start">
                            Details ansehen <MdExpandMore className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="flex items-center p-2.5 pl-0 mx-4 mt-2 text-gray-200 text-sm 
                font-medium space-x-2 transition-transform  rounded-md backdrop-blur-sm">
                    {/* Icon Section */}
                    <div className="flex items-center justify-center">
                        <GrLocation className="w-4 h-4 text-rose-500" />
                    </div>

                    {/* Address Section */}
                    <div className="flex flex-col flex-grow">
                        <div className="flex items-center gap-x-2 text-sm w-full">
                            <span className="text-gray-100 flex-shrink-0">{thisInserat?.address?.postalCode}</span>
                            <span className="text-gray-400/70">|</span>
                            <span className="text-gray-100 line-clamp-1 flex-grow break-all">
                                {shortedAddress}</span>
                        </div>
                    </div>
                </div>

                <div>
                    {/* Part2 */}
                    <div className="font-semibold text-gray-900 flex mt-2 items-center w-full ">
                        <div className="flex ">
                            <div className="flex border-none p-2 rounded-r-md 
                              text-gray-200 px-4 text-base 
                              items-center ">
                                {thisInserat.price} €  <div className="text-[10px] ml-1 mr-1" > / Tag</div>
                            </div>
                        </div>
                        <a className={cn(`ml-auto gap-x-2 hover:underline w-1/2 flex items-center dark:[#171923] dark:border-[#171923] 
                          shadow-lg
                        p-2 sm:pl-2 pl-0 rounded-l-md text-gray-300 
                         sm:truncate text-sm justify-center hover:cursor-pointer`,
                         (thisInserat?.isHighlighted && thisInserat?.color) ? 
                           HighlightColorsBackground[thisInserat?.color] : 
                           "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600"
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
                                    (thisInserat?.isHighlighted && thisInserat?.color == "WHITE") && "text-gray-800"
                                )}>
                                    Verfügbarkeit prüfen
                                </span>
                            </div>
                        </a>
                    </div>

                    <div className="h-full rounded-b-md">
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
