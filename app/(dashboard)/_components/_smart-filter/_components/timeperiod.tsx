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
import { Banknote, CalendarClockIcon, CalendarIcon, Clock12, Link } from "lucide-react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, isSameDay } from "date-fns";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { de } from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSavedSearchParams } from "@/store";
import { set } from "lodash";

const TimePeriodFormFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const usedSearchParams = useSearchParams();


    
    const currentObject = useSavedSearchParams((state) => state.searchParams)

   

    const paramsPeriodBegin = usedSearchParams.get("startTime");
    const paramsPeriodEnd = usedSearchParams.get("endTime");
    
   


    const [startTime, setStartTime] = React.useState<string | null>(paramsPeriodBegin);
    const [endTime, setEndTime] = React.useState<string | null>(paramsPeriodEnd);
    

    const params = getSearchParamsFunction("startTime", "endTime");

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (usedTime : string) => {
        //@ts-ignore
        changeSearchParams("startTime", usedTime);
        
    }

    const setEnd = (usedTime : string) => {
        //@ts-ignore
        
        changeSearchParams("endTime", usedTime);
        
    }

    

    

    

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
          
          <div className="flex w-full px-2">
            
                <div className="flex gap-x-4 w-full">
                <Select
                onValueChange={(value) => {
                    setStartTime(value);
                    setStart(value);
                    
                }}
                value={startTime ? startTime : undefined}
                >
                    <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none">
                        <SelectValue placeholder="Startzeit" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                        {[...Array(48).keys()].map(index => {
                            const hour = Math.floor(index / 2);
                            const minute = index % 2 === 0 ? '00' : '30';
                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                            return (
                                <SelectGroup key={index}>
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

                <Select
                onValueChange={(value) => {
                    setEndTime(value);
                    setEnd(value);
                }}
                value={endTime ? endTime : undefined}
                >
                    <SelectTrigger className="w-full dark:bg-[#0a0a0a] dark:border-none">
                        <SelectValue placeholder="Endzeit" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                        {[...Array(48).keys()].map(index => {
                            const hour = Math.floor(index / 2);
                            const minute = index % 2 === 0 ? '00' : '30';
                            const formattedTime = `${hour < 10 ? '0' + hour : hour}:${minute} Uhr`;
                            return (
                                <SelectGroup key={index}>
                                {
                                    {
                                        "0" : <SelectLabel>Frühmorgen</SelectLabel>,
                                        "510" : <SelectLabel>Morgens</SelectLabel>,
                                        "990" : <SelectLabel>Nachmittags</SelectLabel>,
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
    );
}

export default TimePeriodFormFilter;