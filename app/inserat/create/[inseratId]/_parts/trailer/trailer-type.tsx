'use client';

import { Button } from "@/components/ui/button";
import { BsTruckFlatbed } from "react-icons/bs";
import { FaTrailer } from "react-icons/fa";
import { AiOutlineAlignLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { TrailerType } from "@prisma/client";
import { cn } from "@/lib/utils";

interface TrailerTypeProps {
    trailerType : TrailerType;
}

const TrailerTypeCreation: React.FC<TrailerTypeProps> = ({
    trailerType
}) => {

    const params = useParams();
    const router = useRouter();

    const onSelect = (type : string) => {
        try {
            const values = {
                type : type
            }

            axios.patch(`/api/inserat/${params.inseratId}/trailer`, values);
            router.refresh();

        } catch {
            toast.error("Fehler beim Anhängertyp");
        }
    }

    return (
        <div className="w-full">
            <h3 className="font-semibold">
                Anhängertyp
            </h3>
            <div className="w-full flex justify-evenly">
            <div className="flex flex-col items-center">
                <Button 
                className={cn("dark:bg-[#0E0E0E] dark:hover:bg-[#212121] border-2 dark:border-[#0E0E0E] py-6 dark:text-gray-100", 
                trailerType === "SATTEL" && "border-2 dark:border-blue-800 border-blue-800")} 
                onClick={() => {onSelect("SATTEL")}}>
                    <BsTruckFlatbed className="h-6 w-6" />
                </Button>
                <p className={cn("text-center text-sm mt-1", trailerType === "SATTEL" && "font-semibold")}>Sattelzug</p>
            </div>

            <div className="flex flex-col items-center">
                <Button 
                className={cn("dark:bg-[#0E0E0E] dark:hover:bg-[#212121] border-2 dark:border-[#0E0E0E] py-6 dark:text-gray-100", 
                trailerType === "KLEIN" && "border-2 dark:border-blue-800 border-blue-800")}
                onClick={() => {onSelect("KLEIN")}}
                >
                    <FaTrailer  className="h-6 w-6" />
                </Button>
                <p className={cn("text-center text-sm mt-1", trailerType === "KLEIN" && "font-semibold")}>Kleinanhänger</p>
            </div>

            <div className="flex flex-col items-center">
                <Button 
                className={cn("dark:bg-[#0E0E0E] dark:hover:bg-[#212121] dark:border-2 dark:border-[#0E0E0E] py-6 dark:text-gray-100", 
                !trailerType && "border-2 dark:border-blue-800 border-blue-800")}
                onClick={() => {onSelect(null)}}
                >
                    <AiOutlineAlignLeft className="h-6 w-6" />
                </Button>
                <p className={cn("text-center text-sm mt-1", !trailerType && "font-semibold")}>Sonstiges</p>
            </div>
        </div>
        </div>
    );
}

export default TrailerTypeCreation;