'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/lib/utils";
import { Tag, Truck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const TrailerExtraTypeSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentType, setCurrentType] = useState(currentObject['extraType']);
    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const router = useRouter();
    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        changeSearchParams("extraType", selectedValue);
        setCurrentType(selectedValue);
    }

    const deleteType = () => {
        deleteSearchParams("extraType");
        setCurrentType(null);
    }

    function removeUnderscore(inputString: string): string {
        return inputString.replace(/_/g, ' ');
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Tag className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Erw. Kategorie</h3>
            </div>
            
            <div className="group">
                <Select
                    onValueChange={(value) => {
                        !value ? deleteType() : onSubmit(value);
                    }}
                    value={currentType}
                    disabled={isLoading}
                >
                    <SelectTrigger 
                        className={cn(
                            "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                            !currentType && "text-gray-500"
                        )}
                        disabled={isLoading}
                    >
                        <SelectValue placeholder="Anwendungsfall wählen" />
                    </SelectTrigger>
                    
                    <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                        <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="CONTAINERTRANSPORT" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Containertransport</SelectItem>
                        <SelectItem value="FAHRZEUGTRANSPORT" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Fahrzeugtransport</SelectItem>
                        <SelectItem value="FLUESSIGKEITSTRANSPORT" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Flüssigkeitstransport</SelectItem>
                        <SelectItem value="KASTENWAGEN" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Kastenwagen</SelectItem>
                        <SelectItem value="KOFFERAUFBAU" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Kofferaufbau</SelectItem>
                        <SelectItem value="KUEHLAUFBAU" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Kühlaufbau</SelectItem>
                        <SelectItem value="MOEBELTRANSPORT" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Möbeltransport</SelectItem>
                        <SelectItem value="MULDENKIPPER" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Muldenkipper</SelectItem>
                        <SelectItem value="PERSONENTRANSPORT" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Personentransport</SelectItem>
                        <SelectItem value="PLANE" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Plane</SelectItem>
                        <SelectItem value="PRITSCHE" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Pritsche</SelectItem>
                    </SelectContent>
                </Select>
                <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentType ? 'w-full' : 'w-0'}`}></div>
            </div>
        </div>
    );
}

export default TrailerExtraTypeSearch;
