'use client'


import {PinIcon } from "lucide-react";
import {  usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import qs from "query-string"
import { Separator } from "@/components/ui/separator";
import { MdCancel } from "react-icons/md";



const PkwPowerBar = () => {


    const router = useRouter();

    const power = useSearchParams().get("power");
    const pathname = usePathname();
    const [usesPS, setUsesPS] = useState(true);

    const [currentKW, setCurrentKW] = useState<number | null>((Math.round(Number(power) * 0.735499)));
    const [currentPS, setCurrentPS] = useState<number | null>(Number(power));
    const [isLoading, setIsLoading] = useState(false);


    

    const params = getSearchParamsFunction("power");

    const onSubmit = () => {
        
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                power : currentPS,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })

        router.push(url) 
        
    }

    const onClear = () => {
        const url = qs.stringifyUrl({
            url : pathname,
            query : {
                power : null,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })
        setCurrentKW(null);
        setCurrentPS(null);

        router.push(url) 
    }

    






    return (
        <div className="items-center w-full">

            <h3 className="flex justify-center text-md items-center font-semibold text-gray-200">
                <Separator className="w-1/3 mr-2 bg-gray-200" /> Leistung <Separator className="w-1/3 ml-2 bg-gray-200" />
            </h3>
            <div className="flex mt-4 w-full gap-x-4">

            <div className="items-center  w-1/2">
                    <Label className="flex justify-start items-center text-gray-200">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> PS </p>
                    </Label>

                    <Input
                        placeholder="in PS"
                        className="p-2.5 rounded-md input: text-sm border mt-2  
                        border-none dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0 w-full"
                        onChange={(e) => {
                            setCurrentPS(Number(e.target.value));
                            setCurrentKW(Math.round(Number(e.target.value) * 0.735499));
                        }}
                        disabled={!usesPS}
                        value={currentPS || ''}
                        
                    />
                </div>
                
                <div className="w-1/2">
                    <Label className="flex justify-start items-center text-gray-200">
                        <PinIcon className="w-4 h-4" /> <div className="ml-2 font-semibold flex items-center w-full"> KW 
                        <MdCancel className="w-4 h-4 text-rose-600 ml-auto cursor-pointer" onClick={onClear} /> </div>
                        
                    </Label>

                    <Input
                        placeholder="in KW"
                        className="p-2.5   rounded-md input: text-sm border mt-2 
                         border-none dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0 w-full"
                        onChange={(e) => {
                            setCurrentKW(Number(e.target.value));
                            setCurrentPS(Math.round(Number(e.target.value) * 1.35962));
                        }}
                        disabled={usesPS}
                        value={currentKW || ''}
                        
                    />
                </div>
            </div>
            <RadioGroup className="mt-2" defaultValue="PS">
                <div className="flex items-center space-x-2 text-gray-200">
                    <RadioGroupItem value="PS" id="PS" className="h-2 w-2 bg-gray-200" onClick={() => { setUsesPS(true) }} />
                    <Label htmlFor="PS" className="text-sm"><p className="text-sm"> PS </p></Label>
                    <RadioGroupItem value="KW" id="KW" className="h-2 w-2 bg-gray-200" onClick={() => { setUsesPS(false) }} />
                    <Label htmlFor="KW" className="text-sm"><p className="text-sm"> KW </p></Label>
                </div>
            </RadioGroup>
            <Button className="mt-2 w-full bg-[#1B1F2C] hover:bg-[#222738] text-gray-100 font-semibold" disabled={
                (!currentPS && !currentKW) || (currentPS === Number(power))
            }
            onClick={onSubmit}
            >
                Nach Leistung filtern
            </Button>
        </div>
    );
};
export default PkwPowerBar;