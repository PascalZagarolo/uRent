'use client'

import { useDebounce } from "@/hooks/use-debounce";
import { AlertCircle, MapIcon, MapPin, PinIcon } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSavedSearchParams } from "@/store";




const PkwPowerSearch = () => {


    const router = useRouter();

    const params = useParams();

    const [usesPS, setUsesPS] = useState(true);

    const [currentKW, setCurrentKW] = useState<number | null>(null);
    const [currentPS, setCurrentPS] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const onSubmit = () => {
        changeSearchParams("power", currentPS);
        console.log(currentPS)
    }

    const deleteDoors = () => {
        deleteSearchParams("power")
    }






    return (
        <div className="items-center w-full">

            <h3 className="font-semibold">
                Leistung
            </h3>
            <div className="flex mt-4 w-full">

                <div className="  items-center  ">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> PS </p>
                    </Label>
                    <Input
                        placeholder="Leistung in PS"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2  
                        dark:border-none dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        onChange={(e) => {
                            setCurrentPS(Number(e.target.value));
                            setCurrentKW(Math.round(Number(e.target.value) * 0.735499));
                        }}
                        disabled={!usesPS}
                        value={currentPS || ''}
                        onBlur={onSubmit}
                    />
                </div>
                <div className="ml-4">
                    <Label className="flex justify-start items-center">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2 font-semibold"> KW </p>
                    </Label>
                    <Input
                        placeholder="Leistung in PS"
                        className="p-2.5 2xl:pr-16 xl:pr-4  rounded-md input: text-sm border mt-2 
                         dark:border-none dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0"
                        onChange={(e) => {
                            setCurrentKW(Number(e.target.value));
                            setCurrentPS(Math.round(Number(e.target.value) * 1.35962));
                        }}
                        disabled={usesPS}
                        value={currentKW || ''}
                        onBlur={onSubmit}
                    />
                </div>
            </div>
            <RadioGroup className="mt-2" defaultValue="PS">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="PS" id="PS" className="h-2 w-2" onClick={() => { setUsesPS(true) }} />
                    <Label htmlFor="PS" className="text-sm"><p className="text-sm"> PS </p></Label>
                    <RadioGroupItem value="KW" id="KW" className="h-2 w-2" onClick={() => { setUsesPS(false) }} />
                    <Label htmlFor="KW" className="text-sm"><p className="text-sm"> KW </p></Label>
                </div>
            </RadioGroup>
        </div>
    );
};
export default PkwPowerSearch;