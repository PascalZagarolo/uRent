'use client'


import * as React from "react"
import qs from "query-string"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { usePathname, useRouter, useSearchParams } from "next/navigation";



import { isSameDay } from "date-fns";
import { getSearchParamsFunction } from "@/actions/getSearchParams";


import { useSavedSearchParams } from "@/store";
import { Label } from "@/components/ui/label";


interface TimeFilterUdsProps {
    isDisabled? : boolean
}

const TimeFilterUds : React.FC<TimeFilterUdsProps> = ({
    isDisabled
}) => {

    const router = useRouter();
    const pathname = usePathname();
    const usedSearchParams = useSearchParams();

    const [usesSameDay, setUsesSameDay] = React.useState(false);

    const currentObject = useSavedSearchParams((state) => state.searchParams)



    const paramsPeriodBegin = usedSearchParams.get("startTime");
    const paramsPeriodEnd = usedSearchParams.get("endTime");




    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);

    React.useEffect(() => {
        if (paramsPeriodBegin) {
            //@ts-ignore
            changeSearchParams("startTime", paramsPeriodBegin);
            setStartTime(paramsPeriodBegin);
        }

        if (paramsPeriodEnd) {
            //@ts-ignore
            changeSearchParams("endTime", paramsPeriodEnd);
            setEndTime(paramsPeriodEnd);
        }
    }, [])


    const params = getSearchParamsFunction("startTime", "endTime");

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (usedTime: string) => {
        //@ts-ignore
        setStartTime(usedTime);
        changeSearchParams("startTime", usedTime);

    }

    const setEnd = (usedTime: string) => {
        //@ts-ignore
        setEndTime(usedTime);
        changeSearchParams("endTime", usedTime);
         

    }

    const onDeleteStart = () => {
        deleteSearchParams("startTime");
        setStartTime(null);
    }
    
    const onDeleteEnd = () => {
        deleteSearchParams("endTime");
        setEndTime(null);
    }


    React.useEffect(() => {
        //@ts-ignore
        if(isSameDay(currentObject["periodBegin"], currentObject["periodEnd"])){
            setUsesSameDay(true);
            if(Number(startTime) >= Number(endTime)){
                deleteSearchParams("startTime");
            deleteSearchParams("endTime");
            setStartTime(null);
            setEndTime(null);
            }
        } else {
            setUsesSameDay(false);
        }
        //@ts-ignore
    },[currentObject["periodBegin"], currentObject["periodEnd"]])

    React.useEffect(() => {
        if(usesSameDay) {
            if(Number(startTime) > Number(endTime)){
                setEndTime(String(Number(startTime) + 30));
                changeSearchParams("endTime", String(Number(startTime) + 30));
            }
        }
    },[startTime])

    React.useEffect(() => {
        if(usesSameDay) {
            if(Number(startTime) > Number(endTime)){
                setStartTime(String(Number(endTime) - 30));
                changeSearchParams("startTime", String(Number(endTime) - 30));
            }
        }
    },[endTime])


    React.useEffect(() => {
        //@ts-ignore
        if (!currentObject["startTime"] && !paramsPeriodBegin) {
            setStartTime(null);
            
        }
        //@ts-ignore
        if (!currentObject["endTime"] && !paramsPeriodEnd) {
            setEndTime(null);

            
        }

    }, [currentObject, paramsPeriodBegin, paramsPeriodEnd])



    const deleteDates = () => {
        deleteSearchParams("startPeriod");
        deleteSearchParams("endPeriod");
        setStartTime(null);
        setEndTime(null);
    }















    return (
        <div className="mb-2 w-full ">

            <div className="flex gap-x-4 mt-2 w-full">
                <div className="w-full">

                    <div className="flex w-full ">

                        <div className="flex gap-x-4 w-full">
                            <div className="w-1/2">
                            <Label className="text-sm font-medium">
                                    Abholzeit
                                </Label>
                                <Select
                                    onValueChange={(value) => {
                                        value ? setStart(value)  : onDeleteStart();

                                    }}
                                    value={startTime}
                                    disabled={isDisabled}
                                >
                                    <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none" value={startTime}>
                                        <SelectValue placeholder="Startzeit" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none" >
                                    <SelectItem value={null} className="font-medium">Beliebig</SelectItem>
                                    {[...Array(32).keys()].map(index => { // From 6:00 (index 12) to 23:30 (index 47)
                                            const actualIndex = index + 16; // Adjust index to start from 6:00
                                            const hour = Math.floor(actualIndex / 2);
                                            const minute = actualIndex % 2 === 0 ? '00' : '30';
                                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                            return (
                                                <SelectGroup key={actualIndex}>
                                                    {
                                                        {
                                                            "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                                            "480": <SelectLabel>Morgens</SelectLabel>,
                                                            "990": <SelectLabel>Nachmittags</SelectLabel>,
                                                        }[String(actualIndex * 30)]
                                                    }
                                                    <SelectItem key={actualIndex} value={String(actualIndex * 30)}>{formattedTime}</SelectItem>
                                                </SelectGroup>
                                            );
                                        })}

                                        {/* Generate time slots from 0:00 to 5:30 and append them */}
                                        {[...Array(16).keys()].map(index => { // From 0:00 (index 0) to 5:30 (index 11)
                                            const hour = Math.floor(index / 2);
                                            const minute = index % 2 === 0 ? '00' : '30';
                                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                            return (
                                                <SelectGroup key={index}>
                                                    {
                                                        {
                                                            "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                                            "480": <SelectLabel>Morgens</SelectLabel>,
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
                                <Label className="text-sm font-medium">
                                    Abgabezeit
                                </Label>
                                <Select
                                    onValueChange={(value) => {
                                        value ? setEnd(value)  : onDeleteEnd();
                                    }}
                                    value={endTime}
                                    disabled={isDisabled}
                                >

                                    <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none">
                                        <SelectValue placeholder="Endzeit" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                                        <SelectItem value={null} className="font-medium">Beliebig</SelectItem>
                                        {[...Array(32).keys()].map(index => { // From 6:00 (index 12) to 23:30 (index 47)
                                            const actualIndex = index + 16; // Adjust index to start from 6:00
                                            const hour = Math.floor(actualIndex / 2);
                                            const minute = actualIndex % 2 === 0 ? '00' : '30';
                                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                            return (
                                                <SelectGroup key={actualIndex}>
                                                    {
                                                        {
                                                            "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                                            "480": <SelectLabel>Morgens</SelectLabel>,
                                                            "990": <SelectLabel>Nachmittags</SelectLabel>,
                                                        }[String(actualIndex * 30)]
                                                    }
                                                    <SelectItem key={actualIndex} value={String(actualIndex * 30)}>{formattedTime}</SelectItem>
                                                </SelectGroup>
                                            );
                                        })}

                                        {/* Generate time slots from 0:00 to 5:30 and append them */}
                                        {[...Array(16).keys()].map(index => { // From 0:00 (index 0) to 5:30 (index 11)
                                            const hour = Math.floor(index / 2);
                                            const minute = index % 2 === 0 ? '00' : '30';
                                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                            return (
                                                <SelectGroup key={index}>
                                                    {
                                                        {
                                                            "0": <SelectLabel>Frühmorgen</SelectLabel>,
                                                            "480": <SelectLabel>Morgens</SelectLabel>,
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
                    </div>
                </div>

            </div>



        </div>
    );
}

export default TimeFilterUds;