import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useEffect, useState } from "react";



interface SelectTimeRangeProps {
    isSameDay: boolean;
    setStartTimeParent : (time: string) => void;
    setEndTimeParent : (time: string) => void;
    prefilledStartTime?: string;
    prefilledEndTime?: string;
}

const SelectTimeRange : React.FC<SelectTimeRangeProps> = ({
    setStartTimeParent,
    setEndTimeParent,
    isSameDay,
    prefilledStartTime,
    prefilledEndTime
}) => {

    const [startTime, setStartTime] = useState<string | null>(prefilledStartTime? prefilledStartTime : null);
    const [endTime, setEndTime] = useState<string | null>(prefilledEndTime? prefilledEndTime : null);
    
    
    useEffect(() => {
        if((!!startTime && !!endTime && Number(startTime) >= Number(endTime) && isSameDay)){
            setStartTime(String(Number(endTime) - 30));
        }
    },[endTime])

    return (
        <div className="flex w-full items-center gap-8">
            <div className="w-1/2">
                <Label>
                    Startzeit*
                </Label>
                <Select
                onValueChange={(value) => {
                    setStartTime(value);
                    setStartTimeParent(value)
                }}
                value={startTime ? startTime : undefined}
                >
                    <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none">
                        <SelectValue placeholder="Wähle eine Startzeit" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                    {[...Array(36).keys()].map(index => { // From 6:00 (index 12) to 23:30 (index 47)
                                            const actualIndex = index + 12; // Adjust index to start from 6:00
                                            const hour = Math.floor(actualIndex / 2);
                                            const minute = actualIndex % 2 === 0 ? '00' : '30';
                                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                            return (
                                                <SelectGroup key={actualIndex}>
                                                    {
                                                        {
                                                            "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                                            "510": <SelectLabel>Morgens</SelectLabel>,
                                                            "990": <SelectLabel>Nachmittags</SelectLabel>,
                                                        }[String(actualIndex * 30)]
                                                    }
                                                    <SelectItem key={actualIndex} value={String(actualIndex * 30)}>{formattedTime}</SelectItem>
                                                </SelectGroup>
                                            );
                                        })}

                                        {/* Generate time slots from 0:00 to 5:30 and append them */}
                                        {[...Array(12).keys()].map(index => { // From 0:00 (index 0) to 5:30 (index 11)
                                            const hour = Math.floor(index / 2);
                                            const minute = index % 2 === 0 ? '00' : '30';
                                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                            return (
                                                <SelectGroup key={index}>
                                                    {
                                                        {
                                                            "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                                            "510": <SelectLabel>Morgens</SelectLabel>,
                                                            "990": <SelectLabel>Nachmittags</SelectLabel>,
                                                        }[String(index * 30)]
                                                    }
                                                    <SelectItem key={index} value={String(index * 30)}>{formattedTime}</SelectItem>
                                                </SelectGroup>
                                            );
                                        })}

                    </SelectContent>
                </Select>
            </div>
            <div className="w-1/2">
                <Label>
                    Endzeit*
                </Label>
                <Select
                onValueChange={(value) => {
                    setEndTime(value);
                    setEndTimeParent(value)
                }}
                value={endTime ? endTime : undefined}
                >
                    <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none">
                        <SelectValue placeholder="Wähle eine Endzeit" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                    {[...Array(36).keys()].map(index => { // From 6:00 (index 12) to 23:30 (index 47)
                                            const actualIndex = index + 12; // Adjust index to start from 6:00
                                            const hour = Math.floor(actualIndex / 2);
                                            const minute = actualIndex % 2 === 0 ? '00' : '30';
                                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                            return (
                                                <SelectGroup key={actualIndex}>
                                                    {
                                                        {
                                                            "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                                            "510": <SelectLabel>Morgens</SelectLabel>,
                                                            "990": <SelectLabel>Nachmittags</SelectLabel>,
                                                        }[String(actualIndex * 30)]
                                                    }
                                                    <SelectItem key={actualIndex} value={String(actualIndex * 30)}>{formattedTime}</SelectItem>
                                                </SelectGroup>
                                            );
                                        })}

                                        {/* Generate time slots from 0:00 to 5:30 and append them */}
                                        {[...Array(12).keys()].map(index => { // From 0:00 (index 0) to 5:30 (index 11)
                                            const hour = Math.floor(index / 2);
                                            const minute = index % 2 === 0 ? '00' : '30';
                                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                            return (
                                                <SelectGroup key={index}>
                                                    {
                                                        {
                                                            "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                                            "510": <SelectLabel>Morgens</SelectLabel>,
                                                            "990": <SelectLabel>Nachmittags</SelectLabel>,
                                                        }[String(index * 30)]
                                                    }
                                                    <SelectItem key={index} value={String(index * 30)}>{formattedTime}</SelectItem>
                                                </SelectGroup>
                                            );
                                        })}

                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default SelectTimeRange;