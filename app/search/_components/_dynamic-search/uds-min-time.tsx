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
        <div className="w-full ">
           
            
            <div className="">
                <Select
                    onValueChange={(value) => {
                    setMinTime(value);
                    onChange(value)
                    }}
                    disabled={isDisabled}
                    value={minTime ? minTime : undefined}

                >
                    <SelectTrigger className={cn("w-full dark:bg-[#0a0a0a] shadow-lg border-none text-gray-200", !minTime && "text-gray-200/60")}>
                        <SelectValue placeholder="Wähle deine gewünschte Mietdauer" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#0a0a0a] border-none">
                        <SelectGroup>

                            <SelectItem value="1h">1 Stunde</SelectItem>
                            <SelectItem value="4h">4 Stunden</SelectItem>
                            <SelectItem value="1d">1 Tag</SelectItem>
                            <SelectItem value="3d">3 Tage</SelectItem>
                            <SelectItem value="7d">1 Woche</SelectItem>
                            <SelectItem value="14d">2 Wochen</SelectItem>
                            <SelectItem value="30d">1 Monat</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default UdsReqTimeSearch;