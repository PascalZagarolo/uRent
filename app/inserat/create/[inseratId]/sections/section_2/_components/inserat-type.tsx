'use client';

import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { inserat } from "@/db/schema";

import { AlertCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface InseratTypeProps {
    thisInserat: typeof inserat.$inferSelect;
    isMulti : boolean | string;
    setIsMulti : (value : boolean | string) => void;
}

const InseratType: React.FC<InseratTypeProps> = ({ thisInserat, isMulti, setIsMulti }) => {
    const formSchema = z.object({
        multi: z.boolean({
            required_error: "Bitte wähle eine Kategorie aus"
        })
    });

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    

    

   

    return (
        <div className="flex w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center">
                    <BiSolidCategory className="w-4 h-4 mr-2" />
                    <p className="ml-2 font-semibold">Art des Inserats *</p>
                        <Popover>
                            <PopoverTrigger>
                                <AlertCircle className="w-4 h-4 ml-2" />
                            </PopoverTrigger>
                            <PopoverContent className="dark:bg-[#191919] border-none w-[200px] text-xs p-4">
                                Falls du mehrere identische Fahrzeuge dieser Art hast, wähle &quot;Flotte&quot;,
                                falls du nur ein Fahrzeug dieser Art hast, wähle &quot;Einzel&quot;.
                            </PopoverContent>
                        </Popover>
                   
                </Label>
                <p className=" text-gray-800/50 text-xs dark:text-gray-200/60">
                    Hast du mehrere identische Fahrzeuge ?
                </p>
                <Select
                    onValueChange={(selectedValue: string) => {
                        setIsMulti(selectedValue);
                    }}
                    defaultValue={String(isMulti)}
                    disabled={isLoading}
                >
                    <SelectTrigger
                        className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md"
                        disabled={isLoading}
                    >
                        <SelectValue placeholder="Wähle die Kategorie aus" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#000000] border-white dark:border-none w-full">
                        <SelectItem value="false">Einzel</SelectItem>
                        <SelectItem value="true">Flotte</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default InseratType;
