'use client'



import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";


import { Separator } from "@/components/ui/separator";
import { MdDateRange } from "react-icons/md";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useSavedSearchParams } from "@/store";
import { useSearchParams } from "next/navigation";
import { getYear } from "date-fns";



const SetInitialSearch = () => {


    const [currentYear, setCurrentYear] = useState("");
    const [currentYearEnd, setCurrentYearEnd] = useState("");
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [value, setValue] = useState("")
    const [valueEnd, setValueEnd] = useState("")

    const startYear = 2025;
    const endYear = 1960;

    const pSearchparams = useSearchParams();
    const existingYear = pSearchparams.get("initial")
    const existingYearEnd = pSearchparams.get("initialMax")

    
  
    const { changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        if(currentYear) {
            const usedDate = new Date(Number(currentYear), 0, 1); 
            changeSearchParams("initial", usedDate?.toISOString())
        } else {
            deleteSearchParams("initial")
        }
    },[currentYear])

    useEffect(() => {
        if(currentYearEnd) {
            const usedDate = new Date(Number(currentYearEnd), 11, 31); 
            changeSearchParams("initialMax", usedDate?.toISOString())
        } else {
            deleteSearchParams("initialMax")
        }
    },[currentYearEnd])

    useEffect(() => {
        if(existingYear) {
            changeSearchParams("initial", existingYear)
            const usedDate = new Date(existingYear);
            const resolvedYear = String(getYear(usedDate));
            
            setCurrentYear(resolvedYear)
        } else {
            deleteSearchParams("initial");
        }

        if(existingYearEnd) {
            changeSearchParams("initialMax", existingYearEnd)
            const usedDate = new Date(existingYearEnd);
            const resolvedYear = String(getYear(usedDate));
            
            setCurrentYearEnd(resolvedYear)
        } else {
            deleteSearchParams("initialMax");
        }

    },[])
    
    interface YearObject {
      value: string;
      label: number;
    }
    
    const years: YearObject[] = [];
    
    for (let year = startYear; year >= endYear; year--) {
      years.push({ value: String(year), label: year });
    }

    return (
        <div className="items-center w-full">

            <h3 className="flex justify-center text-md items-center font-semibold text-gray-200">
                Baujahr 
            </h3>

            <div className="mt-4 w-full gap-x-4">
                <Label className="flex items-center">
                    {/*
                    <MdDateRange className="w-4 h-4 mr-2" />    Baujahr wählen
                    */}
                    
                </Label>
                <div className="flex items-center gap-x-2">
                    <div className="w-1/2">
                    <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"

                            role="combobox"
                            aria-expanded={open}
                            className="w-full mt-4 bg-[#191919] dark:border-none justify-between"
                        >
                            {currentYear
                                ? years.find((framework) => framework.value == currentYear)?.label
                                : "Von"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-4 dark:bg-[#191919] ">
                        <Command className="dark:bg-[#191919] h-[320px] overflow-auto" 
                        onValueChange={(e) => {setCurrentYear(e)}}
                        
                        >
                            <CommandInput placeholder="Wähle das Baujahr" className="h-9 " />
                            <CommandEmpty>Kein passendes Jahr gefunden..</CommandEmpty>
                            <CommandGroup className="overflow-y-scroll">
                            <CommandItem
                                        key={"Beliebig"}
                                        value={"Beliebig"}
                                        onSelect={() => {
                                            setValue("");
                                            setCurrentYear(undefined)
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
                                            setCurrentYear(currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {year.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentYear === year.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                    </div>
                    <div className="w-1/2">
                    <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"

                            role="combobox"
                            aria-expanded={open2}
                            className="w-full mt-4 bg-[#191919] dark:border-none justify-between"
                        >
                            {currentYearEnd
                                ? years.find((framework) => framework.value == currentYearEnd)?.label
                                : "Bis"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-4 dark:bg-[#191919] ">
                        <Command className="dark:bg-[#191919] h-[320px] overflow-auto" 
                        onValueChange={(e) => {setCurrentYearEnd(e)}}
                        
                        >
                            <CommandInput placeholder="Wähle das Baujahr" className="h-9 " />
                            <CommandEmpty>Kein passendes Jahr gefunden..</CommandEmpty>
                            <CommandGroup className="overflow-y-scroll">
                            <CommandItem
                                        key={"Beliebig"}
                                        value={"Beliebig"}
                                        onSelect={() => {
                                            setValueEnd("");
                                            setCurrentYearEnd(undefined)
                                            setOpen2(false)
                                        }}
                                    >
                                        Beliebig
                            </CommandItem>
                                {years.map((year) => (
                                    <CommandItem
                                        key={year.value}
                                        value={year.value}
                                        onSelect={(currentValue) => {
                                            setValueEnd(currentValue === valueEnd ? "" : currentValue);
                                            setCurrentYearEnd(currentValue)
                                            setOpen2(false)
                                        }}
                                    >
                                        {year.label}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                currentYearEnd === year.value ? "opacity-100" : "opacity-0"
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


            
        </div>
    );
};
export default SetInitialSearch;