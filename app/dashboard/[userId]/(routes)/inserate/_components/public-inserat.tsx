'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { inserat } from "@/db/schema";

import { cn } from "@/lib/utils";

import axios from "axios";

import { Clock1, EyeIcon, LockKeyhole, Settings, UnlockKeyhole,  } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratPublicProps {
    thisInserat: typeof inserat.$inferSelect ;
    profileId: string,



}

const InseratPublic: React.FC<InseratPublicProps> = ({
    thisInserat,
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

    const onLock = () => {
        try {
            setIsLoading(true);
            axios.patch(`/api/inserat/${thisInserat.id}/publish`, { publish: false });
            toast.success("Anzeige privat gestellt");
            setTimeout(() => {
                router.refresh();
            }, 250)

        } catch {
            toast.error("Etwas ist schief gelaufen")
        }
    }

    const onRedirect = () => {
        router.push(`/inserat/${thisInserat.id}`)
    }

    return (
        
        
        <div className="w-full rounded-lg  p-2">
            <div className="h-[40px] flex bg-[#12141d] dark:bg-[#07080c] rounded-md">
                <div className="w-full ">
                <Button className=" bg-[#ed580dec] dark:bg-gray-900 dark:hover:bg-gray-800
                 dark:text-gray-100 hover:bg-[#ed580dec]/60 w-full flex justify-center text-xs rounded-none"  
                 onClick={() => { router.push(`/inserat/create/${thisInserat.id}`) }}>
                    <Settings className="w-4 h-4 mr-2" /> <div className="hidden 2xl:flex">Inserat verwalten </div>
                </Button>
                </div>
                <div className="ml-auto ">
                    <Button className="bg-[#12141d]  dark:bg-black dark:hover:bg-gray-800 dark:text-gray-100 rounded-none"
                    onClick={onLock}
                    >
                        {thisInserat.isPublished ? <UnlockKeyhole className="w-4 h-4" /> : <LockKeyhole className="w-4 h-4" />}
                    </Button>
                    
                </div>
            </div>
        <div className=" rounded-none    bg-[#24293b] dark:bg-[#0f1119] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] flex flex-col items-center
        flex-shrink: 1">
            
            <div className="bg-[#171a26] p-1  w-full mb-1 rounded-md  items-center dark:bg-[#0a0b10]">
                <h3 className="items-center  text-base font-semibold justify-center text-gray-100 flex mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] mb-1">
                    
                    {thisInserat.title}</h3>
            </div>
            <h3 className="text-xs text-gray-100">
                zuletzt aktualisiert am : {formatDate(thisInserat.updatedAt)}
            </h3>
            <div className="flex-shrink: 1 flex mt-1">
                <div className="flex ml-auto w-full mr-4 ">
                    <Badge className={cn("border-2 border-black bg-sky-600")}>
                        {thisInserat.category}
                    </Badge>
                </div>
                <div className="flex ml-auto w-full ">
                    <Badge className={cn("border-2 border-black", thisInserat.isPublished ? "bg-rose-600" : "bg-emerald-600")}>
                        {thisInserat.isPublished ? "Belegt" : "Frei"}
                    </Badge>
                </div>

            </div>
           
                <div className="flex justify-center items-center  h-[160px]" >
                    <Image
                        width={160}
                        height={160}
                        src={thisInserat.images[0].url}
                        className="rounded-md border-2 border-gray-200 mt-2 max-h-[200px] hover:cursor-pointer"
                        alt="Car-Vorschau"
                        onClick={onRedirect}
                    />
                </div>
            
            
            <div className="flex justify-start text-gray-100 items-center mb-4">
                <Clock1 className="h-4 w-4 mr-2"/>erstellt am : {formatDate(thisInserat.createdAt)}
            </div>

            <div className="flex w-full justify-center mt-auto bg-gray-300 rounded-md p-2 font-semibold 
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] dark:bg-[#0a0b10] items-center">
                <EyeIcon className="mr-2 w-4 h-4"/> {thisInserat.views} Ansichten
            </div>
            
        </div>
        
        </div>
        

    );
}

export default InseratPublic;
