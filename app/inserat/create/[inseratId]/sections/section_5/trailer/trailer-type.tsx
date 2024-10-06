'use client';

import { Button } from "@/components/ui/button";
import { BsTruckFlatbed } from "react-icons/bs";
import { FaTrailer } from "react-icons/fa";
import { AiOutlineAlignLeft } from "react-icons/ai";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import { cn } from "@/lib/utils";
import { RiCaravanLine } from "react-icons/ri";
import { TrailerEnumRender } from "@/db/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TrailerTypeProps {
    currentValue : string;
    setCurrentValue : (value) => void;
}

const TrailerTypeCreation: React.FC<TrailerTypeProps> = ({
    currentValue,
    setCurrentValue
}) => {

    const [isLoading, setIsLoading] = useState(false)


   
    return (
        <div className="w-full">
        <div className="w-full">
            <Label>Anhängertyp</Label>
            <Select
            //@ts-ignore
                onValueChange={(extraType: typeof ExtraTypeEnumRender) => {
                    setCurrentValue(extraType);
                }}
                disabled={isLoading}
                //@ts-ignore
                value={currentValue}
            >

                <SelectTrigger className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md "
                    disabled={isLoading}  >
                    <SelectValue
                        placeholder="Wähle die Kategorie aus"


                    />
                </SelectTrigger>

                <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                <SelectItem value={null} className="font-bold">Beliebig</SelectItem>
                    <SelectItem value="SATTEL">Auflieger</SelectItem>
                    <SelectItem value="ANHAENGER">Anhänger</SelectItem>
                    <SelectItem value="KLEIN">Kleinanhänger</SelectItem>
                    <SelectItem value="VERANSTALTUNG">Freizeit & Veranstaltung</SelectItem>
                     
                </SelectContent>
            </Select>
        </div>
    </div>
    );
}

export default TrailerTypeCreation;