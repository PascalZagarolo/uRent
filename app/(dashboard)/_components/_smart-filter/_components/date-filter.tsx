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
import { format, isBefore } from "date-fns";
import { getSearchParamsFunction } from "@/actions/getSearchParams";
import { de } from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSavedSearchParams } from "@/store";
import { set } from "lodash";
import TimePeriodFormFilter from "./timeperiod";

const DateFormFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const usedSearchParams = useSearchParams();


    
    const currentObject = useSavedSearchParams((state) => state.searchParams)

   

    const paramsPeriodBegin = usedSearchParams.get("periodBegin");
    const paramsPeriodEnd = usedSearchParams.get("periodEnd");
    
    const [periodBegin, setPeriodBegin] = React.useState<any>(paramsPeriodBegin);

    const [periodEnd, setPeriodEnd] = React.useState<any>(paramsPeriodEnd);

    

    const params = getSearchParamsFunction("periodBegin", "periodEnd");

    const { searchParams, changeSearchParams, deleteSearchParams } = useSavedSearchParams();

    const setStart = (usedDate : Date) => {
        //@ts-ignore
        changeSearchParams("periodBegin", usedDate);
        
    }

    const setEnd = (usedDate : Date) => {
        //@ts-ignore
        changeSearchParams("periodEnd", usedDate);
        
    }

    React.useEffect(() => {
        if(paramsPeriodBegin){
          //@ts-ignore
            changeSearchParams("periodBegin", new Date(paramsPeriodBegin));
            setPeriodBegin(paramsPeriodBegin);
            form.setValue("start", paramsPeriodBegin)
        } 
        
        if(paramsPeriodEnd){
          //@ts-ignore
            changeSearchParams("periodEnd", new Date(paramsPeriodEnd));
            setPeriodEnd(paramsPeriodEnd);
            form.setValue("end", paramsPeriodEnd)
        }
    }, [])

    React.useEffect(() => {
        //@ts-ignore
        if(!currentObject["periodBegin"] && !paramsPeriodBegin){
          setPeriodBegin(null)
        }
        //@ts-ignore
        if(!currentObject["periodEnd"] && !paramsPeriodEnd){
          setPeriodEnd(null)
        }
     
    }, [currentObject, paramsPeriodBegin, paramsPeriodEnd])

    

    const deleteDates = () => {
        deleteSearchParams("periodBegin");
        deleteSearchParams("periodEnd");
        setPeriodBegin(null);
        setPeriodEnd(null);
    }

    
    const formSchema = z.object({
        start: z.string().optional(),
        end: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
          //@ts-ignore
            start : periodBegin || null,
            //@ts-ignore
            end : periodEnd || null
        }
    })
   

   

    React.useEffect(() => {
      if(periodBegin > periodEnd){
        setPeriodEnd(periodBegin)
        changeSearchParams("periodEnd", periodBegin)
        form.setValue("end", periodBegin)
      }
    },[periodBegin])

    React.useEffect(() => {
      if(!periodBegin){
        changeSearchParams("periodBegin", periodEnd);
        setPeriodBegin(periodEnd)
      }
    },[periodEnd])

    

  

    return (
        <div className="mb-2 w-full ">
            <h3 className="flex justify-start text-lg text-gray-100 items-center   p-2 border-[#1f2332] ">
                <FaRegCalendarAlt className="mr-4" /> Mietzeitraum
            </h3>
            <div className="flex gap-x-4 mt-2 w-full">
            <div className="w-full">
          
          <div className="flex w-full px-2">
            <Form {...form}>
              <form onSubmit={() => {}} className="space-y-8 w-full">
                <div className="flex gap-x-4 w-full">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-1/2">
                        <FormLabel className="text-gray-100/80">Mietbeginn</FormLabel>
                        <Popover modal={true}>
                          <PopoverTrigger asChild disabled={currentObject["dynamicSearch"]}>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " pl-3 text-left w-full font-semibold dark:bg-[#0F0F0F]",
                                  !field.value && "text-muted-foreground  dark:border-none"
                                )}
                              >
                                {periodBegin ? (
                                  format(periodBegin, "dd.MM")
                                ) : (
                                  <span className="font-semibold text-gray-900 dark:text-gray-100/80">Start</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50 " />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              //@ts-ignore
                              selected={new Date(periodBegin)}
                              onSelect={(date) => {
                                field.onChange(date);
                                setPeriodBegin(date);
                                setStart(date);
                              }}
                              locale={de}
                              disabled={(date) =>
                                isBefore(date, new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
                              }
                              className="dark:bg-[#0F0F0F] border-none"
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="end"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-1/2">
                        <FormLabel className="text-gray-100/70">Mietende</FormLabel>
                        <Popover modal={true}>
                          <PopoverTrigger asChild disabled={currentObject["dynamicSearch"]}>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  " w-full pl-3 text-left  font-semibold dark:bg-[#0F0F0F] dark:border-none",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {periodEnd  ? (
                                  format(periodEnd, "dd.MM")
                                ) : (
                                  <span className="font-semibold text-gray-900 dark:text-gray-100/80">Ende</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              //@ts-ignore
                              selected={new Date(periodEnd)}
                              onSelect={(date) => {
                                field.onChange(date);
                                setPeriodEnd(date);
                                setEnd(date);
                              }}
                              disabled={(date) =>
                                date < new Date(periodBegin) || date < new Date("1900-01-01")
                              }
                              locale={de}
                              initialFocus
                              className="dark:bg-[#0F0F0F] border-none"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> 
              </form>
            </Form> 
          </div>
        </div>
                
            </div>
            <div className="mt-4">
              <TimePeriodFormFilter
              isDisabled = {currentObject["dynamicSearch"] || (!periodBegin && !periodEnd)}
              />
            </div>
            {/*
            <div className="mt-2 flex justify-center  ">
                    <Button className="bg-[#1a1d2c] w-full border 
                    dark:text-gray-100  dark:hover:bg-[#212538]
                    "  disabled={!periodBegin && !periodEnd && !params.periodBegin && !paramsPeriodEnd} 
                    onClick={deleteDates}
                    >
                        Filter zurücksetzen
                    </Button>
                </div>
            */}
                
        </div>
    );
}

export default DateFormFilter;