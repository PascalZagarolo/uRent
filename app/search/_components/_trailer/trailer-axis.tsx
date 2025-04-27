'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CircleDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrailerAxisSearchProps {
    isTrailer?: boolean;
}

const TrailerAxisSearch = ({
    isTrailer
} : TrailerAxisSearchProps) => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentAxis, setCurrentAxis] = useState(currentObject['axis'] ? currentObject['axis'] : null);
    const [currentAxisEnd, setCurrentAxisEnd] = useState(currentObject['axisMax'] ? currentObject['axisMax'] : null);
    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const router = useRouter();
    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("axis", selectedValue);
        setCurrentAxis(selectedValue);
    }

    const deleteAxis = () => {
        deleteSearchParams("axis");
        setCurrentAxis(null);
    }

    const onSubmitEnd = (selectedValue: string) => {
        changeSearchParams("axisMax", selectedValue);
        setCurrentAxisEnd(selectedValue);
    }

    const deleteAxisEnd = () => {
        deleteSearchParams("axisMax");
        setCurrentAxisEnd(null);
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <CircleDashed className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Anz. Achsen</h3>
            </div>
            
            <div className="w-full flex items-center gap-x-2">
                <div className="w-1/2 group">
                    <Select
                        onValueChange={(value) => {
                            value === "BELIEBIG" ? deleteAxis() : onSubmit(value);
                        }}
                        value={currentAxis || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !currentAxis && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Von" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {isTrailer && (
                                <SelectItem value="1" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">1</SelectItem>
                            )}
                            <SelectItem value="2" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">2</SelectItem>
                            <SelectItem value="3" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">3</SelectItem>
                            <SelectItem value="4" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">4</SelectItem>
                            <SelectItem value="5" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">{'>'} 4</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentAxis ? 'w-full' : 'w-0'}`}></div>
                </div>
                
                <div className="w-1/2 group">
                    <Select
                        onValueChange={(value) => {
                            value === "BELIEBIG" ? deleteAxisEnd() : onSubmitEnd(value);
                        }}
                        value={currentAxisEnd || "BELIEBIG"}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className={cn(
                                "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                                !currentAxisEnd && "text-gray-500"
                            )}
                            disabled={isLoading}
                        >
                            <SelectValue placeholder="Bis" />
                        </SelectTrigger>
                        
                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                            <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            {isTrailer && (
                                <SelectItem value="1" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">1</SelectItem>
                            )}
                            <SelectItem value="2" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">2</SelectItem>
                            <SelectItem value="3" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">3</SelectItem>
                            <SelectItem value="4" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">4</SelectItem>
                            <SelectItem value="5" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">{'>'} 4</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentAxisEnd ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
}

export default TrailerAxisSearch;