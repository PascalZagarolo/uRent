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
import { format } from "date-fns";


const DateFormFilter = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTitle = searchParams.get("title");
    const category = searchParams.get("category");

    const [periodBegin, setPeriodBegin] = React.useState(null);
    const [periodEnd, setPeriodEnd] = React.useState(null);

    const paramsPeriodBegin =  searchParams.get("periodBegin") ? new Date(searchParams.get("periodBegin")) : null;
    const paramsPeriodEnd = searchParams.get("periodEnd") ? new Date(searchParams.get("periodEnd")) : null;
    

    


    

    React.useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: category,
                periodBegin: periodBegin ? format(new Date(periodBegin), "dd-MM-yyyy") : null,
                periodEnd: periodEnd ? format(new Date(periodEnd), "dd-MM-yyyy") : null,
            }
        }, { skipNull: true, skipEmptyString: true });
    
        router.push(url);
    }, [periodBegin, periodEnd, currentTitle, category]);

        
 

    

    const formSchema = z.object({
        start: z.string().optional(),
        end: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            start : null,
            end : null
        }
    })
   

    const onStartPrice = (values : z.infer<typeof formSchema>) => {
        console.log(values);
    }

    const onEndPrice = (values : z.infer<typeof formSchema>) => {
        console.log(values);
    }

    const onSubmit = () => {
        console.log("...")
    }

    //Zeitraum resetten, wenn ganzes Filterformular zurückgesetzt wird
    React.useEffect(() => {
        if(!paramsPeriodBegin){
            setPeriodBegin(null)
        }  
    },[paramsPeriodBegin ])

    //Zeitraum resetten, wenn ganzes Filterformular zurückgesetzt wird
    React.useEffect(() => {
        if(!paramsPeriodEnd){
            setPeriodEnd(null)
        }  
    },[paramsPeriodEnd ])

    const filterReset = () => {
        setPeriodBegin(null);
        setPeriodEnd(null);

        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                title: currentTitle,
                category: category,
                
                periodBegin : null,
                periodEnd : null,
                
            }
        }, { skipNull: true, skipEmptyString: true });

        router.push(url)
    }

    return (
        <div className="mb-2">
            <h3 className="flex justify-start text-lg text-gray-100 items-center rounded-md border-2 border-black bg-[#1f2332] p-2 ">
                <Clock12 className="mr-4" /> Zeitraum
            </h3>
            <div className="flex gap-x-4 mt-2">
            <div>
          
          <div className="flex">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex gap-x-4">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-gray-100/80">Beginn</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[120px] pl-3 text-left font-semibold",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {periodBegin ? (
                                  format(periodBegin, "dd.MM")
                                ) : (
                                  <span className="font-semibold text-gray-900">Start</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              //@ts-ignore
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setPeriodBegin(date);
                              }}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
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
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-gray-100/70">Ablauf</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[120px] pl-3 text-left  font-semibold",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {periodEnd ? (
                                  format(periodEnd, "dd.MM")
                                ) : (
                                  <span className="font-semibold text-gray-900">Ende</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              //@ts-ignore
                              selected={field.value}
                              onSelect={(date) => {
                                const nextDay = new Date(date);
                                nextDay.setDate(nextDay.getDate());
                                field.onChange(nextDay);
                                setPeriodEnd(nextDay);
                              }}
                              disabled={(date) =>
                                date < periodBegin || date < new Date("1900-01-01")
                              }
                              initialFocus
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
            <div className="mt-2 flex justify-center  ">
                    <Button className="bg-[#1a1d2c] w-full border border-[#11131c]" onClick={filterReset} disabled={!periodBegin && !periodEnd} >
                        Filter zurücksetzen
                    </Button>
                </div>
                
        </div>
    );
}

export default DateFormFilter;