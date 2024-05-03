"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { format, set } from 'date-fns';
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { values } from "lodash"
import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { usesearchUserByBookingStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { inserat, userTable } from "@/db/schema";
import SearchRent from "@/app/(anzeige)/inserat/[inseratId]/_components/search-rent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { vehicle } from '../../../../../../db/schema';

interface AddAvailabilityProps {
    thisInserat : typeof inserat.$inferSelect;
    inseratPage? : boolean;
}


const ManageAvailability: React.FC<AddAvailabilityProps> = ({
    thisInserat,
    inseratPage
}) => {

    const [currentStart, setCurrentStart] = useState(new Date());
    const [currentEnd, setCurrentEnd] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [currentInserat, setCurrentInserat] = useState<typeof inserat.$inferSelect>(thisInserat);
    const [currentVehicle, setCurrentVehicle] = useState<string | null>(null);
    const selectedUser = usesearchUserByBookingStore((user) => user.user)

    

    const params = useParams();
    const router = useRouter();

    const formSchema = z.object({
        start: z.date({
            required_error: "A date of birth is required.",
        }), end: z.date({
            required_error: "A date of birth is required.",
        }), content: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            start: new Date(),
            end: new Date(),
            content: ""

        }
    })


    const onSubmit = (value: z.infer<typeof formSchema>) => {
        try {
            console.log("getriggered")
            setIsLoading(true);
            const values = {
                content: value.content ? value.content : "",
                start: currentStart,
                end: currentEnd,
                vehicleId: currentVehicle,
                isAvailability : true,
            }
            axios.post(`/api/booking/${currentInserat.id}`, values);
            toast.success("Buchung hinzugefügt");

        } catch (err) {
            toast.error("Fehler beim hinzufügen der Buchung", err)
        } finally {
            setTimeout(() => {
                router.refresh();
            }, 1000)
            setIsLoading(false);
        }
    }



    return (
        <Dialog>

            <div className="dark:bg-[#0F0F0F] bg-gray-200 rounded-md w-full">
                <DialogTrigger asChild className="w-full">
                    {!inseratPage ? (
                        <div className=" text-gray-700 dark:text-gray-200
                        hover:bg-gray-300 text-xs dark:hover:bg-[#141414] hover:cursor-pointer hover:underline">
                            Verfügbarkeit ändern
                       </div>
                    ) : (
                        <div>
                            2
                        </div>
                    )}
                </DialogTrigger>
            </div>

            <DialogContent className="dark:bg-[#0F0F0F] dark:border-gray-100 dark:border-none">
                <div>
                    <div className="mb-8">
                        <h3 className="font-bold flex ">
                            <CalendarClockIcon className="mr-2" /> Verfügbarkeit ändern 
                            
                        </h3>
                        <p className="dark:text-gray-200/70 text-xs">
                            Gebe unkompliziert, Zeiträume an, an denen dein Fahrzeug NICHT verfügbar ist.
                            </p>
                    </div>
                    <div className="py-4 pr-8">
                        <Label className="">
                            Zugehöriges Inserat
                        </Label>
                        <Select
                            onValueChange={(selectedValue) => {
                                setCurrentInserat(selectedValue);
                                setCurrentVehicle(null);
                            }}
                            
                            value={currentInserat}
                            
                        >
                            <SelectTrigger className="dark:border-none dark:bg-[#0a0a0a] mt-2" disabled>
                                <SelectValue>
                                    {currentInserat.title}
                                </SelectValue>
                                
                                <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                                
                                    
                                        <SelectItem value={thisInserat} key={thisInserat.id}>
                                            {thisInserat.title}
                                        </SelectItem>
                                  
                                </SelectContent>
                            </SelectTrigger>
                        </Select>
                    </div>
                    <div className="pb-8 pr-8">
                        <Label className="">
                           Fahrzeug
                        </Label>
                        <Select
                            onValueChange={(selectedValue) => {
                                setCurrentVehicle(selectedValue);
                            }}
                            
                            value={currentVehicle}
                            
                        >
                            <SelectTrigger className="dark:border-none dark:bg-[#0a0a0a]" 
                            disabled={!thisInserat ||  thisInserat?.vehicles.length <= 0}>
                                {thisInserat ? (
                                    <SelectValue>
                                
                                    </SelectValue>
                                ) : (
                                    <SelectValue>
                                        Wähle dein Fahrzeug
                                    </SelectValue>
                                )}
                                
                                <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                                
                                    {thisInserat?.vehicles.length > 0 ? (
                                        
                                        thisInserat?.vehicles?.map((thisVehicle : typeof vehicle.$inferSelect) => (
                                            <SelectItem value={thisVehicle.id} key={thisVehicle.id}>
                                                {thisVehicle.title}
                                            </SelectItem>
                                        ))
                                        
                                    ) : (
                                        <SelectItem value={null}>
                                            Keine Fahrzeuge verfügbar
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </SelectTrigger>
                        </Select>
                    </div>
                    <div className="flex">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="flex gap-x-8">
                                    <FormField
                                        control={form.control}
                                        name="start"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Anfangsdatum</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c] dark:border-gray-100">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[200px] pl-3 text-left font-normal dark:border-none",
                                                                    !field.value && "text-muted-foreground  "
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            className="dark:bg-[#0a0a0a] dark:border-gray-100 dark:border"
                                                            onSelect={(date) => {
                                                                field.onChange(date);
                                                                setCurrentStart(date);
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
                                                <FormLabel>Enddatum</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c] dark:border-gray-100">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[200px] pl-3 text-left font-normal dark:border-none",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            className="dark:bg-[#0a0a0a] dark:border-gray-100 dark:border"
                                                            onSelect={(date) => {
                                                                const nextDay = new Date(date);
                                                                nextDay.setDate(nextDay.getDate() + 1);
                                                                field.onChange(nextDay);
                                                                setCurrentEnd(nextDay);
                                                            }}
                                                            disabled={(date) =>
                                                                date < currentStart || date < new Date("1900-01-01")
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
                                
                                <div>
                                    <span className="font-semibold text-base flex">
                                        <BookOpenCheck className="mr-2" />  Notiz
                                    </span>
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem className="mt-2 ">
                                                <Textarea
                                                    className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                            dark:bg-[#0a0a0a]"
                                                />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <DialogTrigger asChild>
                                    <Button
                                        className="bg-white border border-gray-300 text-gray-900 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
                   hover:bg-gray-200
                   dark:bg-[#0a0a0a] dark:text-gray-100 dark:hover:bg-[#171717] dark:border-none"
                                        disabled={isLoading || !currentInserat || !currentStart || !currentEnd}
                                        type="submit"
                                    >
                                        Verfügbarkeit anpassen</Button>
                                </DialogTrigger>
                            </form>
                        </Form>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ManageAvailability;