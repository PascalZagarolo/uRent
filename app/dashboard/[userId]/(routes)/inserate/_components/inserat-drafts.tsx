'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { Images, Inserat, User } from "@prisma/client";
import axios from "axios";

import { AlignCenter, Banknote, CalendarCheck2, CarFront, Check, Clock1, LocateFixedIcon, MapPinIcon, PencilRuler, Settings, Settings2, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratDraftsProps {
    inserat: Inserat & { images: Images[]; user: User };
    profileId: string,



}

const InseratDrafts: React.FC<InseratDraftsProps> = ({
    inserat,
    profileId,


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
        <div className="w-1/6 rounded-md border-2 border-[#000000] h-[320px] bg-[#24293b] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] flex flex-col items-center
        flex-shrink: 1">
            <h3>
                <AlignCenter className="h-4 w-4"/>
            </h3>
            <div className="bg-[#171a26] p-1  w-full mb-1 rounded-md border border-black items-center">
                <h3 className="items-center  text-base font-semibold justify-center text-gray-100 flex mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] mb-1">
                    
                    {inserat.title}</h3>
            </div>
            <h3 className="text-xs text-gray-100">
                zuletzt aktualisiert am : {formatDate(inserat.updatedAt)}
            </h3>
            <div className="flex-shrink: 1 flex mt-1">
                <div className="flex ml-auto w-full mr-4 ">
                    <Badge className={cn("border-2 border-black bg-sky-600")}>
                        {inserat.category}
                    </Badge>
                </div>
                <div className="flex ml-auto w-full ">
                    <Badge className={cn("border border-black", inserat.isPublished ? "bg-emerald-600" : "bg-sky-400")}>
                        {inserat.isPublished ? "Veröffentlicht" : "Entwurf"}
                    </Badge>
                </div>

            </div>
           
                <div className="flex justify-center items-center  h-[200px]" >
                    <Image
                        width={200}
                        height={200}
                        src={inserat.images[0].url}
                        className="rounded-md border-2 border-gray-200 mt-2 "
                        alt="Car-Vorschau"
                    />
                </div>
            
            
            <div className="flex justify-start text-gray-100 items-center">
                <Clock1 className="h-4 w-4 mr-2"/>erstellt am : {formatDate(inserat.createdAt)}
            </div>

            <div className="flex w-full justify-center mt-auto">
                
                <Button className="w-full bg-[#ed580dec] hover:bg-[#ed580dec]/60 flex justify-center"  onClick={() => { router.push(`/inserat/create/${inserat.id}`) }}>
                    <Settings className="w-4 h-4 mr-2" /> Anzeige verwalten
                </Button>
            </div>
        </div>


    );
}

export default InseratDrafts;
