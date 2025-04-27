'use client'

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useSavedSearchParams } from "@/store";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Scale } from "lucide-react";

const WeightClassSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentWeight, setCurrentWeight] = useState<any>(currentObject["weightClass"] ? currentObject["weightClass"] : undefined);
    const [currentWeightEnd, setCurrentWeightEnd] = useState<any>(currentObject["weightClassMax"] ? currentObject["weightClassMax"] : undefined);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        if (currentWeight) {
            changeSearchParams("weightClass", currentWeight);
        } else {
            deleteSearchParams("weightClass");
        }

        if(currentWeightEnd){
            changeSearchParams("weightClassMax", currentWeightEnd);
        } else {
            deleteSearchParams("weightClassMax");
        }
    },[currentWeight, currentWeightEnd]);

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Scale className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">zul. Gesamtgewicht (in kg)</h3>
            </div>
            
            <div className="w-full flex items-center gap-x-2">
                <div className="w-1/2 group">
                    <Input
                        value={currentWeight || ""}
                        maxLength={5}
                        max={1_000_000}
                        className={cn(
                            "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                            !currentWeight && "text-gray-500"
                        )}
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
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentWeight ? 'w-full' : 'w-0'}`}></div>
                </div>
                
                <div className="w-1/2 group">
                    <Input
                        value={currentWeightEnd || ""}
                        maxLength={5}
                        max={1_000_000}
                        className={cn(
                            "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                            !currentWeightEnd && "text-gray-500"
                        )}
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
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentWeightEnd ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
};
export default WeightClassSearch;