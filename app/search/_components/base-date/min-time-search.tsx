'use client'

import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { minTimeValues } from "@/hooks/min-time/useMinTime";
import { useSavedSearchParams } from "@/store";
import { ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface TimeValue {
    value: number;
    label: string;
}

interface GroupedTimeValues {
    [key: string]: TimeValue[];
}

const MinTimeSearch = () => {
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const currentObject = useSavedSearchParams((state) => state.searchParams);
    const [currentTime, setCurrentTime] = useState(currentObject["minTime"] ? currentObject["minTime"] : null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (currentTime) {
            changeSearchParams("minTime", currentTime);
        } else {
            deleteSearchParams("minTime");
        }
    }, [currentTime]);

    // Group our time values by unit (hours, days, weeks, etc.)
    const groupedTimeValues: GroupedTimeValues = minTimeValues.reduce((acc: GroupedTimeValues, item: TimeValue) => {
        const unitValue = item.label.split(' ')[1]; // Extract 'Stunden', 'Tage', etc.
        if (!acc[unitValue]) {
            acc[unitValue] = [];
        }
        acc[unitValue].push(item);
        return acc;
    }, {});

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <ClockIcon className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Mindestmietzeit</h3>
            </div>
            
            <div className="w-full">
                <div className="text-xs text-gray-400 mb-1 font-medium">Mindestzeit</div>
                <div className="group">
                    <Select
                        onValueChange={(value) => setCurrentTime(value)}
                        value={currentTime}
                        disabled={isLoading}
                    >
                        <SelectTrigger 
                            className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]"
                            disabled={isLoading}
                        >
                            <SelectValue 
                                placeholder="Zeitraum wählen"
                                className="placeholder:text-gray-500"
                            />
                        </SelectTrigger>

                        <SelectContent 
                            className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md"
                        >
                            <SelectItem value={null} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">
                                Beliebig
                            </SelectItem>
                            
                            {Object.entries(groupedTimeValues).map(([unit, items]) => (
                                <SelectGroup key={unit}>
                                    <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">
                                        {unit === 'Stunden' ? 'Stunden' : 
                                         unit === 'Tag' || unit === 'Tage' ? 'Tage' : 
                                         unit === 'Woche' || unit === 'Wochen' ? 'Wochen' : 
                                         unit === 'Monat' || unit === 'Monate' ? 'Monate' : 'Jahre'}
                                    </SelectLabel>
                                    {items.map((item) => (
                                        <SelectItem 
                                            key={item.value} 
                                            value={String(item.value)}
                                            className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer"
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${currentTime ? 'w-full' : 'w-0'}`}></div>
                </div>
            </div>
        </div>
    );
}

export default MinTimeSearch;