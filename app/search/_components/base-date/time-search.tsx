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


const TimeSearchFormFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const usedSearchParams = useSearchParams();

    const [usesSameDay, setUsesSameDay] = React.useState(false);

    const currentObject = useSavedSearchParams((state) => state.searchParams)



    const paramsPeriodBegin = usedSearchParams.get("startTime");
    const paramsPeriodEnd = usedSearchParams.get("endTime");




    const [startTime, setStartTime] = React.useState(currentObject["startTime"] ? currentObject["startTime"] : null);
    const [endTime, setEndTime] = React.useState(currentObject["endTime"] ? currentObject["endTime"] : null);

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
        <div className=" w-full ">

            <div className="flex gap-x-4 w-full">
                <div className="w-full">

                    <div className="flex w-full sm:px-2">

                        <div className="flex gap-x-4 w-full">
                            <div className="w-1/2">
                            <Label className="text-sm font-semibold">
                                    Startzeit
                                </Label>
                                <Select
                                    onValueChange={(value) => {
                                        value ? setStart(value)  : onDeleteStart();

                                    }}
                                    value={startTime}
                                >
                                    <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none mt-2" value={startTime}>
                                        <SelectValue placeholder="Startzeit" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none" >
                                    <SelectItem value={null} className="font-medium">Beliebig</SelectItem>
                                        {[...Array(48).keys()].map(index => {
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
                                                    <SelectItem  key={index} value={String(index * 30)}>{formattedTime}</SelectItem>
                                                </SelectGroup>
                                            );
                                        })}

                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-1/2">
                                <Label className="text-sm font-semibold">
                                    Endzeit
                                </Label>
                                <Select
                                    onValueChange={(value) => {
                                        value ? setEnd(value)  : onDeleteEnd();
                                    }}
                                    value={endTime}
                                >

                                    <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none mt-2">
                                        <SelectValue placeholder="Endzeit" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                                        <SelectItem value={null} className="font-medium">Beliebig</SelectItem>
                                        {[...Array(48).keys()].map(index => {
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
                                                    <SelectItem key={index} value={String(index * 30)}
                                                        disabled={isSameDay && index === 0}>{formattedTime}</SelectItem>
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

export default TimeSearchFormFilter;