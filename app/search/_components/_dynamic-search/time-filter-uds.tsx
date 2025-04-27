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


interface TimeFilterUdsSearchProps {
    isDisabled? : boolean
}

const TimeFilterUdsSearch : React.FC<TimeFilterUdsSearchProps> = ({
    isDisabled
}) => {

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
        <div className="mb-2 w-full px-2">
            <div className="flex gap-x-4 mt-2 w-full">
                <div className="w-full">
                    <div className="flex w-full">
                        <div className="flex gap-x-4 w-full">
                            <div className="w-1/2">
                                <Label className="text-xs text-gray-400 mb-1 font-medium">
                                    Abholzeit
                                </Label>
                                <div className="group">
                                    <Select
                                        onValueChange={(value) => {
                                            value ? setStart(value) : onDeleteStart();
                                        }}
                                        value={startTime}
                                        disabled={isDisabled}
                                    >
                                        <SelectTrigger className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]">
                                            <SelectValue placeholder="Zeit wählen" className="placeholder:text-gray-500" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                                            <SelectItem value={null} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Beliebig</SelectItem>
                                            {[...Array(32).keys()].map(index => {
                                                const actualIndex = index + 16;
                                                const hour = Math.floor(actualIndex / 2);
                                                const minute = actualIndex % 2 === 0 ? '00' : '30';
                                                const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                                return (
                                                    <SelectGroup key={actualIndex}>
                                                        {
                                                            {
                                                                "0": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Frühmorgen</SelectLabel>,
                                                                "480": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Morgens</SelectLabel>,
                                                                "990": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Nachmittags</SelectLabel>,
                                                            }[String(actualIndex * 30)]
                                                        }
                                                        <SelectItem key={actualIndex} value={String(actualIndex * 30)} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">{formattedTime}</SelectItem>
                                                    </SelectGroup>
                                                );
                                            })}

                                            {[...Array(16).keys()].map(index => {
                                                const hour = Math.floor(index / 2);
                                                const minute = index % 2 === 0 ? '00' : '30';
                                                const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                                return (
                                                    <SelectGroup key={index}>
                                                        {
                                                            {
                                                                "0": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Frühmorgen</SelectLabel>,
                                                                "480": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Morgens</SelectLabel>,
                                                                "990": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Nachmittags</SelectLabel>,
                                                            }[String(index * 30)]
                                                        }
                                                        <SelectItem key={index} value={String(index * 30)} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">{formattedTime}</SelectItem>
                                                    </SelectGroup>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${startTime ? 'w-full' : 'w-0'}`}></div>
                                </div>
                            </div>

                            <div className="w-1/2">
                                <Label className="text-xs text-gray-400 mb-1 font-medium">
                                    Abgabezeit
                                </Label>
                                <div className="group">
                                    <Select
                                        onValueChange={(value) => {
                                            value ? setEnd(value) : onDeleteEnd();
                                        }}
                                        value={endTime}
                                        disabled={isDisabled}
                                    >
                                        <SelectTrigger className="h-10 transition-all duration-200 rounded-md focus-visible:ring-1 focus-visible:ring-indigo-500 border-0 bg-[#1e1e2a] text-gray-200 focus-visible:ring-offset-1 focus-visible:ring-offset-[#1a1a24]">
                                            <SelectValue placeholder="Zeit wählen" className="placeholder:text-gray-500" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1e1e2a] border border-indigo-900/30 rounded-md">
                                            <SelectItem value={null} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">Beliebig</SelectItem>
                                            {[...Array(32).keys()].map(index => {
                                                const actualIndex = index + 16;
                                                const hour = Math.floor(actualIndex / 2);
                                                const minute = actualIndex % 2 === 0 ? '00' : '30';
                                                const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                                return (
                                                    <SelectGroup key={actualIndex}>
                                                        {
                                                            {
                                                                "0": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Frühmorgen</SelectLabel>,
                                                                "480": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Morgens</SelectLabel>,
                                                                "990": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Nachmittags</SelectLabel>,
                                                            }[String(actualIndex * 30)]
                                                        }
                                                        <SelectItem key={actualIndex} value={String(actualIndex * 30)} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">{formattedTime}</SelectItem>
                                                    </SelectGroup>
                                                );
                                            })}

                                            {[...Array(16).keys()].map(index => {
                                                const hour = Math.floor(index / 2);
                                                const minute = index % 2 === 0 ? '00' : '30';
                                                const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                                                return (
                                                    <SelectGroup key={index}>
                                                        {
                                                            {
                                                                "0": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Frühmorgen</SelectLabel>,
                                                                "480": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Morgens</SelectLabel>,
                                                                "990": <SelectLabel className="text-indigo-400 text-xs font-medium pt-2">Nachmittags</SelectLabel>,
                                                            }[String(index * 30)]
                                                        }
                                                        <SelectItem key={index} value={String(index * 30)} className="text-gray-300 hover:bg-indigo-900/10 cursor-pointer">{formattedTime}</SelectItem>
                                                    </SelectGroup>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    <div className={`h-0.5 bg-gradient-to-r from-indigo-700 to-indigo-500 transition-all duration-300 rounded-full mt-0.5 opacity-70 ${endTime ? 'w-full' : 'w-0'}`}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeFilterUdsSearch;