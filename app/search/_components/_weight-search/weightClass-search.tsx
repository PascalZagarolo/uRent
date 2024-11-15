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
import { Input } from "@/components/ui/input";



const WeightClassSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams)

    const [currentWeight, setCurrentWeight] = useState<any>(currentObject["weightClass"] ? currentObject["weightClass"] : undefined);
    const [currentWeightEnd, setCurrentWeightEnd] = useState<any>(currentObject["weightClassMax"] ? currentObject["weightClassMax"] : undefined);

    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [value, setValue] = useState("");
    const [valueEnd, setValueEnd] = useState("");



    const pSearchparams = useSearchParams();
    const existingYear = pSearchparams.get("initial")
    const existingYearEnd = pSearchparams.get("initialMax")



    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        if (currentWeight) {
            changeSearchParams("weightClass", currentWeight)
        } else {
            deleteSearchParams("weightClass")
        }

        if(currentWeightEnd){
            changeSearchParams("weightClassMax", currentWeightEnd)
        } else {
            deleteSearchParams("weightClassMax")
        }
    },[currentWeight, currentWeightEnd])



   


    return (
        <div className="items-center w-full">



            <div className="w-full gap-x-4">
                <Label className="flex items-center">
                    zul. Gesamtgewicht (in kg)
                    <div className="ml-auto">

                    </div>
                </Label>
                <div className="w-full flex items-center gap-x-2">
                    <div className="w-1/2">
                        <Input

                            value={currentWeight}

                            maxLength={5}

                            max={1_000_000}
                            className=" dark:bg-[#151515] dark:border-none mt-2 w-full"
                            placeholder="Von"

                            pattern="^[0-9]*$"

                            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (/^[0-9]*$/.test(value)) {
                                    setCurrentWeight(value);
                                }
                            }}

                        />
                    </div>
                    <div className="w-1/2">
                        <Input

                            value={currentWeightEnd}

                            maxLength={5}

                            max={1_000_000}
                            className=" dark:bg-[#151515] dark:border-none mt-2 w-full"
                            placeholder="Bis"

                            pattern="^[0-9]*$"

                            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
                            onChange={(e) => {
                                const value = e.target.value;

                                if (/^[0-9]*$/.test(value)) {
                                    setCurrentWeightEnd(value);
                                }
                            }}

                        />
                    </div>
                </div>
            </div>



        </div>
    );
};
export default WeightClassSearch;