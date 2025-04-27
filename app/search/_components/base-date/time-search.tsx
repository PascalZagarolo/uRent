'use client'

import { useSavedSearchParams } from "@/store";
import { Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import TimeSelector from "./time-selector";
import { cn } from "@/lib/utils";

const TimeSearch = () => {
    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();
    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    const currentObject = useSavedSearchParams((state) => state.searchParams);

    useEffect(() => {
        if (currentObject["startTime"]) {
            setStartTime(currentObject["startTime"]);
        }

        if (currentObject["endTime"]) {
            setEndTime(currentObject["endTime"]);
        }
    }, [currentObject["startTime"], currentObject["endTime"]]);

    // Generate time options from 00:00 to 23:30 in 30-minute intervals
    const timeOptions = useMemo(() => {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const hourStr = hour.toString().padStart(2, '0');
                const minuteStr = minute.toString().padStart(2, '0');
                options.push(`${hourStr}:${minuteStr}`);
            }
        }
        return options;
    }, []);

    const handleStartTimeChange = (time: string | null) => {
        if (time) {
            setStartTime(time);
            changeSearchParams("startTime", time);

            // If end time is earlier than start time, reset end time
            if (endTime && time > endTime) {
                setEndTime(null);
                deleteSearchParams("endTime");
            }
        } else {
            setStartTime(null);
            deleteSearchParams("startTime");
        }
    };

    const handleEndTimeChange = (time: string | null) => {
        if (time) {
            // If start time is later than end time, set start time to null
            if (startTime && time < startTime) {
                const timeIndex = timeOptions.indexOf(time);
                if (timeIndex > 0) {
                    const previousTime = timeOptions[timeIndex - 1];
                    setStartTime(previousTime);
                    changeSearchParams("startTime", previousTime);
                } else {
                    setStartTime(null);
                    deleteSearchParams("startTime");
                }
            }
            setEndTime(time);
            changeSearchParams("endTime", time);
        } else {
            setEndTime(null);
            deleteSearchParams("endTime");
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-indigo-900/20 text-indigo-400">
                    <Clock className="w-4 h-4" />
                </div>
                <h3 className="font-medium text-sm text-gray-100">Abhol- & Rückgabezeit</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <div className="text-xs text-gray-400 mb-1 font-medium">Abholzeit</div>
                    <TimeSelector
                        value={startTime}
                        onChange={handleStartTimeChange}
                        timeOptions={timeOptions}
                    />
                    <div className={cn(`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70`, startTime ? 'w-full' : 'w-0')}></div>
                </div>

                <div>
                    <div className="text-xs text-gray-400 mb-1 font-medium">Rückgabezeit</div>
                    <TimeSelector
                        value={endTime}
                        onChange={handleEndTimeChange}
                        timeOptions={timeOptions}
                        disabled={!startTime}
                    />
                    <div className={cn(`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70`, endTime ? 'w-full' : 'w-0')}></div>
                </div>
            </div>
        </div>
    );
};

export default TimeSearch;