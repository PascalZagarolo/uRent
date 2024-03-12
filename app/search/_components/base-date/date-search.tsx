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
import { Banknote, CalendarClockIcon, CalendarIcon, Clock10Icon, Clock12, Link } from "lucide-react";
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


const DateSearch = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTitle = searchParams.get("title");
    const category = searchParams.get("category");

    const [periodBegin, setPeriodBegin] = React.useState(null);
    const [periodEnd, setPeriodEnd] = React.useState(null);

    const currentLocation = searchParams.get("location");
    const currentPage = searchParams.get("page");

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
              location : currentLocation,
              page : currentPage
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
    },[paramsPeriodBegin])

    //Zeitraum resetten, wenn ganzes Filterformular zurückgesetzt wird
    React.useEffect(() => {
      if(!paramsPeriodEnd){
          setPeriodEnd(null)
      }  
  },[paramsPeriodEnd])

    

    return (
        <div>
            
            <div className="flex gap-x-4">
            <div className="w-full">
          
          <div className="flex">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="flex gap-x-2">
                  <FormField
                    control={form.control}
                    name="start"
                    render={({ field }) => (
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="text-gray-100/80 mb-1 font-semibold flex"> <Clock10Icon className="h-4 w-4 mr-2" /> 
                        <div className="sm:ml-2 font-semibold flex "> Start </div>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild className="w-full">
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-semibold dark:bg-[#0F0F0F] dark:border-none",
                                  !field.value && "text-muted-foreground  dark:border-none"
                                )}
                              >
                                {periodBegin ? (
                                  format(periodBegin, "dd.MM")
                                ) : (
                                  <span className="font-semibold text-gray-900 dark:text-gray-100/80 sm:block hidden">Start</span>
                                )}
                                <CalendarIcon className="sm:ml-auto h-4 w-4 opacity-50 " />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 border-none" align="start">
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
                      <FormItem className="flex flex-col w-full">
                        <FormLabel className="mb-1 font-semibold flex"> <Clock10Icon className="h-4 w-4 mr-2" /> <div className="sm:ml-2 font-semibold flex"> Ende </div> </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left  font-semibold dark:bg-[#0F0F0F] dark:border-none",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {periodEnd && paramsPeriodEnd ? (
                                  format(periodEnd, "dd.MM")
                                ) : (
                                  <span className="font-semibold text-gray-900 dark:text-gray-100/80 sm:block hidden">Ende</span>
                                )}
                                <CalendarIcon className="sm:ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 border-none" align="start">
                            <Calendar
                              mode="single"
                              //@ts-ignore
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setPeriodEnd(date);
                              }}
                              disabled={(date) =>
                                date < periodBegin || date < new Date("1900-01-01")
                              }
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
           
                
        </div>
    );
}

export default DateSearch;