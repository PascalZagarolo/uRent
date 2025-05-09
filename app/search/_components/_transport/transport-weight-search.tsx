'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/lib/utils";
import { Weight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const TransportWeightClassSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [minWeight, setMinWeight] = useState(currentObject['weightClass']);
    const [maxWeight, setMaxWeight] = useState(currentObject['weightClassMax']);
    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const router = useRouter();
    const params = useParams();

    const onSubmitMin = (selectedValue: string) => {
        if (selectedValue === "BELIEBIG") {
            deleteMinWeight();
            return;
        }
        changeSearchParams("weightClass", selectedValue);
        setMinWeight(selectedValue);
    }

    const onSubmitMax = (selectedValue: string) => {
        if (selectedValue === "BELIEBIG") {
            deleteMaxWeight();
            return;
        }
        changeSearchParams("weightClassMax", selectedValue);
        setMaxWeight(selectedValue);
    }

    const deleteMinWeight = () => {
        deleteSearchParams("weightClass");
        setMinWeight(null);
    }

    const deleteMaxWeight = () => {
        deleteSearchParams("weightClassMax");
        setMaxWeight(null);
    }

    // Ensure min doesn't exceed max
    useEffect(() => {
        if (minWeight && maxWeight) {
            if (Number(minWeight) > Number(maxWeight)) {
                changeSearchParams("weightClassMax", minWeight);
                setMaxWeight(minWeight);
            }
        }
    }, [minWeight]);

    // Ensure max isn't less than min
    useEffect(() => {
        if (minWeight && maxWeight) {
            if (Number(minWeight) > Number(maxWeight)) {
                changeSearchParams("weightClass", maxWeight);
                setMinWeight(maxWeight);
            }
        }
    }, [maxWeight]);

    const weightOptions = [
        { value: "280", label: "2,8 t" },
        { value: "350", label: "3,5 t" },
        { value: "550", label: "5,5 t" }
    ];

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Weight className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Gewichtsklasse</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div className="group">
                    <Select
                        onValueChange={(value) => onSubmitMin(value)}
                        value={minWeight || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !minWeight && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Von" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {weightOptions.map((option) => (
                                <SelectItem 
                                    key={option.value} 
                                    value={option.value}
                                    className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${minWeight ? 'w-full' : 'w-0'}`}></div>
                </div>
                
                <div className="group">
                    <Select
                        onValueChange={(value) => onSubmitMax(value)}
                        value={maxWeight || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !maxWeight && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Bis" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {weightOptions.map((option) => (
                                <SelectItem 
                                    key={option.value} 
                                    value={option.value}
                                    className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${maxWeight ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
}

export default TransportWeightClassSearch;