'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PkwSeatsSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentSeats, setCurrentSeats] = useState(currentObject["seats"]);
    const [currentMaxSeats, setCurrentMaxSeats] = useState(currentObject["seatsMax"]);
    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const router = useRouter();
    const params = useParams();

    const onSubmitStart = (selectedValue: string) => {
        setCurrentSeats(selectedValue);
        changeSearchParams("seats", selectedValue);
    }

    const onSubmitEnd = (selectedValue: string) => {
        setCurrentMaxSeats(selectedValue);
        changeSearchParams("seatsMax", selectedValue);
    }

    useEffect(() => {
        if (currentSeats && currentMaxSeats) {
            if (Number(currentSeats) > Number(currentMaxSeats)) {
                changeSearchParams("seatsMax", currentSeats);
                setCurrentMaxSeats(currentSeats);
            }
        }
    }, [currentSeats]);

    useEffect(() => {
        if (currentSeats && currentMaxSeats) {
            if (Number(currentSeats) > Number(currentMaxSeats)) {
                changeSearchParams("seats", currentMaxSeats);
                setCurrentSeats(currentMaxSeats);
            }
        }
    }, [currentMaxSeats]);

    const deleteSeats = () => {
        setCurrentSeats(null);
        deleteSearchParams("seats");
    }

    const deleteSeatsEnd = () => {
        setCurrentMaxSeats(null);
        deleteSearchParams("seatsMax");
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
                        onValueChange={(value) => {
                            !value ? deleteSeats() : onSubmitStart(value);
                        }}
                        value={currentSeats}
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
                            <SelectItem value={null} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {[1, 2, 3, 4, 5, 6, 7].map((seat) => (
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
                        onValueChange={(value) => {
                            !value ? deleteSeatsEnd() : onSubmitEnd(value);
                        }}
                        value={currentMaxSeats}
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
                            <SelectItem value={null} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {[1, 2, 3, 4, 5, 6, 7].map((seat) => (
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

export default PkwSeatsSearch;