'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { format } from "date-fns";
import { CalendarClockIcon, CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RentPeriod = () => {


    const formSchema = z.object({
        begin: z.date({
            required_error: "Ein Startdatum ist erforderlich",
        }), end: z.date({
            required_error: "Ein Abschlussdatum ist erforderlich",
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            begin: new Date(),
            end: new Date()

        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }


    return (
        <div className="w-full flex-col justify-center">
            <h3 className="font-bold text-xl flex justify-center">
                <CalendarClockIcon className="mr-2"/>
                Mietdauer
                
            </h3>
            <Separator
                className="w-16 mr-auto h-[1.5px] bg-black"
            />
            <div className="flex justify-center">
                <div className="mt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                            <h1 className="font-semibold text-base mb-2">
                                Von :
                            </h1>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="begin"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Startdatum des Leasing</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Wähle einen Startpunkt</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Das Startdatum ist inkludiert.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <h1 className="font-semibold text-base mt-4 mb-2">
                                    Bis :
                                </h1>
                                <FormField
                                    control={form.control}
                                    name="end"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Startdatum des Leasing</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Wähle einen Startpunkt</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Das Enddatum ist inkludiert.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="bg-blue-800 w-full mt-2">Daten festlegen</Button>
                        </form>
                    </Form>
                </div>
            </div>

            <Separator
                className="w-16 ml-auto h-[1.5px] bg-black mt-8"
            />                                 
        </div >
    );
}

export default RentPeriod;