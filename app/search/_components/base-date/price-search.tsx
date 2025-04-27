'use client'

import { Input } from "@/components/ui/input";
import { useSavedSearchParams } from "@/store";
import { Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PriceSearch = () => {
    const currentObject = useSavedSearchParams((state) => state.searchParams);
    const router = useRouter();
    const [isMinFocused, setIsMinFocused] = useState(false);
    const [isMaxFocused, setIsMaxFocused] = useState(false);
    const [currentMin, setCurrentMin] = useState<string | number>(currentObject["start"] ? Number(currentObject["start"]) : "");
    const [currentMax, setCurrentMax] = useState<string | number>(currentObject["end"] ? Number(currentObject["end"]) : "");

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    useEffect(() => {
        const setAmount = async () => {
            if (currentMin) {
                await changeSearchParams("start", currentMin);
            } else {
                deleteSearchParams("start");
            }
        }
        setAmount();
    }, [currentMin]);

    useEffect(() => {
        const setAmount = async () => {
            if (currentMax) {
                await changeSearchParams("end", currentMax);
            } else {
                deleteSearchParams("end");
            }
        }
        setAmount();
    }, [currentMax]);

    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Banknote className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Preis</h3>
            </div>
            
            <div className="flex space-x-3">
                <div className="w-1/2 group">
                    <div className="relative">
                        <Input
                            value={currentMin}
                            className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] placeholder:text-gray-500 text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24] pl-7"
                            placeholder="Min. Preis"
                            type="text"
                            inputMode="numeric"
                            aria-label="Minimaler Preis"
                            onFocus={() => setIsMinFocused(true)}
                            onBlur={() => setIsMinFocused(false)}
                            onChange={(e) => {
                                const newValue = e.target.value.replace(/[^0-9]/g, '');
                                setCurrentMin(newValue);
                            }}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">€</span>
                        <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${isMinFocused ? 'w-full' : 'w-0'}`}></div>
                    </div>
                </div>
                
                <div className="w-1/2 group">
                    <div className="relative">
                        <Input
                            value={currentMax}
                            className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] placeholder:text-gray-500 text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24] pl-7"
                            placeholder="Max. Preis"
                            type="text"
                            inputMode="numeric"
                            aria-label="Maximaler Preis"
                            onFocus={() => setIsMaxFocused(true)}
                            onBlur={() => setIsMaxFocused(false)}
                            onChange={(e) => {
                                const newValue = e.target.value.replace(/[^0-9]/g, '');
                                setCurrentMax(newValue);
                            }}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">€</span>
                        <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${isMaxFocused ? 'w-full' : 'w-0'}`}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PriceSearch;