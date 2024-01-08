'use client'

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Images, Inserat, User } from "@prisma/client";
import axios from "axios";
import { Banknote, CalendarCheck2, CarFront, LocateFixedIcon, MapPinIcon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratCardProps {
    inserat: Inserat & { images : Images[], user : User },
    profileId : string,
    isFaved : boolean
}

const InseratCard: React.FC<InseratCardProps> = ({
    inserat,
    profileId,
    isFaved
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
            axios.patch(`/api/profile/${profileId}/favourites`, {inseratId : inserat.id})
            
            setTimeout(() => {
                router.refresh();
            },1000)
        } catch {
            toast.error("Fehler beim Favorisieren der Anzeige")
        } finally{
            setIsLoading(false);
        }
      }

    return (
        <div className="w-[400px] h-[320px]  border-black rounded-md">
            <h3 className="flex justify-stretch font-semibold mt-1 ml-2 text-lg">
                <CarFront className="" /> <p className="flex ml-4 font-bold text-[#434b70] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.4)]"> {inserat.title} </p>
                <div className="ml-auto items-center flex mr-4">
                <p className="font-bold text-gray-800/50 italic text-xs">23.10.23</p>
                <p className="ml-4">
                    <Button variant="ghost" onClick={onFav}>
                    <Star className={cn(isFaved ? "text-yellow-300" : "text-black")}/>
                    </Button>
                    </p>
                </div>  
                
            </h3>
            <Separator
            className="w-8 bg-black rounded-lg ml-2 mt-2"
            />
            <div className="flex justify-center mt-4">
                <Image
                src={inserat.images[0].url}
                height={200}
                width={300}
                alt = "Car-Vorschau"
                className="rounded-md border mb-2 border-black"
                />
            </div>

            <div className="ml-2 mt-2">
                <Separator
                className=" mt-2 w-16 bg-black"
                />
                <div className="flex mt-2">
                    <p className="text-gray-900/80 font-bold mr-4 flex">
                      <CalendarCheck2 className="mr-2"/>  Zeitraum : 
                    </p>
                    <p className="font-semibold text-[#434b70]">
                        {formatDate(inserat.begin)}
                    </p>
                    <p className="font-bold text-black-800 mr-2 ml-2">
                        -
                    </p>
                    <p className="font-bold text-[#434b70]">
                    {formatDate(inserat.end)}
                    </p>
                </div>

                <div className="font-semibold text-gray-900 flex mt-2 items-center">
                    <p className="mr-2 flex font-bold">
                        <Banknote
                        className="mr-2"/>
                        Preis : 
                    </p>
                    {inserat.price} €
                    <div className="ml-auto mr-4 flex items-center">
                        <MapPinIcon className="text-rose-600 mr-2"/> Mömer <p className="text-gray-800/50 text-xs ml-2">(187 Km)</p>
                    </div>
                </div>
            </div>
            <div className="mt-4">

            <div className="rounded-md bg-[#6e7ab3]">
                <div className="flex mt-4 items-center border border-black rounded-md ">
                    <Image
                    className="rounded-full ml-2 mt-2 mb-2 border border-[#555e89] "
                    src={inserat.user.image}
                    height={40}
                    width={40}
                    alt="User-Bild"
                    />
                    <Link href={`/profile/${inserat.userId}`}>
                    <p className="ml-4 font-semibold text-gray-900">
                        {inserat.user.name}
                    </p>
                    </Link>
                    
                    <div className="ml-auto mr-2">
                        <Button className="bg-[#505881]  border border-white  font-semibold">
                            Besichtigen
                        </Button>
                    </div>
                </div>
            </div> 
            </div>
            

            
        </div>
    );
}

export default InseratCard;