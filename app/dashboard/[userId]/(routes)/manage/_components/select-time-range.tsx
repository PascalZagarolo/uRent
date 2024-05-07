import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isSameDay } from "date-fns";
import { useEffect, useState } from "react";



interface SelectTimeRangeProps {
    isSameDay: boolean;
    setStartTimeParent : (time: string) => void;
    setEndTimeParent : (time: string) => void;
}

const SelectTimeRange : React.FC<SelectTimeRangeProps> = ({
    setStartTimeParent,
    setEndTimeParent,
}) => {

    const [startTime, setStartTime] = useState<string | null>(null);
    const [endTime, setEndTime] = useState<string | null>(null);
    
    
    useEffect(() => {
        if((!!startTime && !!endTime && Number(startTime) >= Number(endTime) && isSameDay)){
            setStartTime(String(Number(endTime) - 30));
        }
    },[endTime])

    return (
        <div className="flex w-full items-center gap-8">
            <div className="w-1/2">
                <Label>
                    Startzeit
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
                        {[...Array(48).keys()].map(index => {
                            const hour = Math.floor(index / 2);
                            const minute = index % 2 === 0 ? '00' : '30';
                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                            return (
                                <SelectGroup>
                                {
                                    {
                                        "0" : <SelectLabel>Frühmorgen</SelectLabel>,
                                        "510" : <SelectLabel>Morgens</SelectLabel>,
                                        "990" : <SelectLabel>Nachmittags</SelectLabel>,
                                    }[String(index * 30)]
                                }
                                <SelectItem disabled={
                                    (isSameDay && Number(endTime) <= Number(index * 30) && !!endTime) 
                                    
                                    }  key={index} value={String(index * 30)}>{formattedTime}</SelectItem>
                                </SelectGroup>
                            );
                        })}

                    </SelectContent>
                </Select>
            </div>
            <div className="w-1/2">
                <Label>
                    Endzeit
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
                        {[...Array(48).keys()].map(index => {
                            const hour = Math.floor(index / 2);
                            const minute = index % 2 === 0 ? '00' : '30';
                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                            return (
                                <SelectGroup>
                                {
                                    {
                                        "0" : <SelectLabel>Frühmorgen</SelectLabel>,
                                        "510" : <SelectLabel>Morgens</SelectLabel>,
                                        "990" : <SelectLabel>Nachmittags</SelectLabel>,
                                    }[String(index * 30)]
                                }
                                <SelectItem key={index} value={String(index * 30)} disabled={isSameDay && index === 0}>{formattedTime}</SelectItem>
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