'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Weight } from "lucide-react";
import { cn } from "@/lib/utils";

const TrailerWeightClassSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentWeight, setCurrentWeight] = useState(currentObject['weightClass'] ? currentObject['weightClass'] : undefined);
    const [currentWeightEnd, setCurrentWeightEnd] = useState(currentObject['weightClassMax'] ? currentObject['weightClassMax'] : undefined);
    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const router = useRouter();
    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("weightClass", selectedValue);
        setCurrentWeight(selectedValue);
    }

    const deleteWeight = () => {
        deleteSearchParams("weightClass");
        setCurrentWeight(null);
    }

    const onSubmitEnd = (selectedValue: string) => {
        changeSearchParams("weightClassMax", selectedValue);
        setCurrentWeightEnd(selectedValue);
    }

    const deleteWeightEnd = () => {
        deleteSearchParams("weightClassMax");
        setCurrentWeightEnd(null);
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Weight className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Gewichtsklasse</h3>
            </div>
            
            <div className="flex items-center gap-x-2">
                <div className="w-1/2 group">
                    <Select
                        onValueChange={(value) => {
                            value === "BELIEBIG" ? deleteWeight() : onSubmit(value);
                        }}
                        value={currentWeight || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !currentWeight && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Von" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            <SelectItem value="75" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">0,75 t</SelectItem>
                            <SelectItem value="150" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">1,5 t</SelectItem>
                            <SelectItem value="280" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">2,8 t</SelectItem>
                            <SelectItem value="350" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">3,5 t</SelectItem>
                            <SelectItem value="750" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">7,5 t</SelectItem>
                            <SelectItem value="1200" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">12 t</SelectItem>
                            <SelectItem value="1800" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">18 t</SelectItem>
                            <SelectItem value="2600" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">26 t</SelectItem>
                            <SelectItem value="3200" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">32 t</SelectItem>
                            <SelectItem value="3400" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">34 t</SelectItem>
                            <SelectItem value="3900" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">39 t</SelectItem>
                            <SelectItem value="5000" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">{'>'} 39 t</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentWeight ? 'w-full' : 'w-0'}`}></div>
                </div>

                <div className="w-1/2 group">
                    <Select
                        onValueChange={(value) => {
                            value === "BELIEBIG" ? deleteWeightEnd() : onSubmitEnd(value);
                        }}
                        value={currentWeightEnd || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !currentWeightEnd && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Bis" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            <SelectItem value="75" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">0,75 t</SelectItem>
                            <SelectItem value="150" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">1,5 t</SelectItem>
                            <SelectItem value="280" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">2,8 t</SelectItem>
                            <SelectItem value="350" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">3,5 t</SelectItem>
                            <SelectItem value="750" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">7,5 t</SelectItem>
                            <SelectItem value="1200" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">12 t</SelectItem>
                            <SelectItem value="1800" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">18 t</SelectItem>
                            <SelectItem value="2600" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">26 t</SelectItem>
                            <SelectItem value="3200" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">32 t</SelectItem>
                            <SelectItem value="3400" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">34 t</SelectItem>
                            <SelectItem value="3900" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">39 t</SelectItem>
                            <SelectItem value="5000" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">{'>'} 39 t</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentWeightEnd ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
}

export default TrailerWeightClassSearch;