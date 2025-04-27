'use client'

import { Gauge } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import qs from "query-string";
import { useSavedSearchParams } from "@/store";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const PkwPowerBar = () => {
    const currentObject = useSavedSearchParams((state) => state.searchParams);
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
    }, []);

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        changeSearchParams("power", currentPS);
        if (!currentPS || currentPS === 0) {
            deleteSearchParams("power");
        }
    }, [currentPS]);

    useEffect(() => {
        changeSearchParams("powerMax", currentPSEnd);
        if (!currentPSEnd || currentPSEnd === 0) {
            deleteSearchParams("powerMax");
        }
    }, [currentPSEnd]);

    const onClear = () => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                power: null,
                powerMax: null,
                ...params
            }
        }, { skipEmptyString: true, skipNull: true });
        setCurrentKW("");
        setCurrentPS("");
        setCurrentKWEnd("");
        setCurrentPSEnd("");

        router.push(url);
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Gauge className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Leistung</h3>
            </div>
            
            <div className="flex w-full gap-x-2">
                <div className="w-1/2 group">
                    <Input
                        placeholder="Von"
                        className={cn(
                            "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                            !usesPS ? (!currentKW && "text-gray-500") : (!currentPS && "text-gray-500")
                        )}
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
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${usesPS ? (currentPS ? 'w-full' : 'w-0') : (currentKW ? 'w-full' : 'w-0')}`}></div>
                </div>

                <div className="w-1/2 group">
                    <Input
                        placeholder="Bis"
                        className={cn(
                            "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                            !usesPS ? (!currentKWEnd && "text-gray-500") : (!currentPSEnd && "text-gray-500")
                        )}
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
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${usesPS ? (currentPSEnd ? 'w-full' : 'w-0') : (currentKWEnd ? 'w-full' : 'w-0')}`}></div>
                </div>
            </div>
            
            <div className="flex items-center space-x-3">
                <span className={`text-sm ${usesPS ? 'text-indigo-400 font-medium' : 'text-gray-400'}`}>PS</span>
                <Switch 
                    id="power-unit" 
                    checked={!usesPS} 
                    onCheckedChange={(e) => {setUsesPS(!e)}}
                    className="data-[state=checked]:bg-indigo-600"
                />
                <span className={`text-sm ${!usesPS ? 'text-indigo-400 font-medium' : 'text-gray-400'}`}>KW</span>
            </div>
        </div>
    );
};

export default PkwPowerBar;