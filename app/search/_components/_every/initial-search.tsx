'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useSavedSearchParams } from "@/store";
import { useSearchParams } from "next/navigation";
import { getYear } from "date-fns";
import { CalendarIcon } from "lucide-react";

const InitialSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentYear, setCurrentYear] = useState<any>(currentObject["initial"] ? getYear(new Date(currentObject["initial"])) : undefined);
    const [currentYearEnd, setCurrentYearEnd] = useState<any>(currentObject["initialMax"] ? getYear(new Date(currentObject["initialMax"])) : undefined);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [value, setValue] = useState("");
    const [valueEnd, setValueEnd] = useState("");

    const startYear = 2024;
    const endYear = 1960;

    const pSearchparams = useSearchParams();
    const existingYear = pSearchparams.get("initial");
    const existingYearEnd = pSearchparams.get("initialMax");
    
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        if(currentYear) {
            const usedDate = new Date(Number(currentYear), 0, 1); 
            changeSearchParams("initial", usedDate?.toISOString());
        } else {
            deleteSearchParams("initial");
        }
    },[currentYear]);

    useEffect(() => {
        if(currentYearEnd) {
            const usedDate = new Date(Number(currentYearEnd), 0, 1); 
            changeSearchParams("initialMax", usedDate?.toISOString());
        } else {
            deleteSearchParams("initialMax");
        }
    },[currentYearEnd]);

    useEffect(() => {
        if(existingYear || currentObject["initial"]) {
            changeSearchParams("initial", currentObject["initial"]);
            const usedDate = new Date(currentObject["initial"]);
            const resolvedYear = String(getYear(usedDate));
            
            setCurrentYear(Number(resolvedYear));
        }

        if(existingYearEnd || currentObject["initialMax"]) {
            changeSearchParams("initialMax", currentObject["initialMax"]);
            const usedDate = new Date(currentObject["initialMax"]);
            const resolvedYear = String(getYear(usedDate));
            
            setCurrentYearEnd(Number(resolvedYear));
        }
    },[]);
    
    interface YearObject {
      value: string;
      label: number;
    }
    
    const years: YearObject[] = [];
    
    for (let year = startYear; year >= endYear; year--) {
      years.push({ value: String(year), label: year });
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <CalendarIcon className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Baujahr</h3>
            </div>
            
            <div className="w-full flex items-center gap-x-2">
                <div className="w-1/2 group">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                    "w-full justify-between h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                    !currentYear && "text-gray-500"
                                )}
                            >
                                {currentYear
                                    ? years.find((framework) => framework.value == currentYear)?.label
                                    : "Von"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-4 bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <Command className="bg-[#1e1e2a] h-[320px] overflow-auto" 
                                onValueChange={(e) => {setCurrentYear(e)}}
                            >
                                <CommandInput placeholder="Wähle das Baujahr" className="h-9" />
                                <CommandEmpty className="text-gray-300">Kein passendes Jahr gefunden..</CommandEmpty>
                                <CommandGroup className="overflow-y-scroll">
                                    <CommandItem
                                        key={"Beliebig"}
                                        value={"Beliebig"}
                                        className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                        onSelect={() => {
                                            setValue("");
                                            setCurrentYear(undefined);
                                            setOpen(false);
                                        }}
                                    >
                                        Beliebig
                                    </CommandItem>
                                    {years.map((year) => (
                                        <CommandItem
                                            key={year.value}
                                            value={year.value}
                                            className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue);
                                                setCurrentYear(currentValue);
                                                setOpen(false);
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
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentYear ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className="w-1/2 group">
                    <Popover open={open2} onOpenChange={setOpen2}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open2}
                                className={cn(
                                    "w-full justify-between h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                    !currentYearEnd && "text-gray-500"
                                )}
                            >
                                {currentYearEnd
                                    ? years.find((framework) => framework.value == currentYearEnd)?.label
                                    : "Bis"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-4 bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <Command className="bg-[#1e1e2a] h-[320px] overflow-auto" 
                                onValueChange={(e) => {setCurrentYearEnd(e)}}
                            >
                                <CommandInput placeholder="Wähle das Baujahr" className="h-9" />
                                <CommandEmpty className="text-gray-300">Kein passendes Jahr gefunden..</CommandEmpty>
                                <CommandGroup className="overflow-y-scroll">
                                    <CommandItem
                                        key={"Beliebig"}
                                        value={"Beliebig"}
                                        className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                        onSelect={() => {
                                            setValueEnd("");
                                            setCurrentYearEnd(undefined);
                                            setOpen2(false);
                                        }}
                                    >
                                        Beliebig
                                    </CommandItem>
                                    {years.map((year) => (
                                        <CommandItem
                                            key={year.value}
                                            value={year.value}
                                            className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                            onSelect={(currentValue) => {
                                                setValueEnd(currentValue === value ? "" : currentValue);
                                                setCurrentYearEnd(currentValue);
                                                setOpen2(false);
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
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentYearEnd ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
};
export default InitialSearch;