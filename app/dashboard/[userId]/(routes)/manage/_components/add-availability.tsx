"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { format, isSameDay, set } from 'date-fns';
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


import { BookOpenCheck, CalendarCheck2, CalendarClockIcon, CalendarIcon, PlusSquare } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

import toast from "react-hot-toast";
import { usesearchUserByBookingStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { booking, inserat, userTable } from "@/db/schema";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { vehicle } from '../../../../../../db/schema';
import { de } from "date-fns/locale";
import SelectTimeRange from "./select-time-range";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { checkAvailability } from "@/actions/check-availability";

interface AddAvailabilityProps {
    foundInserate: typeof inserat.$inferSelect[]
}


const AddAvailability: React.FC<AddAvailabilityProps> = ({
    foundInserate
}) => {

    const [currentStart, setCurrentStart] = useState(new Date());
    const [currentEnd, setCurrentEnd] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);


    const [isLoading, setIsLoading] = useState(false);
    const [currentInserat, setCurrentInserat] = useState<typeof inserat.$inferSelect>(null);
    const [currentVehicle, setCurrentVehicle] = useState<string | null>(null);

    const [content, SetContent] = useState("");


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


    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {

            setIsLoading(true);
            const values = {
                content: value.content ? value.content : "",
                start: currentStart,
                end: currentEnd,

                //Hours
                startPeriod: startTime,
                endPeriod: endTime,

                vehicleId: currentVehicle,
                isAvailability: true,
            }

            const isAvailable: {
                isConflict?: boolean,
                booking?: any
            } = checkAvailability(
                currentInserat,
                currentStart,
                currentEnd,
                startTime,
                endTime
            )



            if (isAvailable.isConflict) {
                
                setConflictedBooking(isAvailable.booking)
                setShowConflict(true);
                setIsLoading(false);

            } else {
                axios.post(`/api/booking/${currentInserat.id}`, values)
                    .then(() => {
                        router.refresh();
                        setCurrentStart(new Date());
                        setCurrentEnd(new Date());
                        setCurrentInserat(null);
                        setCurrentVehicle(null);
                        setStartTime("");
                        setEndTime("");
                    })
                toast.success("Buchung hinzugefügt");
            }



        } catch (err) {
            toast.error("Fehler beim hinzufügen der Buchung", err)
        } finally {

            setIsLoading(false);
        }
    }



    useEffect(() => {
        if (currentStart > currentEnd) {
            setCurrentEnd(currentStart);
        }
    }, [currentStart, currentEnd])


    const [ignore, setIgnore] = useState(false);
    const [ignoreOnce, setIgnoreOnce] = useState(false);
    const [showConflict, setShowConflict] = useState(false);

    const [conflictedBooking, setConflictedBooking] = useState<typeof booking.$inferSelect | null>(null);

    function convertMinutesToDayTime(minutes: number): string {
        // Calculate hours and minutes
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        // Format hours and minutes to two digits
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = remainingMinutes.toString().padStart(2, '0');

        // Construct the time string in HH:MM format
        const dayTime = `${formattedHours}:${formattedMinutes} Uhr`;

        return dayTime;
    }

    const onShowConflictConfirm = () => {
        try {
            setIsLoading(true);

            const values = {

                //!SET CONTENT
                content: "",
                start: currentStart,
                end: currentEnd,

                //Hours
                startPeriod: startTime,
                endPeriod: endTime,

                vehicleId: currentVehicle,
                isAvailability: true,
            }


            axios.post(`/api/booking/${currentInserat}`, values)
                .then(() => {
                    setIgnoreOnce(false);
                    setShowConflict(false);
                    setConflictedBooking(null)
                    router.refresh();
                })
        } catch (error: any) {
            toast.error("Fehler beim hinzufügen der Buchung", error)
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    if (showConflict) {

        return (
            <AlertDialog open>
                <AlertDialogContent className="dark:border-none dark:bg-[#191919]">
                    <div>
                        <h3 className="flex items-center text-md font-semibold">
                            <CalendarCheck2 className="mr-2 w-4 h-4" /> Buchungskonflikt
                        </h3>
                        <p className="text-xs text-gray-200/60">
                            Das Fahrzeug ist in dem angegeben Zeitraum bereits gebucht.
                        </p>
                        <div className="mt-2 text-sm text-gray-200/90">
                            Eine Buchung für diesen Zeitraum existiert bereits. <br /> Möchtest du trotzdem fortfahren?
                        </div>
                        {conflictedBooking && (
                            <div className="mt-2">
                                <h3 className="font-semibold text-sm text-rose-600">
                                    Gefundene Buchung:
                                </h3>
                                <div className="text-sm">
                                    {conflictedBooking?.name}
                                </div>
                                <div className="text-sm ">
                                    Zeitraum : {format(conflictedBooking?.startDate, "PPP", { locale: de })} - {format(conflictedBooking?.endDate, "PPP", { locale: de })}
                                </div>
                                <div className="w-full flex items-center text-sm gap-x-4">
                                    <div className="w-1/2">
                                        Abholzeit : {convertMinutesToDayTime(Number(conflictedBooking?.startPeriod))}
                                    </div>
                                    <div className="w-1/2">
                                        Abgabezeit: {convertMinutesToDayTime(Number(conflictedBooking?.endPeriod))}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="mt-4 space-x-2 flex items-center">
                            <Checkbox
                                onCheckedChange={(e) => { setIgnore(Boolean(e)) }}
                                checked={ignore}
                            />
                            <p className="text-xs">
                                Hinweis in Zukunft ausblenden
                            </p>
                        </div>
                        <div className="flex justify-end mt-2">
                            <AlertDialogAction className="bg-indigo-800 hover:bg-indigo-900 text-gray-200 hover:text-gray-300"
                                onClick={onShowConflictConfirm}
                            >
                                Buchung eintragen
                            </AlertDialogAction>
                            <AlertDialogCancel className="dark:border-none" onClick={() => {
                                setShowConflict(false)
                            }}>
                                Abbrechen
                            </AlertDialogCancel>
                        </div>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    return (
        <Dialog>

            <div className="dark:bg-[#0F0F0F] bg-gray-200 rounded-md w-full">
                <DialogTrigger asChild className="w-full">
                    <Button className=" text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#141414] " variant="ghost">
                        <CalendarCheck2 className="mr-2 h-4 w-4" /> Verfügbarkeit ändern
                    </Button>
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
                                //@ts-ignore
                                setCurrentInserat(selectedValue);
                                setCurrentVehicle(null);
                            }}
                            //@ts-ignore
                            value={currentInserat}

                        >
                            <SelectTrigger className="dark:border-none dark:bg-[#0a0a0a] mt-2">
                                {currentInserat ? (
                                    <SelectValue>

                                    </SelectValue>
                                ) : (
                                    <SelectValue>
                                        Bitte wähle ein Inserat aus
                                    </SelectValue>
                                )}

                                <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">

                                    {foundInserate.map((thisInserat) => (
                                        //@ts-ignore
                                        <SelectItem value={thisInserat} key={thisInserat.id}>
                                            {thisInserat.title}
                                        </SelectItem>
                                    ))}
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
                                disabled={//@ts-ignore
                                    !currentInserat || currentInserat?.vehicles.length <= 0}>
                                {currentVehicle ? (
                                    <SelectValue>

                                    </SelectValue>
                                ) : (
                                    <SelectValue>
                                        Wähle dein Fahrzeug
                                    </SelectValue>
                                )}

                                <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">

                                    {//@ts-ignore
                                        currentInserat?.vehicles.length > 0 ? (
                                            //@ts-ignore
                                            currentInserat?.vehicles?.map((thisVehicle: typeof vehicle.$inferSelect) => (
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
                                                        <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c]">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[200px] pl-3 text-left font-normal dark:border-none",
                                                                    !field.value && "text-muted-foreground  "
                                                                )}
                                                            >
                                                                {currentStart ? (
                                                                    format(currentStart, "PPP", { locale: de })
                                                                ) : (
                                                                    <span>Wähle ein Datum</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 dark:border-none rounded-md" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={currentStart}
                                                            className="dark:bg-[#0a0a0a] "
                                                            onSelect={(date) => {
                                                                field.onChange(date);
                                                                setCurrentStart(date);
                                                            }}
                                                            locale={de}
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
                                                        <FormControl className="dark:bg-[#0a0a0a] dark:hover:bg-[#1c1c1c] ">
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[200px] pl-3 text-left font-normal dark:border-none",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {currentEnd ? (
                                                                    format(currentEnd, "PPP", { locale: de })
                                                                ) : (
                                                                    <span>Wähle ein Datum</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 dark:border-none rounded-md" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={currentEnd}
                                                            className="dark:bg-[#0a0a0a] "
                                                            onSelect={(date) => {
                                                                const nextDay = new Date(date);
                                                                field.onChange(nextDay);
                                                                setCurrentEnd(nextDay);
                                                            }}
                                                            locale={de}
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
                                    <SelectTimeRange
                                        isSameDay={isSameDay(currentStart, currentEnd)}
                                        setStartTimeParent={setStartTime}
                                        setEndTimeParent={setEndTime}
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
                                        disabled={isLoading || !currentInserat || !currentStart || !currentEnd ||
                                            !startTime || !endTime}
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

export default AddAvailability;