'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { inserat } from "@/db/schema";

import { cn } from "@/lib/utils";
import axios from "axios";

import {  CarFront, Settings, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface InseratDraftsProps {
    thisInserat: typeof inserat.$inferSelect;
    profileId: string,



}

const InseratDrafts: React.FC<InseratDraftsProps> = ({
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

    const onRedirect = () => {
        router.push(`/inserat/${thisInserat.id}`)
    }

    const isPublishable = (thisInserat.title && thisInserat.description && thisInserat.price && thisInserat.category &&
         thisInserat.begin && thisInserat.end && thisInserat.images.length > 0) ? true : false;

    return (



        <div className="w-full rounded-md  border-gray-300  mt-2 bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] p-8 dark:bg-[#07080c]">
            <div className="">
                <h3 className="flex justify-start font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)] text-lg">
                    <p>
                        <CarFront className="mr-2" />
                    </p>
                    {thisInserat.title}
                    <p className="ml-auto font-medium italic text-sm text-gray-900/50 dark:text-gray-100">
                        {formatDate(thisInserat.createdAt)}
                    </p>
                </h3>
            </div>
            <div className="flex">
                <Badge className={cn("text-white text-xs mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)] border-gray-300 border-2",
                    isPublishable ? "bg-emerald-600" : "bg-gray-400")}>
                    {isPublishable ? ("zur veröffentlichung bereit") : ("nicht zur veröffentlichung bereit")}
                </Badge>

            </div>
            <div className="h-[180px] mr-2 ml-2 border-2 mt-2">
                {thisInserat.images.length > 0 ? (
                    <img
                        src={thisInserat.images[0].url}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        alt="Inserat Image"
                    />
                ) : (
                    <div className="bg-gray-200   h-full flex justify-center items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.12)]">
                        <p className="text-gray-700 font-semibold italic">Keine Bilder vorhanden</p>
                    </div>
                )}
            </div>
            <div className="w-full mt-3 ">
                <div className="">
                    <Button className="bg-white border-2 border-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] w-3/4 text-gray-900 text-sm hover:bg-gray-200" 
                    onClick={() => { router.push(`/inserat/create/${thisInserat.id}`) }}>
                        <Settings className="w-4 h-4 mr-2 text-gray-800" /> Inserat verwalten
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-rose-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] w-1/4 hover:bg-rose-500">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>






    );
}

export default InseratDrafts;
