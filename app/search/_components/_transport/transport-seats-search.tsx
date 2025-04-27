'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TransportSeatsSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentSeats, setCurrentSeats] = useState(currentObject["transportSeats"]);
    const [currentMaxSeats, setCurrentMaxSeats] = useState(currentObject["transportSeatsMax"]);
    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const router = useRouter();
    const params = useParams();

    const onSubmitStart = (selectedValue: string) => {
        if (selectedValue === "BELIEBIG") {
            deleteSeats();
            return;
        }
        setCurrentSeats(selectedValue);
        changeSearchParams("transportSeats", selectedValue);
    }

    const onSubmitEnd = (selectedValue: string) => {
        if (selectedValue === "BELIEBIG") {
            deleteSeatsEnd();
            return;
        }
        setCurrentMaxSeats(selectedValue);
        changeSearchParams("transportSeatsMax", selectedValue);
    }

    // Ensure min doesn't exceed max
    useEffect(() => {
        if (currentSeats && currentMaxSeats) {
            if (Number(currentSeats) > Number(currentMaxSeats)) {
                changeSearchParams("transportSeatsMax", currentSeats);
                setCurrentMaxSeats(currentSeats);
            }
        }
    }, [currentSeats]);

    // Ensure max isn't less than min
    useEffect(() => {
        if (currentSeats && currentMaxSeats) {
            if (Number(currentSeats) > Number(currentMaxSeats)) {
                changeSearchParams("transportSeats", currentMaxSeats);
                setCurrentSeats(currentMaxSeats);
            }
        }
    }, [currentMaxSeats]);

    const deleteSeats = () => {
        setCurrentSeats(null);
        deleteSearchParams("transportSeats");
    }

    const deleteSeatsEnd = () => {
        setCurrentMaxSeats(null);
        deleteSearchParams("transportSeatsMax");
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Users className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Sitze</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <div className="group">
                    <Select
                        onValueChange={(value) => onSubmitStart(value)}
                        value={currentSeats || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !currentSeats && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Von" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((seat) => (
                                <SelectItem 
                                    key={seat} 
                                    value={String(seat)}
                                    className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                >
                                    {seat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentSeats ? 'w-full' : 'w-0'}`}></div>
                </div>

                <div className="group">
                    <Select
                        onValueChange={(value) => onSubmitEnd(value)}
                        value={currentMaxSeats || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !currentMaxSeats && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Bis" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((seat) => (
                                <SelectItem 
                                    key={seat} 
                                    value={String(seat)}
                                    className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                >
                                    {seat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentMaxSeats ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
}

export default TransportSeatsSearch; 