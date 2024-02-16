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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

    


    

        React.useEffect(() => {
            const url = qs.stringifyUrl({
                url: pathname,
                query: {
                    title: currentTitle,
                    category: category,
                    
                    periodBegin : format(new Date(periodBegin), "dd-MM-yyyy"),
                    periodEnd : format(new Date(periodEnd), "dd-MM-yyyy"),
                    
                }
            }, { skipNull: true, skipEmptyString: true });
    
            router.push(url)
        },[periodBegin, periodEnd])

        
 

    

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

    React.useEffect(() => {

    },[])



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
                <div className="flex gap-x-8">
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
                                  "w-[110px] pl-3 text-left font-semibold",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd.MM")
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
                                  "w-[110px] pl-3 text-left  font-semibold",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "dd.MM")
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
                                nextDay.setDate(nextDay.getDate() + 1);
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
                    <Button className="bg-[#1a1d2c] w-full border border-[#11131c]" onClick={() => {}} >
                        Filter zurücksetzen
                    </Button>
                </div>
        </div>
    );
}

export default DateFormFilter;