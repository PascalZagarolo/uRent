'use client'


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Favourite, Images, Inserat, User } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { Edit3, Globe2Icon, SignpostBig, StarHalf, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FavouriteDashboardRenderProps {
    favourite: Favourite & { inserat: Inserat & { images: Images[], user: User } };
}

const FavouriteDashboardRender: React.FC<FavouriteDashboardRenderProps> = ({
    favourite
}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    

    const onDelete = () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/favourite/${favourite.id}`);
            setTimeout(() => {
                router.refresh();
            }, 500)
            toast.success("Aus Favouriten entfernt")
        } catch {
            toast.error("Fehler beim Löschen des Inserats")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full dark:bg-[#141414] p-4 mt-2 border dark:border-none rounded-md">
            <div className="flex">
            <div className="w-[200px] h-[100px] hover:cursor-pointer" onClick={() => {router.push(`/inserat/${favourite.inserat.id}`)}}>
                    {favourite?.inserat?.images?.length > 0 ? (
                        <Image
                            alt="Inserat-Bild"
                            src={favourite?.inserat?.images[0]?.url}
                            width={200}
                            height={100}
                            className="w-full h-full min-h-[100px] min-w-[200px] object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex justify-center items-center dark:bg-[#0F0F0F] text-xs">
                            keine Fotos vorhanden
                        </div>
                    )}
                </div>
                <div className="w-1/4 truncate ml-4 text-sm font-base mr-2">
                    {favourite?.inserat?.title}
                </div>
                <div className="w-1/6 h-[100px]">
                    <p className={cn("text-sm flex items-start h-[100px] overflow-hidden", favourite?.inserat.isPublished ? "text-emerald-600 font-semibold" : "text-gray-100/40")} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                         {favourite.inserat.description}
                    </p>
                </div>
                <div className="w-2/6 text-sm dark:text-gray-100/90 text-gray-700  font-semibold ml-4">
                    <div>
                        <div className="flex items-center">
                            <Image
                                src={favourite.inserat?.user?.image || "/placeholder-person.jpg"}
                                alt="Profilbild"
                                className="w-[30px] h-[30px] rounded-full object-cover mr-2"
                                width={40}
                                height={40}
                            />
                            <p className="ml-2">
                            {favourite.inserat.user.name}
                                </p>
                            
                        </div>

                    </div>
                </div>
                <div className="justify-center w-1/8  h-full gap-y-2">

                    
                            <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#252525] dark:text-gray-100 flex text-xs w-full" onClick={onDelete}>
                                <StarHalf className="w-4 h-4 mr-2 text-rose-600" />  Favourit entfernen
                            </Button>
                        
                </div>
            </div>
        </div>
    );
}

export default FavouriteDashboardRender;