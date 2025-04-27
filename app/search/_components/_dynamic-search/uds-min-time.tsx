import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface UdsReqTimeSearchProps {
    isDisabled?: boolean;
    onChange?: (value: string) => void;
}

const UdsReqTimeSearch = ({ isDisabled, onChange } : UdsReqTimeSearchProps) => {

    const [minTime, setMinTime] = useState<string | undefined>(undefined);

    return (
        <div className="w-full">
            <div className="group">
                <Select
                    onValueChange={(value) => {
                        setMinTime(value);
                        onChange(value);
                    }}
                    disabled={isDisabled}
                    value={minTime ? minTime : undefined}
                >
                    <SelectTrigger className={cn(
                        "h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]",
                        !minTime && "text-gray-500"
                    )}>
                        <SelectValue placeholder="Mietdauer wählen" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                        <SelectGroup>
                            <SelectItem value="1h" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">1 Stunde</SelectItem>
                            <SelectItem value="4h" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">4 Stunden</SelectItem>
                            <SelectItem value="1d" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">1 Tag</SelectItem>
                            <SelectItem value="3d" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">3 Tage</SelectItem>
                            <SelectItem value="7d" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">1 Woche</SelectItem>
                            <SelectItem value="14d" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">2 Wochen</SelectItem>
                            <SelectItem value="30d" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">1 Monat</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${minTime ? 'w-full' : 'w-0'}`}></div>
            </div>
        </div>
    );
}

export default UdsReqTimeSearch;