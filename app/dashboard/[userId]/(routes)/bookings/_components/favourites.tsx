'use client'

import { Button } from "@/components/ui/button";
import { User, Purchase, Inserat, Images, Favourite } from "@prisma/client";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FavouritesProps {
    favourite : Favourite & { inserat : Inserat & { user : User, images : Images[] } };
}

const Favourites : React.FC<FavouritesProps> = ({
    favourite
}) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (inputDate: Date): string => {
        const day = ('0' + inputDate.getDate()).slice(-2);
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const year = inputDate.getFullYear();
      
        return `${day}.${month}.${year}`;
      };

      const formatPeriod = (inputDate: Date): string => {
        const day = ('0' + inputDate.getDate()).slice(-2);
        const month = ('0' + (inputDate.getMonth() + 1)).slice(-2);
        const year = inputDate.getFullYear();
      
        return `${day}.${month}`;
      };

      const onClick = () => {
        try {
            setIsLoading(true);
            axios.delete(`/api/favourite/${favourite.id}`);
            setTimeout(() => {
                router.refresh();
            }, 1000)
        } catch {
            toast.error("Fehler beim Entfernen des Favouriten")
        } finally {
            setIsLoading(false);
        }
      }

    return ( 

        <div className="mt-4 2xl:mr-8">
            <div className="flex justify-end">
                <Button className="flex justify-end bg-rose-600 hover:bg-rose-500 border-2 border-rose-900" onClick={onClick}>
                <Trash2Icon className="h-4 w-4 mr-2"/>   Als Favourit entfernen 
                </Button>
            </div>
            <div className="flex gap-x-2  border-white border-2  rounded-md p-4 bg-white text-black drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <div className="w-[160px] font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.1)]">
                <p>{favourite.inserat.title}</p>
            </div>
            <div className="w-[80px] ">
                <p>{favourite.inserat.user.name}</p>
            </div>
            <div className="w-[240px] flex justify-center">
                <p className="mr-2">{formatPeriod(favourite.inserat.begin)}</p>
                -
                <p className="ml-2">{formatDate(favourite.inserat.end)}</p>
            </div>
            <div className="w-[180px] h-[100px] flex justify-center items-center">
                <Image
                src={favourite.inserat.images[0].url}
                height={100}
                width={180}
                alt="Picture of the Inserat"
                className="rounded-md border-2 border-gray-300"
                />
            </div>
            
        </div>
        </div>
     );
}
 
export default Favourites;