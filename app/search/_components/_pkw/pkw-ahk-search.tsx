'use client';

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSavedSearchParams } from "@/store";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const PkwAhkSearch = () => {
    const currentObject: any = useSavedSearchParams((state) => state.searchParams);
    const [currentAhk, setCurrentAhk] = useState(currentObject["ahk"]);
    const [isLoading, setIsLoading] = useState(false);
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const router = useRouter();
    const params = useParams();

    const onSubmit = (selectedValue: string) => {
        if (selectedValue === "BELIEBIG") {
            deleteAhk();
            return;
        }
        changeSearchParams("ahk", selectedValue);
        setCurrentAhk(selectedValue);
    }

    const deleteAhk = () => {
        deleteSearchParams("ahk");
        setCurrentAhk(null);
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Link2 className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Anhängerkupplung</h3>
            </div>
            
            <div className="group">
                <Select
                    onValueChange={(value) => onSubmit(value)}
                    value={currentAhk || "BELIEBIG"}
                    disabled={isLoading}
                >
                    <SelectTrigger 
                        className={cn(
                            "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                            !currentAhk && "text-gray-500"
                        )}
                        disabled={isLoading}
                    >
                        <SelectValue placeholder="Anhängerkupplung?" />
                    </SelectTrigger>
                    
                    <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                        <SelectItem value="BELIEBIG" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                            Beliebig
                        </SelectItem>
                        <SelectItem value="true" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Vorhanden</SelectItem>
                        <SelectItem value="false" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Nicht vorhanden</SelectItem>
                    </SelectContent>
                </Select>
                <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentAhk ? 'w-full' : 'w-0'}`}></div>
            </div>
        </div>
    );
}

export default PkwAhkSearch;
