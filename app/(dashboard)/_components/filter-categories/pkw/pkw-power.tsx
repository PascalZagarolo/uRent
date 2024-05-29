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


    const router = useRouter();

    

    const power = useSearchParams().get("power");
    const powerMax = useSearchParams().get("powerMax");

    const currentObject = useSavedSearchParams((state) => state.searchParams)

    const isPrefilled = (power || currentObject["power"])
    const isPrefilledMax = (power || currentObject["powerMax"])

    const pathname = usePathname();
    const [usesPS, setUsesPS] = useState(true);

    const [currentKW, setCurrentKW] = useState<number | string | null>(isPrefilled ?
        (Math.round(Number(currentObject["power"]) * 0.735499)) : ""
        );
    const [currentKWEnd, setCurrentKWEnd] = useState<number | string | null>(isPrefilledMax ?
        (Math.round(Number(currentObject["powerMax"]) * 0.735499)) : "");
    const [currentPS, setCurrentPS] = useState<number | string | null>(isPrefilled ? Number(currentObject["power"]) : "");
    const [currentPSEnd, setCurrentPSEnd] = useState<number | string | null>(isPrefilledMax ? Number(currentObject["powerMax"]) : "");
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

            <h3 className="flex justify-center text-md items-center font-semibold text-gray-200">
                <Separator className="w-1/3 mr-2 bg-gray-200" /> Leistung <Separator className="w-1/3 ml-2 bg-gray-200" />
            </h3>
            <div className="flex mt-4 w-full gap-x-4">

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
                            <MdCancel className="w-4 h-4 text-rose-600 ml-auto cursor-pointer" onClick={onClear} /> </div>

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
            <Button className="mt-2 w-full bg-[#1B1F2C] hover:bg-[#222738] text-gray-100 font-semibold" disabled={
                (!currentPS && !currentKW) || (currentPS === Number(power))
            }
                onClick={() => { }}
            >
                Nach Leistung filtern
            </Button>
        </div>
    );
};
export default PkwPowerBar;