"use client"

import { zodResolver } from "@hookform/resolvers/zod"

import { format, getDate, isBefore, isSameDay, set } from 'date-fns';
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,

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
import { booking, inserat } from "@/db/schema";
import SearchRent from "@/app/(anzeige)/inserat/[inseratId]/_components/search-rent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { vehicle } from '../../../../../../db/schema';
import { Input } from "@/components/ui/input";
import { MdOutlinePersonPin } from "react-icons/md";
import { de } from "date-fns/locale";
import SelectTimeRange from "./select-time-range";
import { Checkbox } from "@/components/ui/checkbox";
import { TbListNumbers } from "react-icons/tb";
import { checkAvailability } from "@/actions/check-availability";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent } from "@/components/ui/alert-dialog";
import ConflictDialog from "./conflict-dialog.tsx/conflict-dialog";



interface AddBookingProps {
    foundInserate: typeof inserat.$inferSelect[]
}


const AddBooking: React.FC<AddBookingProps> = ({
    foundInserate
}) => {



    const [currentStart, setCurrentStart] = useState(new Date());
    const [currentEnd, setCurrentEnd] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [currentInserat, setCurrentInserat] = useState<string | null>(null);
    const [currentVehicle, setCurrentVehicle] = useState<string | null>(null);
    const [currentName, setCurrentName] = useState<string | null>(null);
    const [currentInternal, setCurrentInternal] = useState<string | null>(null);
    const [currentContent, setCurrentContent] = useState<string | null>(null);
    const [affectAll, setAffectAll] = useState(false);

    const [currentStartTime, setCurrentStartTime] = useState("");
    const [currentEndTime, setCurrentEndTime] = useState("");
    const [selectAllDay, setSelectAllDay] = useState(false);


    const selectedUser = usesearchUserByBookingStore((user) => user.user);

    const [currentInseratObject, setCurrentInseratObject] = useState<typeof inserat.$inferSelect | null>(null);

    const [ignore, setIgnore] = useState(false);
    const [ignoreOnce, setIgnoreOnce] = useState(false);
    const [showConflict, setShowConflict] = useState(false);

    const [conflictedBooking, setConflictedBooking] = useState<typeof booking.$inferSelect | null>(null);

    const params = useParams();
    const router = useRouter();

    const formSchema = z.object({
        start: z.date({
            required_error: "A date of birth is required.",
        }), end: z.date({
            required_error: "A date of birth is required.",
        }), content: z.string().optional(),
        name: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            start: new Date(),
            end: new Date(),
            content: "",
            name: ""

        }
    })


    useEffect(() => {

        const newInserat = foundInserate.find((inserat) => inserat.id === currentInserat);

        setCurrentInseratObject(newInserat);

    }, [currentInserat])

    const onSubmit = (value: z.infer<typeof formSchema>) => {
        try {

            setIsLoading(true);


            const values = {
                content: value.content ? value.content : "",

                //Days
                start: currentStart,
                end: currentEnd,

                //Hours
                startPeriod: currentStartTime,
                endPeriod: currentEndTime,


                userId: selectedUser ? selectedUser?.id : null,
                vehicleId: currentVehicle,
                buchungsnummer: currentInternal,
                name: currentName,


            }

            const isAvailable: {
                isConflict?: boolean,
                booking?: any
            } = checkAvailability(
                currentInseratObject,
                currentStart,
                currentEnd,
                currentStartTime,
                currentEndTime
            )



            if (isAvailable.isConflict) {
                console.log(isAvailable.booking)
                setConflictedBooking(isAvailable.booking)
                setShowConflict(true);
                setIsLoading(false);



            } else {
                axios.post(`/api/booking/${currentInserat}`, values)
                    .then(() => {
                        router.refresh();
                        form.reset();
                        setCurrentStart(new Date());
                        setCurrentEnd(new Date());
                        setCurrentInserat(null);
                        setCurrentInternal("");
                        setCurrentVehicle(null);
                        setCurrentName(null);
                        setCurrentStartTime("");
                        setCurrentEndTime("");
                    })
                toast.success("Buchung hinzugefügt");
            }

        } catch (err) {
            toast.error("Fehler beim hinzufügen der Buchung", err)
        } finally {
            setTimeout(() => {
                router.refresh();
            }, 1000)
            setIsLoading(false);
        }
    }

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

    useEffect(() => {
        if (currentStart > currentEnd) {
            setCurrentEnd(currentStart)
        }
    }, [currentEnd, currentStart])

    const onShowConflictConfirm = () => {
        try {
            setIsLoading(true);

            const values = {
                content: currentContent,

                //Days
                start: currentStart,
                end: currentEnd,

                //Hours
                startPeriod: currentStartTime,
                endPeriod: currentEndTime,


                userId: selectedUser ? selectedUser?.id : null,
                vehicleId: currentVehicle,
                buchungsnummer: currentInternal,
                name: currentName,


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
            <ConflictDialog
                title={currentInseratObject?.title}
                reqStartDate={currentStart}
                reqEndDate={currentEnd}
                reqStartPeriod={currentStartTime}
                reqEndPeriod={currentEndTime}
                conflictedBooking={conflictedBooking}
                setShowConflict={setShowConflict}
                onShowConflictConfirm={onShowConflictConfirm}
            />
        )
    }




    return (
        <Dialog>

            <div className="dark:bg-[#0F0F0F] bg-gray-200  w-full">
                <DialogTrigger asChild className="w-full">
                    <Button className=" text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-[#141414] rounded-none" variant="ghost">
                        <PlusSquare className="mr-2 h-4 w-4" /> Buchungen hinzufügen
                    </Button>
                </DialogTrigger>
            </div>

            <DialogContent className="dark:bg-[#0F0F0F] dark:border-gray-100 dark:border-none">
                <div>
                    <div>
                        <h3 className="font-bold flex mb-8">
                            <CalendarClockIcon className="mr-2" /> Buchungen hinzufügen
                        </h3>
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
                            value={currentInserat || ''} // Ensures a falsy value like null doesn't break the component
                        >
                            <SelectTrigger className={cn("dark:border-none dark:bg-[#0a0a0a] mt-2", !currentInserat && "text-gray-200/80")}>
                                <SelectValue placeholder="Bitte wähle dein Inserat"/>
                            </SelectTrigger>

                            <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">
                                {foundInserate.map((thisInserat) => (
                                    <SelectItem value={thisInserat.id} key={thisInserat.id}>
                                        {thisInserat.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {currentInseratObject && currentInseratObject.multi && (
                        <div className="pb-8 pr-8">
                            <Label className="">
                                Fahrzeug
                            </Label>
                            <Select
                                onValueChange={(selectedValue) => {
                                    setCurrentVehicle(selectedValue);
                                }}
                                disabled={affectAll}
                                value={currentVehicle || ''}

                            >
                                <SelectTrigger className={cn("dark:border-none dark:bg-[#0a0a0a]", !currentVehicle && "text-gray-200/80")}
                                    disabled={//@ts-ignore
                                        !currentInserat || currentInseratObject?.vehicles?.length <= 0}
                                >
                                    <SelectValue placeholder={affectAll ? "Buchung wird auf alle Fahrzeuge angewandt.." : "Bitte wähle dein Fahrzeug"} />

                                    <SelectContent className="dark:bg-[#0a0a0a] dark:border-none">

                                        {//@ts-ignore
                                            currentInseratObject?.vehicles?.length > 0 ? (
                                                //@ts-ignore
                                                currentInseratObject?.vehicles?.map((thisVehicle: typeof vehicle.$inferSelect) => (
                                                    <SelectItem value={thisVehicle.id} key={thisVehicle.id} onSelect={() => { setAffectAll(false) }}>
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
                            <div className="space-x-2 mt-2">
                                <Checkbox
                                    checked={affectAll}
                                    onCheckedChange={(e) => {
                                        setAffectAll(Boolean(e));
                                        if (Boolean(e)) {

                                            setCurrentVehicle(undefined);
                                        }
                                    }} />

                                <Label className="hover:cursor-pointer" onClick={() => {
                                    setAffectAll(!affectAll);
                                    if (affectAll) {
                                        setCurrentVehicle(undefined);
                                    }
                                }}>
                                    Buchung auf alle Fahrzeuge anwenden
                                </Label>
                            </div>
                        </div>
                    )}
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
                                                            locale={de}
                                                            selected={currentStart}
                                                            className="dark:bg-[#0a0a0a] dark:border-none"
                                                            onSelect={(date) => {
                                                                field.onChange(date);
                                                                setCurrentStart(date);

                                                            }}
                                                            disabled={(date) =>
                                                                isBefore(date, new Date().setHours(0, 0, 0, 0)) || date < new Date("1900-01-01")
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

                                <div className="">
                                    <SelectTimeRange
                                        isSameDay={isSameDay(currentStart, currentEnd) || false}
                                        setStartTimeParent={setCurrentStartTime}
                                        setEndTimeParent={setCurrentEndTime}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel className="flex items-center"><MdOutlinePersonPin className="w-4 h-4 mr-2" /> Name</FormLabel>
                                                <Input
                                                    className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                                    dark:bg-[#0a0a0a]"
                                                    onChange={(e) => { setCurrentName(e.target.value); field.onChange(e) }}
                                                />
                                            </FormItem>
                                        )} />
                                </div>
                                {/*
                                <div>
                                    <SearchRent />
                                </div>
                                */}
                                <div className="mt-2">
                                    <Label className="font-semibold text-sm flex items-center">
                                        <TbListNumbers className="w-4 h-4 mr-2" /> Interne Buchungsnr.
                                    </Label>
                                    <div className="mt-2">
                                        <Input
                                            value={currentInternal}
                                            className="focus:ring-0 focus:outline-none focus:border-0 dark:border-none
                                                    dark:bg-[#0a0a0a]"
                                            onChange={(e) => { setCurrentInternal(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <span className="font-semibold text-sm  flex">
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

                                                    onChange={(e) => { setCurrentContent(e.target.value); field.onChange(e) }}
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
                                        disabled={(!selectedUser && (!currentName || currentName.trim() === ""))
                                            || isLoading || !currentInserat || !currentStart || !currentEnd
                                            || !currentStartTime || !currentEndTime ||
                                            (currentInseratObject?.multi && !(currentVehicle || affectAll))
                                        }
                                        type="submit"
                                    >
                                        Buchung hinzufügen</Button>
                                </DialogTrigger>
                            </form>
                        </Form>

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AddBooking;