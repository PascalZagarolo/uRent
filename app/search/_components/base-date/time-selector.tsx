'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimeSelectorProps {
    value: string | null;
    onChange: (value: string | null) => void;
    timeOptions: string[];
    disabled?: boolean;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
    value,
    onChange,
    timeOptions,
    disabled = false
}) => {
    const handleValueChange = (selectedValue: string) => {
        if (selectedValue === "null") {
            onChange(null);
        } else {
            onChange(selectedValue);
        }
    };

    return (
        <Select
            value={value || "null"}
            onValueChange={handleValueChange}
            disabled={disabled}
        >
            <SelectTrigger className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]">
                <SelectValue placeholder="Beliebig" className="placeholder:text-gray-500" />
            </SelectTrigger>
            <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                <SelectItem value="null" className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                    Beliebig
                </SelectItem>
                
                {timeOptions.map((time) => (
                    <SelectItem 
                        key={time} 
                        value={time}
                        className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                    >
                        {time} Uhr
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default TimeSelector; 