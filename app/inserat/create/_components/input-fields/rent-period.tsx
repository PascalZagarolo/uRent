'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inserat } from "@prisma/client";
import axios from "axios";

import { format } from "date-fns";

import { CalendarClockIcon, CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface RentPeriodProps {
    inserat : Inserat
}

const RentPeriod: React.FC<RentPeriodProps> = ({
    inserat
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isDateless, setIsDateless] = useState(false);

    const router = useRouter();

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
        try {   
            setIsLoading(true);
            axios.patch(`/api/inserat/${inserat.id}`, values);
            toast.success("Datum erfolgreich festgelegt");
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    const onAnnual = () => {
        try {
            setIsLoading(true);
            const values = {
                begin: null,
                end : null,
                annual: isDateless
            }

            console.log(values)

            axios.patch(`/api/inserat/${inserat.id}`, values);
            toast.success("Datum erfolgreich festgelegt")
            setTimeout(() => {
                router.refresh();
            }, 500)
        } catch {
            toast.error("Etwas ist schief gelaufen...")
        } finally {
            setIsLoading(false);
        }
    }

    


    return (
        <div>
            <div className="w-full flex-col justify-center dark:bg-[#0F0F0F] dark:border-gray-100 dark:border  bg-white p-8 max-w-max rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            <h3 className="font-bold text-xl flex justify-center">
                <CalendarClockIcon className="mr-2"/>
                Mietdauer
                
            </h3>
            
            <div className="flex justify-center">
                <div className="">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
                            <h1 className="font-semibold text-base mb-2">
                                Von :
                            </h1>
                            <div>
                                <FormField
                                disabled={isDateless}
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
                                                                "w-[240px] pl-3 text-left font-normal dark:bg-[#242424] dark:hover:bg-[#2d2d2d] dark:border-none",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                            disabled={!isDateless}
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
                                                        className="dark:bg-[#242424] dark:border dark:border-gray-200"
                                                        disabled={(date) =>
                                                            date < new Date() || date < new Date("1900-01-01") 
                                                            
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
                                                            disabled={!isDateless}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal dark:bg-[#242424] dark:border-none dark:hover:bg-[#2d2d2d]",
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
                                                        className="dark:bg-[#242424] dark:border dark:border-gray-200"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date() || date < new Date("1900-01-01")
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
                            <Button type="submit" className="bg-blue-800 dark:bg-[#191919] dark:hover:bg-[#2d2d2d] dark:text-gray-100  w-full mt-2" disabled={!isDateless}>Daten festlegen</Button>
                        </form>
                    </Form>
                </div>
            </div>
                                                        
                                           
        </div>
        <div className="bg-white dark:bg-[#0F0F0F] p-4 w-full mt-8 rounded-md drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]" >
                <div className="flex">
                    <Switch
                    className="dark:bg-[#0F0F0F]"
                    defaultChecked={!isDateless}
                    onCheckedChange={(checked) => {setIsDateless(!checked); onAnnual();}}
                    
                    
                    /> 
                    <p className="ml-2 font-semibold  text-sm">
                        Datumsunabhängig anbieten
                    </p>
                </div>
        </div>
        </div>
    );
}

export default RentPeriod;