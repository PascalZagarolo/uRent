'use client';


import { BiSolidCategory } from "react-icons/bi";

import { z } from "zod";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";


import { inserat } from "@/db/schema";

import { AlertCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface InseratTypeProps {
    thisInserat: typeof inserat.$inferSelect;
    isMulti : string;
    setIsMulti : (value : string) => void;
}

const InseratType: React.FC<InseratTypeProps> = ({ isMulti, setIsMulti }) => {
    

   
   
    

    

   

    return (
        <div className="flex w-full">
            <div className="w-full">
                <Label className="flex justify-start items-center">
                    <BiSolidCategory className="w-4 h-4 mr-2" />
                    <p className="ml-2 font-semibold">Art des Inserats * {isMulti}</p>
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
                    onValueChange={(selectedValue) => {
                        
                        setIsMulti(selectedValue);
                    }}
                    value={String(isMulti)}
                    
                >
                    <SelectTrigger
                        className="dark:bg-[#151515] dark:border-gray-200 dark:border-none focus-visible:ring-0 mt-2 rounded-md"
                       
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
