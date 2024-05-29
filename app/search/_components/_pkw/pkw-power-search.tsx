'use client'


import { PinIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import qs from "query-string"
import { Separator } from "@/components/ui/separator";
import { MdCancel } from "react-icons/md";
import { useSavedSearchParams } from "@/store";
import { Switch } from "@/components/ui/switch";



const PkwPowerBar = () => {

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const router = useRouter();

    const power = useSearchParams().get("power");
    const powerMax = useSearchParams().get("powerMax");
    const pathname = usePathname();
    const [usesPS, setUsesPS] = useState(true);

    const [currentKW, setCurrentKW] = useState<number | string | null>(currentObject["power"] ?
        (Math.round(Number(currentObject["power"]) * 0.735499)) : "");
    const [currentKWEnd, setCurrentKWEnd] = useState<number | string | null>(currentObject["powerMax"] ? 
        (Math.round(Number(currentObject["powerMax"]) * 0.735499)) : "");
    const [currentPS, setCurrentPS] = useState<number | string | null>(currentObject["power"] ?
        Number(currentObject["power"]) : "");
    const [currentPSEnd, setCurrentPSEnd] = useState<number | string | null>(currentObject["powerMax"] ?
        Number(currentObject["powerMax"]) : "");
    const [isLoading, setIsLoading] = useState(false);




    const params = getSearchParamsFunction("power");

    useEffect(() => {
        if (power) {
            changeSearchParams("power", power);
            setCurrentPS(Number(power));
            setCurrentKW((Math.round(Number(power) * 0.735499)));
        }

        if (powerMax) {
            changeSearchParams("powerMax", powerMax);
            setCurrentPSEnd(Number(powerMax));
            setCurrentKWEnd((Math.round(Number(powerMax) * 0.735499)));
        }
        
    }, [])




    

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();



    useEffect(() => {
        changeSearchParams("power", currentPS);
        if (!currentPS || currentPS === 0) {
            deleteSearchParams("power")
        }
    }, [currentPS])

    useEffect(() => {
        changeSearchParams("powerMax", currentPSEnd);
        if (!currentPSEnd || currentPSEnd === 0) {
            deleteSearchParams("powerMax")
        }
    }, [currentPSEnd])

    const onClear = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                power: null,
                powerMax: null,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true })
        setCurrentKW("");
        setCurrentPS("");
        setCurrentKWEnd("");
        setCurrentPSEnd("");

        router.push(url)
    }








    return (
        <div className="items-center w-full">

           <h3 className="font-semibold">
                Leistung
           </h3>
            <div className="flex mt-3.5 w-full gap-x-4">

                <div className="items-center  w-1/2">
                    <Label className="flex justify-start items-center text-gray-200">
                        <PinIcon className="w-4 h-4" /> <p className="ml-2  font-semibold"> Von </p>
                    </Label>

                    <Input
                        placeholder="Von"
                        className="p-2.5 rounded-md input: text-sm border mt-2  
                        border-none dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0 w-full"
                        onChange={(e) => {
                            if (usesPS) {
                                const newValue = e.target.value.replace(/[^0-9]/g, '');

                                if(newValue === "") {
                                    setCurrentKW("");
                                    setCurrentPS("");
                                } else {
                                    setCurrentPS(Number(newValue));
                                setCurrentKW(Math.round(Number(newValue) * 0.735499));
                                }

                                
                            } else {
                                const newValue = e.target.value.replace(/[^0-9]/g, '');
                                if(newValue === "") {
                                    setCurrentKW("");
                                    setCurrentPS("");
                                } else {
                                    setCurrentKW(Number(newValue));
                                    setCurrentPS(Math.round(Number(newValue) * 1.35962));
                                }
                                
                            }
                        }}

                        value={!usesPS ? currentKW : currentPS}

                    />
                </div>

                <div className="w-1/2">
                    <Label className="flex justify-start items-center text-gray-200">
                        <PinIcon className="w-4 h-4" /> <div className="ml-2 font-semibold flex items-center w-full"> Bis
                            </div>

                    </Label>

                    <Input
                        placeholder="Bis"
                        className="p-2.5   rounded-md input: text-sm border mt-2 
                         border-none dark:bg-[#151515] input: justify-start dark:focus-visible:ring-0 w-full"
                        onChange={(e) => {
                            if (usesPS) {
                                const newValue = e.target.value.replace(/[^0-9]/g, '');

                                if(newValue === "") {
                                    setCurrentKWEnd("");
                                    setCurrentPSEnd("");
                                } else {
                                    setCurrentPSEnd(Number(newValue));
                                setCurrentKWEnd(Math.round(Number(newValue) * 0.735499));
                                }

                                
                            } else {
                                const newValue = e.target.value.replace(/[^0-9]/g, '');
                                if(newValue === "") {
                                    setCurrentKWEnd("");
                                    setCurrentPSEnd("");
                                } else {
                                    setCurrentKWEnd(Number(newValue));
                                    setCurrentPSEnd(Math.round(Number(newValue) * 1.35962));
                                }
                                
                            }
                        }}

                        value={!usesPS ? currentKWEnd : currentPSEnd}

                    />
                </div>
            </div>
            <RadioGroup className="mt-2" defaultValue="PS">
                <div className="flex items-center space-x-2">
                <Label htmlFor="airplane-mode">PS</Label>
                    <Switch id="airplane-mode" checked={!usesPS} onCheckedChange={(e) => {setUsesPS(!e)}}/>
                    <Label htmlFor="airplane-mode">KW</Label>
                </div>
            </RadioGroup>
            
        </div>
    );
};
export default PkwPowerBar;