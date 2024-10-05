'use client'


import {  CheckIcon, PinIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { format, getYear } from 'date-fns';



interface InitialFormCreationProps {
    currentValue : string;
    setCurrentValue : (value) => void;
}

const InitialFormCreation: React.FC<InitialFormCreationProps> = ({
    currentValue,
    setCurrentValue
}) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    interface YearObject {
        value: string;
        label: number;
      }
      
      const startYear = 2024;
    const endYear = 1900;

      const years: YearObject[] = [];
      
      for (let year = startYear; year >= endYear; year--) {
        years.push({ value: String(year), label: year });
      }

    

    function formatDateToMMYYYY(date : Date) {
        
        const month = date?.getMonth() + 1; 
        const year = date?.getFullYear();
    
        
        const dateString = `${month.toString().padStart(2, '0')}/${year}`;

        if(!date) {
            return "";
        }
        return dateString;
    }

    const router = useRouter();
  
    const params = useParams();

    

    const [validValue, setValidValue] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    
   



    
    
    


    return (
        <div className="items-center w-full">
        <div className="flex mt-4 w-full">
            <div className="items-center w-full">
                <Label className="flex justify-start items-center">
                    <PinIcon className="w-4 h-4" /> <p className="ml-2 font-semibold"> Baujahr </p>
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"

                            role="combobox"
                            aria-expanded={open}
                            className="w-1/2 mt-2 bg-[#191919] dark:border-none justify-between"
                        >
                            {currentValue
                                ? years.find((framework) => framework.value == currentValue)?.label
                                : "Beliebig"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-4 dark:bg-[#191919] ">
                        <Command className="dark:bg-[#191919] h-[320px] overflow-auto" 
                        onValueChange={(e) => {setCurrentValue(e as any)}}
                        
                        >
                            <CommandInput placeholder="Wähle das Baujahr" className="h-9 " />
                            <CommandEmpty>Kein passendes Jahr gefunden..</CommandEmpty>
                            <CommandGroup className="overflow-y-scroll">
                            <CommandItem
                                        key={"Beliebig"}
                                        value={"Beliebig"}
                                        onSelect={() => {
                                            setValue("");
                                            setCurrentValue(undefined)
                                            setOpen(false)
                                        }}
                                    >
                                        Beliebig
                            </CommandItem>
                                {years.map((year) => (
                                    <CommandItem
                                        key={year.value}
                                        value={year.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue);
                                            setCurrentValue(currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {year.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentValue === year.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
        
        
    </div>
    );
};
export default InitialFormCreation;