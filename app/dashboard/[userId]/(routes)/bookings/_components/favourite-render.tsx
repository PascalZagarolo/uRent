'use client'


import { Button } from "@/components/ui/button";
import { favourite } from "@/db/schema";
import { cn } from "@/lib/utils";
import axios from "axios";
import { StarHalf } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FavouriteDashboardRenderProps {
    thisFavourite: typeof favourite.$inferSelect | any;
}

const FavouriteDashboardRender: React.FC<FavouriteDashboardRenderProps> = ({
    thisFavourite
}) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    

    const onDelete = () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/favourite/${thisFavourite.id}`);
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
        <div className="w-full dark:bg-[#141414] sm:p-4 p-2 mt-2 border dark:border-none rounded-md">
            <div className="flex">
            <a className="w-1/4 h-[100px] hover:cursor-pointer" 
            target="_blank"
            href={`/inserat/${thisFavourite?.inseratId}`}
            >
                    {//@ts-ignore
                    thisFavourite?.inserat?.images?.length > 0 ? (
                        <Image
                            alt="Inserat-Bild"
                            //@ts-ignore
                            src={thisFavourite?.inserat?.images[0]?.url}
                            width={200}
                            height={100}
                            className="w-full h-full min-h-[100px] min-w-1/4 object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex justify-center items-center dark:bg-[#0F0F0F] text-xs">
                            keine Fotos vorhanden
                        </div>
                    )}
                </a>
                <a className="w-1/4 line-clamp-3 break-all ml-4 text-sm font-base mr-2 h-full hover:cursor-pointer hover:underline"
                target="_blank"
                href={`/inserat/${thisFavourite?.inseratId}`}

                >
                    {//@ts-ignore
                    thisFavourite?.inserat?.title} 
                </a>
                <div className="sm:w-1/6 sm:block hidden h-[100px]">
                    <p className={cn("text-sm flex items-start h-[100px] overflow-hidden", //@ts-ignore
                    thisFavourite[0]?.inserat.isPublished ? 
                    "text-emerald-600 font-semibold" : "text-gray-100/40")} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                      {//@ts-ignore   
                         thisFavourite.inserat.description}
                    </p>
                </div>
                <div className="md:w-2/6 w-1/6 text-sm dark:text-gray-100/90 text-gray-700  font-semibold ml-4">
                    <div>
                        <div className="flex items-center">
                            <Image
                                src={//@ts-ignore   
                                    thisFavourite?.inserat?.user?.image || "/placeholder-person.jpg"}
                                alt="Profilbild"
                                className="w-[30px] h-[30px] rounded-full object-cover mr-2"
                                width={40}
                                height={40}
                            />
                            <a className="ml-2 md:block hidden hover:underline hover:cursor-pointer"
                            target="_blank"
                            href={`/profile/${thisFavourite?.inserat?.user?.id}`}
                            >
                            {//@ts-ignore   
                            thisFavourite?.inserat.user.name}
                                </a>
                            
                        </div>

                    </div>
                </div>
                <div className="justify-center w-1/8  h-full gap-y-2">

                    
                            <Button className="dark:bg-[#1C1C1C] dark:hover:bg-[#252525] dark:text-gray-100 flex text-xs w-full" onClick={onDelete}>
                                <StarHalf className="w-4 h-4 md:mr-2 text-rose-600" />  <p className="md:block hidden">Favourit entfernen</p>
                            </Button>
                        
                </div>
            </div>
        </div>
    );
}

export default FavouriteDashboardRender;