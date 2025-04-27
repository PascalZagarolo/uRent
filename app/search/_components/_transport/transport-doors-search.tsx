'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/lib/utils";
import { DoorOpen } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TransportDoorsSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentDoors, setCurrentDoors] = useState(currentObject["transportDoors"]);
    const [currentMaxDoors, setCurrentMaxDoors] = useState(currentObject["transportDoorsMax"]);
    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const router = useRouter();
    const params = useParams();

    const onSubmitStart = (selectedValue: string) => {
        if (selectedValue === "BELIEBIG") {
            deleteDoors();
            return;
        }
        setCurrentDoors(selectedValue);
        changeSearchParams("transportDoors", selectedValue);
    }

    const onSubmitEnd = (selectedValue: string) => {
        if (selectedValue === "BELIEBIG") {
            deleteDoorsEnd();
            return;
        }
        setCurrentMaxDoors(selectedValue);
        changeSearchParams("transportDoorsMax", selectedValue);
    }

    // Ensure min doesn't exceed max
    useEffect(() => {
        if (currentDoors && currentMaxDoors) {
            if (Number(currentDoors) > Number(currentMaxDoors)) {
                changeSearchParams("transportDoorsMax", currentDoors);
                setCurrentMaxDoors(currentDoors);
            }
        }
    }, [currentDoors]);

    // Ensure max isn't less than min
    useEffect(() => {
        if (currentDoors && currentMaxDoors) {
            if (Number(currentDoors) > Number(currentMaxDoors)) {
                changeSearchParams("transportDoors", currentMaxDoors);
                setCurrentDoors(currentMaxDoors);
            }
        }
    }, [currentMaxDoors]);

    const deleteDoors = () => {
        setCurrentDoors(null);
        deleteSearchParams("transportDoors");
    }

    const deleteDoorsEnd = () => {
        setCurrentMaxDoors(null);
        deleteSearchParams("transportDoorsMax");
    }

    const doorOptions = [
        { value: "2", label: "2/3" },
        { value: "4", label: "4/5" },
        { value: "6", label: "6/7" }
    ];

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <DoorOpen className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Türen</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div className="group">
                    <Select
                        onValueChange={(value) => onSubmitStart(value)}
                        value={currentDoors || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !currentDoors && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Von" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {doorOptions.map((option) => (
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
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentDoors ? 'w-full' : 'w-0'}`}></div>
                </div>

                <div className="group">
                    <Select
                        onValueChange={(value) => onSubmitEnd(value)}
                        value={currentMaxDoors || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !currentMaxDoors && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Bis" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {doorOptions.map((option) => (
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
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentMaxDoors ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
}

export default TransportDoorsSearch; 