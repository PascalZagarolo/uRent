"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { format, set, isSameDay } from 'date-fns';
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


import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon, PencilIcon, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { usesearchUserByBookingStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { booking, inserat } from "@/db/schema";
import SearchRent from "@/app/(anzeige)/inserat/[inseratId]/_components/search-rent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { vehicle } from '../../../../../../db/schema';
import { Input } from "@/components/ui/input";
import { MdOutlinePersonPin } from "react-icons/md";
import { de } from "date-fns/locale";
import SelectTimeRange from "./select-time-range";


interface EditBookingProps {
    foundInserate : typeof inserat.$inferSelect[];
    thisBooking : typeof booking.$inferSelect;
    useHover? : boolean;
}


const EditBooking: React.FC<EditBookingProps> = ({
    foundInserate,
    thisBooking,
    useHover
}) => {

    

    

    const [currentStart, setCurrentStart] = useState(new Date(thisBooking?.startDate));
    const [currentEnd, setCurrentEnd] = useState(new Date(thisBooking?.endDate));
    const [currentPeriodStart, setCurrentPeriodStart] = useState(thisBooking?.startPeriod);
    const [currentPeriodEnd, setCurrentPeriodEnd] = useState(thisBooking?.endPeriod);

    const [isLoading, setIsLoading] = useState(false);
    
    const [currentInserat, setCurrentInserat] = useState<string | null>(thisBooking?.inseratId);
    const [currentInseratObject, setCurrentInseratObject] = useState<typeof inserat.$inferSelect | null | any>(null);
    const [currentVehicle, setCurrentVehicle] = useState<string | null>(thisBooking?.vehicleId);
    const [currentContent, setCurrentContent] = useState<string | null>(thisBooking?.content);
    const [currentName, setCurrentName] = useState<string | null>(thisBooking?.name);
    const selectedUser = usesearchUserByBookingStore((user) => user.user);


    

    useEffect(() => {
        
        const newInserat = foundInserate.find((inserat) => inserat.id === currentInserat);
        
        setCurrentInseratObject(newInserat);
        
    },[currentInserat])

    

    const params = useParams();
    const router = useRouter();

    const formSchema = z.object({
        start: z.date({
            required_error: "A date of birth is required.",
        }), end: z.date({
            required_error: "A date of birth is required.",
        }), content: z.string().optional(),
        name : z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            start: new Date(),
            end: new Date(),
            content: "",
            name : ""

        }
    })


    const onSubmit = (value: z.infer<typeof formSchema>) => {
        try {
           
            setIsLoading(true);
            const usedStart = new Date(currentStart);
            const usedEnd = new Date(currentEnd);
            const values = {
                content: currentContent,
                start: usedStart,
                end: usedEnd,
                startPeriod: currentPeriodStart,
                endPeriod: currentPeriodEnd,
                userId: selectedUser ? selectedUser?.id : null,
                vehicleId: currentVehicle,
                name : currentName
            }
            axios.patch(`/api/booking/edit/${thisBooking.id}`, values)
                .then(() => router.refresh())
            toast.success("Änderungen gespeichert");

        } catch (err) {
            toast.error("Fehler beim hinzufügen der Buchung", err)
        } finally {
            setTimeout(() => {
                router.refresh();
            }, 1000)
            setIsLoading(false);
        }
    }

    
    useEffect(() => {
        if(currentStart > currentEnd){
          setCurrentEnd(currentStart)
        }
      },[currentEnd, currentStart])


    return (
        <Dialog>
                {useHover ? (
                    <DialogTrigger asChild>    
                        <Button variant="ghost">
                        <PencilIcon className="h-4 w-4" />
                        </Button>
                </DialogTrigger>
                ) : (
                    <DialogTrigger >    
                        <PencilIcon className="h-4 w-4" />
                </DialogTrigger>
                )}
            <DialogContent className="dark:bg-[#0F0F0F] dark:border-gray-100 dark:border-none">
                <div>
                    <div>
                        <h3 className="font-bold flex mb-8">
                            <CalendarClockIcon className="mr-2" /> Buchung bearbeiten
                        </h3>
                    </div>
                    <div className="py-4 pr-8">
                        <Label className="">
                            Zugehöriges Inserat
                        </Label>
                        <Select
                            onValueChange={(selectedValue) => {
                                console.log(selectedValue)
                                console.log(currentInserat)
                                setCurrentInserat(selectedValue);
                                
                                setCurrentVehicle(null);
                            }}
                            
                            value={//@ts-ignore
                                currentInserat}
                            
                        >
                            <SelectTrigger className="dark:border-none dark:bg-[#0a0a0a] mt-2" value={//@ts-ignore
                                currentInserat}>
                                <SelectValue defaultValue={currentInserat} placeholder="Wähle dein Inserat"/>
                                </SelectTrigger>
                                <SelectContent className="dark:bg-[#0a0a0a] dark:border-none" >
                                
                                    {foundInserate.map((thisInserat : typeof inserat.$inferSelect) => (
                                        <SelectItem value={thisInserat.id} key={thisInserat.id}>
                                            {thisInserat.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            
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
                            disabled={!currentInserat ||  currentInseratObject?.vehicles?.length <= 0}>
                                <SelectValue>
                                    
                                </SelectValue>
                                
                                <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                                
                                    {currentInseratObject?.vehicles?.length > 0 ? (
                                        
                                        currentInseratObject?.vehicles?.map((thisVehicle : typeof vehicle.$inferSelect) => (
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
                                                        <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c]
                                                         dark:border-none">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[200px] pl-3 text-left font-normal dark:border-none",
                                                                    !field.value && "text-muted-foreground  "
                                                                )}
                                                            >
                                                                {currentStart ? (
                                                                    format(currentStart, "PPP", { locale : de})
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 dark:border-none rounded-md" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={currentStart}
                                                            className="dark:bg-[#0a0a0a] dark:border-none"
                                                            locale={de}
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
                                                        <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c]">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[200px] pl-3 text-left font-normal dark:border-none",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {currentEnd ? (
                                                                    format(currentEnd, "PPP", { locale : de})
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 dark:border-none rounded-md" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={currentEnd}
                                                            className="dark:bg-[#0a0a0a]"
                                                            locale={de}
                                                            onSelect={(date) => {
                                                                field.onChange(date);
                                                                setCurrentEnd(date);
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
                                <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel className="flex items-center"><MdOutlinePersonPin className="w-4 h-4 mr-2"/> Name</FormLabel>
                                                <Input
                                                    className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                                    dark:bg-[#0a0a0a]"
                                                    onChange={(e) => {setCurrentName(e.target.value); field.onChange(e)}}
                                                    value={currentName}
                                                />
                                            </FormItem>
                                        )} />
                                </div>
                                <div className="mt-2">
                                    <SelectTimeRange 
                                    isSameDay={isSameDay(currentStart, currentEnd)}
                                    setStartTimeParent={setCurrentPeriodStart}
                                    setEndTimeParent={setCurrentPeriodEnd}
                                    prefilledStartTime={thisBooking?.startPeriod} 
                                    prefilledEndTime={thisBooking?.endPeriod}
                                    
                                    />
                                </div>
                                <div>
                                <SearchRent 
                                //@ts-ignore
                                initialUser={thisBooking?.user}
                                />
                                </div>
                                <div>
                                    <span className="font-semibold text-base flex">
                                        <BookOpenCheck className="mr-2" />  Anmerkungen:
                                    </span>
                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem className="mt-2 ">
                                                
                                                <Textarea
                                                    className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                            dark:bg-[#0a0a0a]"
                                                onChange={(e) => {setCurrentContent(e.target.value); field.onChange(e)}}
                                                value={currentContent}
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
                                        disabled={(!selectedUser && (!currentName || currentName.trim() === "")) || isLoading || !currentInserat || !currentStart || !currentEnd}
                                        type="submit"
                                    >
                                        Änderungen speichern</Button>
                                </DialogTrigger>
                            </form>
                        </Form>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditBooking;